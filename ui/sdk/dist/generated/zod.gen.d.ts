import { z } from 'zod';
/**
 * Add an extension to an active session.
 */
export declare const zAddExtensionRequest: z.ZodObject<{
    sessionId: z.ZodString;
    config: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    config?: unknown;
}, {
    sessionId: string;
    config?: unknown;
}>;
/**
 * Empty success response for operations that return no data.
 */
export declare const zEmptyResponse: z.ZodRecord<z.ZodString, z.ZodUnknown>;
/**
 * Remove an extension from an active session.
 */
export declare const zRemoveExtensionRequest: z.ZodObject<{
    sessionId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    name: string;
}, {
    sessionId: string;
    name: string;
}>;
/**
 * List all tools available in a session.
 */
export declare const zGetToolsRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
/**
 * Tools response.
 */
export declare const zGetToolsResponse: z.ZodObject<{
    tools: z.ZodArray<z.ZodUnknown, "many">;
}, "strip", z.ZodTypeAny, {
    tools: unknown[];
}, {
    tools: unknown[];
}>;
/**
 * Read a resource from an extension.
 */
export declare const zReadResourceRequest: z.ZodObject<{
    sessionId: z.ZodString;
    uri: z.ZodString;
    extensionName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    uri: string;
    extensionName: string;
}, {
    sessionId: string;
    uri: string;
    extensionName: string;
}>;
/**
 * Resource read response.
 */
export declare const zReadResourceResponse: z.ZodObject<{
    result: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    result?: unknown;
}, {
    result?: unknown;
}>;
/**
 * Update the working directory for a session.
 */
export declare const zUpdateWorkingDirRequest: z.ZodObject<{
    sessionId: z.ZodString;
    workingDir: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    workingDir: string;
}, {
    sessionId: string;
    workingDir: string;
}>;
/**
 * Delete a session.
 */
export declare const zDeleteSessionRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
/**
 * List configured extensions and any warnings.
 */
export declare const zGetExtensionsRequest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
/**
 * List configured extensions and any warnings.
 */
export declare const zGetExtensionsResponse: z.ZodObject<{
    extensions: z.ZodArray<z.ZodUnknown, "many">;
    warnings: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    extensions: unknown[];
    warnings: string[];
}, {
    extensions: unknown[];
    warnings: string[];
}>;
export declare const zGetSessionExtensionsRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export declare const zGetSessionExtensionsResponse: z.ZodObject<{
    extensions: z.ZodArray<z.ZodUnknown, "many">;
}, "strip", z.ZodTypeAny, {
    extensions: unknown[];
}, {
    extensions: unknown[];
}>;
/**
 * Atomically update the provider for a live session.
 */
export declare const zUpdateProviderRequest: z.ZodObject<{
    sessionId: z.ZodString;
    provider: z.ZodString;
    model: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    contextLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
    requestParams: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    provider: string;
    model?: string | null | undefined;
    contextLimit?: number | null | undefined;
    requestParams?: Record<string, unknown> | null | undefined;
}, {
    sessionId: string;
    provider: string;
    model?: string | null | undefined;
    contextLimit?: number | null | undefined;
    requestParams?: Record<string, unknown> | null | undefined;
}>;
/**
 * Provider update response.
 */
export declare const zUpdateProviderResponse: z.ZodObject<{
    configOptions: z.ZodArray<z.ZodUnknown, "many">;
}, "strip", z.ZodTypeAny, {
    configOptions: unknown[];
}, {
    configOptions: unknown[];
}>;
/**
 * List providers available through goose, including the config-default sentinel.
 */
export declare const zListProvidersRequest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const zProviderListEntry: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    label: string;
}, {
    id: string;
    label: string;
}>;
/**
 * Provider list response.
 */
export declare const zListProvidersResponse: z.ZodObject<{
    providers: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
    }, {
        id: string;
        label: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    providers: {
        id: string;
        label: string;
    }[];
}, {
    providers: {
        id: string;
        label: string;
    }[];
}>;
/**
 * List providers with full metadata (config keys, setup steps, etc.).
 */
