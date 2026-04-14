import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";

const STARTUP_TIMEOUT_MS = 60000;
const RETRY_INTERVAL_MS = 250;
const pad = (value: number): string => value.toString().padStart(2, "0");
const createRunId = (): string => {
  const now = new Date();

  return [
    now.getFullYear().toString(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
};

export interface AppRuntime {
  port: number;
  profile: string;
  goosePathRoot: string;
  close: () => void;
}

const canConnect = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });

    const finish = (connected: boolean) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(connected);
    };

    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
  });
};

const wait = (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

const waitForDriver = async (
  port: number,
  timeoutMs: number,
): Promise<void> => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await canConnect(port)) {
      return;
    }

    await wait(RETRY_INTERVAL_MS);
  }

  throw new Error(
    `Timed out waiting for app test driver on port ${port} after ${timeoutMs}ms`,
  );
};

const reservePort = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close(() => reject(new Error("Failed to reserve app test port")));
        return;
      }

      const { port } = address;
      server.close((closeError) => {
        if (closeError) {
          reject(closeError);
          return;
        }

        resolve(port);
      });
    });
  });
};

const stopChild = (child: ChildProcess) => {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  const killTarget =
    child.pid && child.spawnargs.length > 0 ? -child.pid : child.pid;

  if (!killTarget) {
    return;
  }

  try {
    process.kill(killTarget, "SIGTERM");
  } catch {
    return;
  }

  setTimeout(() => {
    if (child.exitCode === null && child.signalCode === null) {
      try {
        process.kill(killTarget, "SIGKILL");
      } catch {
        return;
      }
    }
  }, 5000).unref();
};

export const startAppForTestFile = async (
  testFileId: string,
): Promise<AppRuntime> => {
  const port = await reservePort();
  const runId = createRunId();
  const profile = `app-e2e-${testFileId}-${runId}`;
  const goosePathRoot = path.join("/tmp", profile);

  // Seed a minimal config so the app has a provider/model configured.
  const configDir = path.join(goosePathRoot, "config");
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(
    path.join(configDir, "config.yaml"),
    [
      `GOOSE_PROVIDER: ${process.env.GOOSE_PROVIDER || "anthropic"}`,
      `GOOSE_MODEL: ${process.env.GOOSE_MODEL || "claude-haiku-4-5-20251001"}`,
      `GOOSE_TELEMETRY_ENABLED: false`,
    ].join("\n"),
  );

  const appBinary = process.env.APP_E2E_BINARY;
  const env = {
    ...process.env,
    APP_TEST_DRIVER_PORT: String(port),
    GOOSE2_PROFILE: profile,
    GOOSE_PATH_ROOT: goosePathRoot,
  };

  const child = appBinary
    ? spawn(appBinary, [], { detached: true, env, stdio: "inherit" })
    : spawn(
        path.resolve(import.meta.dirname, "../../../scripts/run-tauri-dev.sh"),
        ["dev"],
        {
          cwd: path.resolve(import.meta.dirname, "../../.."),
          detached: true,
          env,
          stdio: "inherit",
        },
      );

  process.once("exit", () => stopChild(child));
  process.once("SIGINT", () => stopChild(child));
  process.once("SIGTERM", () => stopChild(child));

  child.once("exit", (code, signal) => {
    if (code !== 0 && signal == null) {
      console.error(
        `App E2E process ${profile} exited before teardown with code ${code}`,
      );
    }
  });

  try {
    await waitForDriver(port, STARTUP_TIMEOUT_MS);
  } catch (error) {
    stopChild(child);
    throw error;
  }

  return {
    port,
    profile,
    goosePathRoot,
    close: () => stopChild(child),
  };
};
