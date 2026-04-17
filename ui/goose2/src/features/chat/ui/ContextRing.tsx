import { useTranslation } from "react-i18next";
import { useLocaleFormatting } from "@/shared/i18n";

const VISUAL_TEST_SCALE = 1.25;

// ---------------------------------------------------------------------------
// ContextRing — SVG circular indicator for context token usage
// ---------------------------------------------------------------------------

export function ContextRing({
  tokens,
  limit,
  size = 20,
}: {
  tokens: number;
  limit: number;
  size?: number;
}) {
  const { t } = useTranslation("chat");
  const { formatNumber } = useLocaleFormatting();
  const radius = (size - 3) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = limit > 0 ? Math.min(tokens / limit, 1) : 0;
  const visualProgress = Math.min(progress * VISUAL_TEST_SCALE, 1);
  const offset = circumference - visualProgress * circumference;
  const percent = formatNumber(Math.round(progress * 100));

  // Color based on usage
  const toneColor =
    progress > 0.9
      ? "var(--text-danger)"
      : progress > 0.7
        ? "var(--text-warning)"
        : "var(--color-accent)";
  const fillOpacityClass =
    visualProgress > 0
      ? "opacity-[0.18] transition-opacity duration-150 ease-out group-hover:opacity-[0.28] group-data-[state=open]:opacity-[0.28]"
      : "opacity-[0.12] transition-opacity duration-150 ease-out group-hover:opacity-[0.18] group-data-[state=open]:opacity-[0.18]";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      aria-label={t("context.ringAria", { percent })}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={Math.max(radius - 3, 0)}
        fill={toneColor}
        className={fillOpacityClass}
      />
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        className="text-foreground/15"
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={toneColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-300 ease-out"
      />
    </svg>
  );
}