export declare const zGetProviderDetailsRequest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const zProviderConfigKey: z.ZodObject<{
    name: z.ZodString;
    required: z.ZodBoolean;
    secret: z.ZodBoolean;
    default: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
    oauthFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    deviceCodeFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    primary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    required: boolean;
    secret: boolean;
    default: string | null;
    oauthFlow: boolean;
    deviceCodeFlow: boolean;
    primary: boolean;
}, {
    name: string;
    required: boolean;
    secret: boolean;
    default?: string | null | undefined;
    oauthFlow?: boolean | undefined;
    deviceCodeFlow?: boolean | undefined;
    primary?: boolean | undefined;
}>;
export declare const zModelEntry: z.ZodObject<{
    name: z.ZodString;
    contextLimit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    contextLimit: number;
}, {
    name: string;
    contextLimit: number;
}>;
export declare const zProviderDetailEntry: z.ZodObject<{
    name: z.ZodString;
    displayName: z.ZodString;
    description: z.ZodString;
    defaultModel: z.ZodString;
    isConfigured: z.ZodBoolean;
    providerType: z.ZodString;
    configKeys: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        required: z.ZodBoolean;
        secret: z.ZodBoolean;
        default: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
        oauthFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        deviceCodeFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        primary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        required: boolean;
        secret: boolean;
        default: string | null;
        oauthFlow: boolean;
        deviceCodeFlow: boolean;
        primary: boolean;
    }, {
        name: string;
        required: boolean;
        secret: boolean;
        default?: string | null | undefined;
        oauthFlow?: boolean | undefined;
        deviceCodeFlow?: boolean | undefined;
        primary?: boolean | undefined;
    }>, "many">;
    setupSteps: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    knownModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        contextLimit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        contextLimit: number;
    }, {
        name: string;
        contextLimit: number;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    displayName: string;
    description: string;
    defaultModel: string;
    isConfigured: boolean;
    providerType: string;
    configKeys: {
        name: string;
        required: boolean;
        secret: boolean;
        default: string | null;
        oauthFlow: boolean;
        deviceCodeFlow: boolean;
        primary: boolean;
    }[];
    setupSteps: string[];
    knownModels: {
        name: string;
        contextLimit: number;
    }[];
}, {
    name: string;
    displayName: string;
    description: string;
    defaultModel: string;
    isConfigured: boolean;
    providerType: string;
    configKeys: {
        name: string;
        required: boolean;
        secret: boolean;
        default?: string | null | undefined;
        oauthFlow?: boolean | undefined;
        deviceCodeFlow?: boolean | undefined;
        primary?: boolean | undefined;
    }[];
    setupSteps?: string[] | undefined;
    knownModels?: {
        name: string;
        contextLimit: number;
    }[] | undefined;
}>;
/**
 * Provider details response.
 */
export declare const zGetProviderDetailsResponse: z.ZodObject<{
    providers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        displayName: z.ZodString;
        description: z.ZodString;
        defaultModel: z.ZodString;
        isConfigured: z.ZodBoolean;
        providerType: z.ZodString;
        configKeys: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            required: z.ZodBoolean;
            secret: z.ZodBoolean;
            default: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
            oauthFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            deviceCodeFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            primary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            required: boolean;
            secret: boolean;
            default: string | null;
            oauthFlow: boolean;
            deviceCodeFlow: boolean;
            primary: boolean;
        }, {
            name: string;
            required: boolean;
            secret: boolean;
            default?: string | null | undefined;
            oauthFlow?: boolean | undefined;
            deviceCodeFlow?: boolean | undefined;
            primary?: boolean | undefined;
        }>, "many">;
        setupSteps: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        knownModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            contextLimit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            contextLimit: number;
        }, {
            name: string;
            contextLimit: number;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        displayName: string;
        description: string;
        defaultModel: string;
        isConfigured: boolean;
        providerType: string;
        configKeys: {
            name: string;
            required: boolean;
            secret: boolean;
            default: string | null;
            oauthFlow: boolean;
            deviceCodeFlow: boolean;
            primary: boolean;
        }[];
        setupSteps: string[];
        knownModels: {
            name: string;
            contextLimit: number;
        }[];
    }, {
        name: string;
        displayName: string;
        description: string;
        defaultModel: string;
        isConfigured: boolean;
        providerType: string;
        configKeys: {
            name: string;
            required: boolean;
            secret: boolean;
            default?: string | null | undefined;
            oauthFlow?: boolean | undefined;
            deviceCodeFlow?: boolean | undefined;
            primary?: boolean | undefined;
        }[];
        setupSteps?: string[] | undefined;
        knownModels?: {
            name: string;
            contextLimit: number;
        }[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    providers: {
        name: string;
        displayName: string;
        description: string;
        defaultModel: string;
        isConfigured: boolean;
        providerType: string;
        configKeys: {
            name: string;
            required: boolean;
            secret: boolean;
            default: string | null;
            oauthFlow: boolean;
            deviceCodeFlow: boolean;
            primary: boolean;
        }[];
        setupSteps: string[];
        knownModels: {
            name: string;
            contextLimit: number;
        }[];
    }[];
}, {
    providers: {
        name: string;
        displayName: string;
        description: string;
        defaultModel: string;
        isConfigured: boolean;
        providerType: string;
        configKeys: {
            name: string;
            required: boolean;
            secret: boolean;
            default?: string | null | undefined;
            oauthFlow?: boolean | undefined;
            deviceCodeFlow?: boolean | undefined;
            primary?: boolean | undefined;
        }[];
        setupSteps?: string[] | undefined;
        knownModels?: {
            name: string;
            contextLimit: number;
        }[] | undefined;
    }[];
}>;
/**
 * Fetch the full list of models available for a specific provider.
 */
export declare const zGetProviderModelsRequest: z.ZodObject<{
    providerName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    providerName: string;
}, {
    providerName: string;
}>;
/**
 * Provider models response.
 */
export declare const zGetProviderModelsResponse: z.ZodObject<{
    models: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    models: string[];
}, {
    models: string[];
}>;
/**
 * Read a single non-secret config value.
 */
export declare const zReadConfigRequest: z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
}, {
    key: string;
}>;
/**
 * Config read response.
 */
export declare const zReadConfigResponse: z.ZodObject<{
    value: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    value?: unknown;
}, {
    value?: unknown;
}>;
/**
 * Upsert a single non-secret config value.
 */
export declare const zUpsertConfigRequest: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnknown;
}, "strip", z.ZodTypeAny, {
    key: string;
    value?: unknown;
}, {
    key: string;
    value?: unknown;
}>;
/**
 * Remove a single non-secret config value.
 */
export declare const zRemoveConfigRequest: z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
}, {
    key: string;
}>;
/**
 * Check whether a secret exists. Never returns the actual value.
 */
export declare const zCheckSecretRequest: z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
}, {
    key: string;
}>;
/**
 * Secret check response.
 */
export declare const zCheckSecretResponse: z.ZodObject<{
    exists: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    exists: boolean;
}, {
    exists: boolean;
}>;
/**
 * Set a secret value (write-only).
 */
export declare const zUpsertSecretRequest: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnknown;
}, "strip", z.ZodTypeAny, {
    key: string;
    value?: unknown;
}, {
    key: string;
    value?: unknown;
}>;
/**
 * Remove a secret.
 */
export declare const zRemoveSecretRequest: z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
}, {
    key: string;
}>;
/**
 * Export a session as a JSON string.
 */
export declare const zExportSessionRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
/**
 * Export session response — raw JSON of the goose session with `conversation`.
 */
export declare const zExportSessionResponse: z.ZodObject<{
    data: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: string;
}, {
    data: string;
}>;
/**
 * Import a session from a JSON string.
 */
export declare const zImportSessionRequest: z.ZodObject<{
    data: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: string;
}, {
    data: string;
}>;
/**
 * Import session response — metadata about the newly created session.
 */
export declare const zImportSessionResponse: z.ZodObject<{
    sessionId: z.ZodString;
    title: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    updatedAt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    messageCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    messageCount: number;
    title?: string | null | undefined;
    updatedAt?: string | null | undefined;
}, {
    sessionId: string;
    messageCount: number;
    title?: string | null | undefined;
    updatedAt?: string | null | undefined;
}>;
/**
 * Archive a session (soft delete).
 */
export declare const zArchiveSessionRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
/**
 * Unarchive a previously archived session.
 */
export declare const zUnarchiveSessionRequest: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
/**
 * Transcribe audio via a dictation provider.
 */
export declare const zDictationTranscribeRequest: z.ZodObject<{
    audio: z.ZodString;
    mimeType: z.ZodString;
    provider: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: string;
    audio: string;
    mimeType: string;
}, {
    provider: string;
    audio: string;
    mimeType: string;
}>;
/**
 * Transcription result.
 */
export declare const zDictationTranscribeResponse: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
/**
 * Get the configuration status of all dictation providers.
 */
export declare const zDictationConfigRequest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const zDictationModelOption: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    label: string;
    description: string;
}, {
    id: string;
    label: string;
    description: string;
}>;
/**
 * Per-provider configuration status.
 */
export declare const zDictationProviderStatusEntry: z.ZodObject<{
    configured: z.ZodBoolean;
    host: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    description: z.ZodString;
    usesProviderConfig: z.ZodBoolean;
    settingsPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    configKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    modelConfigKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    defaultModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    selectedModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    availableModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
        description: string;
    }, {
        id: string;
        label: string;
        description: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    configured: boolean;
    usesProviderConfig: boolean;
    availableModels: {
        id: string;
        label: string;
        description: string;
    }[];
    defaultModel?: string | null | undefined;
    host?: string | null | undefined;
    settingsPath?: string | null | undefined;
    configKey?: string | null | undefined;
    modelConfigKey?: string | null | undefined;
    selectedModel?: string | null | undefined;
}, {
    description: string;
    configured: boolean;
    usesProviderConfig: boolean;
    defaultModel?: string | null | undefined;
    host?: string | null | undefined;
    settingsPath?: string | null | undefined;
    configKey?: string | null | undefined;
    modelConfigKey?: string | null | undefined;
    selectedModel?: string | null | undefined;
    availableModels?: {
        id: string;
        label: string;
        description: string;
    }[] | undefined;
}>;
/**
 * Dictation config response — map of provider name to status.
 */
export declare const zDictationConfigResponse: z.ZodObject<{
    providers: z.ZodRecord<z.ZodString, z.ZodObject<{
        configured: z.ZodBoolean;
        host: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        description: z.ZodString;
        usesProviderConfig: z.ZodBoolean;
        settingsPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        configKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        modelConfigKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        defaultModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        selectedModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        availableModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            label: string;
            description: string;
        }, {
            id: string;
            label: string;
            description: string;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        configured: boolean;
        usesProviderConfig: boolean;
        availableModels: {
            id: string;
            label: string;
            description: string;
        }[];
        defaultModel?: string | null | undefined;
        host?: string | null | undefined;
        settingsPath?: string | null | undefined;
        configKey?: string | null | undefined;
        modelConfigKey?: string | null | undefined;
        selectedModel?: string | null | undefined;
    }, {
        description: string;
        configured: boolean;
        usesProviderConfig: boolean;
        defaultModel?: string | null | undefined;
        host?: string | null | undefined;
        settingsPath?: string | null | undefined;
        configKey?: string | null | undefined;
        modelConfigKey?: string | null | undefined;
        selectedModel?: string | null | undefined;
        availableModels?: {
            id: string;
            label: string;
            description: string;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    providers: Record<string, {
        description: string;
        configured: boolean;
        usesProviderConfig: boolean;
        availableModels: {
            id: string;
            label: string;
            description: string;
        }[];
        defaultModel?: string | null | undefined;
        host?: string | null | undefined;
        settingsPath?: string | null | undefined;
        configKey?: string | null | undefined;
        modelConfigKey?: string | null | undefined;
        selectedModel?: string | null | undefined;
    }>;
}, {
    providers: Record<string, {
        description: string;
        configured: boolean;
        usesProviderConfig: boolean;
        defaultModel?: string | null | undefined;
        host?: string | null | undefined;
        settingsPath?: string | null | undefined;
        configKey?: string | null | undefined;
        modelConfigKey?: string | null | undefined;
        selectedModel?: string | null | undefined;
        availableModels?: {
            id: string;
            label: string;
            description: string;
        }[] | undefined;
    }>;
}>;
export declare const zExtRequest: z.ZodObject<{
    id: z.ZodString;
    method: z.ZodString;
    params: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
        sessionId: z.ZodString;
        config: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        config?: unknown;
    }, {
        sessionId: string;
        config?: unknown;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        name: string;
    }, {
        sessionId: string;
        name: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
        uri: z.ZodString;
        extensionName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        uri: string;
        extensionName: string;
    }, {
        sessionId: string;
        uri: string;
        extensionName: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
        workingDir: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        workingDir: string;
    }, {
        sessionId: string;
        workingDir: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
        provider: z.ZodString;
        model: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        contextLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodNull]>>;
        requestParams: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        provider: string;
        model?: string | null | undefined;
        contextLimit?: number | null | undefined;
        requestParams?: Record<string, unknown> | null | undefined;
    }, {
        sessionId: string;
        provider: string;
        model?: string | null | undefined;
        contextLimit?: number | null | undefined;
        requestParams?: Record<string, unknown> | null | undefined;
    }>, z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodObject<{
        providerName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        providerName: string;
    }, {
        providerName: string;
    }>, z.ZodObject<{
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
    }, {
        key: string;
    }>, z.ZodObject<{
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
    }, {
        key: string;
        value?: unknown;
    }>, z.ZodObject<{
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
    }, {
        key: string;
    }>, z.ZodObject<{
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
    }, {
        key: string;
    }>, z.ZodObject<{
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
    }, {
        key: string;
        value?: unknown;
    }>, z.ZodObject<{
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
    }, {
        key: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodObject<{
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
    }, {
        data: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>, z.ZodObject<{
        audio: z.ZodString;
        mimeType: z.ZodString;
        provider: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        provider: string;
        audio: string;
        mimeType: string;
    }, {
        provider: string;
        audio: string;
        mimeType: string;
    }>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>, z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    method: string;
    params?: {
        sessionId: string;
        config?: unknown;
    } | {
        sessionId: string;
        name: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
        uri: string;
        extensionName: string;
    } | {
        sessionId: string;
        workingDir: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
    } | Record<string, unknown> | {
        sessionId: string;
        provider: string;
        model?: string | null | undefined;
        contextLimit?: number | null | undefined;
        requestParams?: Record<string, unknown> | null | undefined;
    } | {
        providerName: string;
    } | {
        key: string;
    } | {
        key: string;
        value?: unknown;
    } | {
        key: string;
    } | {
        key: string;
    } | {
        key: string;
        value?: unknown;
    } | {
        key: string;
    } | {
        sessionId: string;
    } | {
        data: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
    } | {
        provider: string;
        audio: string;
        mimeType: string;
    } | null | undefined;
}, {
    id: string;
    method: string;
    params?: {
        sessionId: string;
        config?: unknown;
    } | {
        sessionId: string;
        name: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
        uri: string;
        extensionName: string;
    } | {
        sessionId: string;
        workingDir: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
    } | Record<string, unknown> | {
        sessionId: string;
        provider: string;
        model?: string | null | undefined;
        contextLimit?: number | null | undefined;
        requestParams?: Record<string, unknown> | null | undefined;
    } | {
        providerName: string;
    } | {
        key: string;
    } | {
        key: string;
        value?: unknown;
    } | {
        key: string;
    } | {
        key: string;
    } | {
        key: string;
        value?: unknown;
    } | {
        key: string;
    } | {
        sessionId: string;
    } | {
        data: string;
    } | {
        sessionId: string;
    } | {
        sessionId: string;
    } | {
        provider: string;
        audio: string;
        mimeType: string;
    } | null | undefined;
}>;
export declare const zExtResponse: z.ZodUnion<[z.ZodObject<{
    id: z.ZodString;
    result: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodObject<{
        tools: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        tools: unknown[];
    }, {
        tools: unknown[];
    }>, z.ZodObject<{
        result: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        result?: unknown;
    }, {
        result?: unknown;
    }>, z.ZodObject<{
        extensions: z.ZodArray<z.ZodUnknown, "many">;
        warnings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        extensions: unknown[];
        warnings: string[];
    }, {
        extensions: unknown[];
        warnings: string[];
    }>, z.ZodObject<{
        extensions: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        extensions: unknown[];
    }, {
        extensions: unknown[];
    }>, z.ZodObject<{
        configOptions: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        configOptions: unknown[];
    }, {
        configOptions: unknown[];
    }>, z.ZodObject<{
        providers: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            label: string;
        }, {
            id: string;
            label: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        providers: {
            id: string;
            label: string;
        }[];
    }, {
        providers: {
            id: string;
            label: string;
        }[];
    }>, z.ZodObject<{
        providers: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            displayName: z.ZodString;
            description: z.ZodString;
            defaultModel: z.ZodString;
            isConfigured: z.ZodBoolean;
            providerType: z.ZodString;
            configKeys: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                required: z.ZodBoolean;
                secret: z.ZodBoolean;
                default: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
                oauthFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                deviceCodeFlow: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                primary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                required: boolean;
                secret: boolean;
                default: string | null;
                oauthFlow: boolean;
                deviceCodeFlow: boolean;
                primary: boolean;
            }, {
                name: string;
                required: boolean;
                secret: boolean;
                default?: string | null | undefined;
                oauthFlow?: boolean | undefined;
                deviceCodeFlow?: boolean | undefined;
                primary?: boolean | undefined;
            }>, "many">;
            setupSteps: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            knownModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                contextLimit: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                name: string;
                contextLimit: number;
            }, {
                name: string;
                contextLimit: number;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            displayName: string;
            description: string;
            defaultModel: string;
            isConfigured: boolean;
            providerType: string;
            configKeys: {
                name: string;
                required: boolean;
                secret: boolean;
                default: string | null;
                oauthFlow: boolean;
                deviceCodeFlow: boolean;
                primary: boolean;
            }[];
            setupSteps: string[];
            knownModels: {
                name: string;
                contextLimit: number;
            }[];
        }, {
            name: string;
            displayName: string;
            description: string;
            defaultModel: string;
            isConfigured: boolean;
            providerType: string;
            configKeys: {
                name: string;
                required: boolean;
                secret: boolean;
                default?: string | null | undefined;
                oauthFlow?: boolean | undefined;
                deviceCodeFlow?: boolean | undefined;
                primary?: boolean | undefined;
            }[];
            setupSteps?: string[] | undefined;
            knownModels?: {
                name: string;
                contextLimit: number;
            }[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        providers: {
            name: string;
            displayName: string;
            description: string;
            defaultModel: string;
            isConfigured: boolean;
            providerType: string;
            configKeys: {
                name: string;
                required: boolean;
                secret: boolean;
                default: string | null;
                oauthFlow: boolean;
                deviceCodeFlow: boolean;
                primary: boolean;
            }[];
            setupSteps: string[];
            knownModels: {
                name: string;
                contextLimit: number;
            }[];
        }[];
    }, {
        providers: {
            name: string;
            displayName: string;
            description: string;
            defaultModel: string;
            isConfigured: boolean;
            providerType: string;
            configKeys: {
                name: string;
                required: boolean;
                secret: boolean;
                default?: string | null | undefined;
                oauthFlow?: boolean | undefined;
                deviceCodeFlow?: boolean | undefined;
                primary?: boolean | undefined;
            }[];
            setupSteps?: string[] | undefined;
            knownModels?: {
                name: string;
                contextLimit: number;
            }[] | undefined;
        }[];
    }>, z.ZodObject<{
        models: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        models: string[];
    }, {
        models: string[];
    }>, z.ZodObject<{
        value: z.ZodDefault<z.ZodOptional<z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        value?: unknown;
    }, {
        value?: unknown;
    }>, z.ZodObject<{
        exists: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        exists: boolean;
    }, {
        exists: boolean;
    }>, z.ZodObject<{
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
    }, {
        data: string;
    }>, z.ZodObject<{
        sessionId: z.ZodString;
        title: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        updatedAt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        messageCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        messageCount: number;
        title?: string | null | undefined;
        updatedAt?: string | null | undefined;
    }, {
        sessionId: string;
        messageCount: number;
        title?: string | null | undefined;
        updatedAt?: string | null | undefined;
    }>, z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>, z.ZodObject<{
        providers: z.ZodRecord<z.ZodString, z.ZodObject<{
            configured: z.ZodBoolean;
            host: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            description: z.ZodString;
            usesProviderConfig: z.ZodBoolean;
            settingsPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            configKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            modelConfigKey: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            defaultModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            selectedModel: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            availableModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                label: string;
                description: string;
            }, {
                id: string;
                label: string;
                description: string;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            configured: boolean;
            usesProviderConfig: boolean;
            availableModels: {
                id: string;
                label: string;
                description: string;
            }[];
            defaultModel?: string | null | undefined;
            host?: string | null | undefined;
            settingsPath?: string | null | undefined;
            configKey?: string | null | undefined;
            modelConfigKey?: string | null | undefined;
            selectedModel?: string | null | undefined;
        }, {
            description: string;
            configured: boolean;
            usesProviderConfig: boolean;
            defaultModel?: string | null | undefined;
            host?: string | null | undefined;
            settingsPath?: string | null | undefined;
            configKey?: string | null | undefined;
            modelConfigKey?: string | null | undefined;
            selectedModel?: string | null | undefined;
            availableModels?: {
                id: string;
                label: string;
                description: string;
            }[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        providers: Record<string, {
            description: string;
            configured: boolean;
            usesProviderConfig: boolean;
            availableModels: {
                id: string;
                label: string;
                description: string;
            }[];
            defaultModel?: string | null | undefined;
            host?: string | null | undefined;
            settingsPath?: string | null | undefined;
            configKey?: string | null | undefined;
            modelConfigKey?: string | null | undefined;
            selectedModel?: string | null | undefined;
        }>;
    }, {
        providers: Record<string, {
            description: string;
            configured: boolean;
            usesProviderConfig: boolean;
            defaultModel?: string | null | undefined;
            host?: string | null | undefined;
            settingsPath?: string | null | undefined;
            configKey?: string | null | undefined;
            modelConfigKey?: string | null | undefined;
            selectedModel?: string | null | undefined;
            availableModels?: {
                id: string;
                label: string;
                description: string;
            }[] | undefined;
        }>;
    }>]>, z.ZodUnknown]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    result?: unknown;
}, {
    id: string;
    result?: unknown;
}>, z.ZodObject<{
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
}, {
    id: string;
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
}>]>;
//# sourceMappingURL=zod.gen.d.ts.map