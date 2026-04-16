export type { AddExtensionRequest, ArchiveSessionRequest, CheckSecretRequest, CheckSecretResponse, DeleteSessionRequest, DictationConfigRequest, DictationConfigResponse, DictationModelOption, DictationProviderStatusEntry, DictationTranscribeRequest, DictationTranscribeResponse, EmptyResponse, ExportSessionRequest, ExportSessionResponse, ExtRequest, ExtResponse, GetExtensionsRequest, GetExtensionsResponse, GetProviderDetailsRequest, GetProviderDetailsResponse, GetProviderModelsRequest, GetProviderModelsResponse, GetSessionExtensionsRequest, GetSessionExtensionsResponse, GetToolsRequest, GetToolsResponse, ImportSessionRequest, ImportSessionResponse, ListProvidersRequest, ListProvidersResponse, ModelEntry, ProviderConfigKey, ProviderDetailEntry, ProviderListEntry, ReadConfigRequest, ReadConfigResponse, ReadResourceRequest, ReadResourceResponse, RemoveConfigRequest, RemoveExtensionRequest, RemoveSecretRequest, UnarchiveSessionRequest, UpdateProviderRequest, UpdateProviderResponse, UpdateWorkingDirRequest, UpsertConfigRequest, UpsertSecretRequest } from './types.gen.js';
export declare const GOOSE_EXT_METHODS: readonly [{
    readonly method: "_goose/extensions/add";
    readonly requestType: "AddExtensionRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/extensions/remove";
    readonly requestType: "RemoveExtensionRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/tools";
    readonly requestType: "GetToolsRequest";
    readonly responseType: "GetToolsResponse";
}, {
    readonly method: "_goose/resource/read";
    readonly requestType: "ReadResourceRequest";
    readonly responseType: "ReadResourceResponse";
}, {
    readonly method: "_goose/working_dir/update";
    readonly requestType: "UpdateWorkingDirRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "session/delete";
    readonly requestType: "DeleteSessionRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/config/extensions";
    readonly requestType: "GetExtensionsRequest";
    readonly responseType: "GetExtensionsResponse";
}, {
    readonly method: "_goose/session/extensions";
    readonly requestType: "GetSessionExtensionsRequest";
    readonly responseType: "GetSessionExtensionsResponse";
}, {
    readonly method: "_goose/session/provider/update";
    readonly requestType: "UpdateProviderRequest";
    readonly responseType: "UpdateProviderResponse";
}, {
    readonly method: "_goose/providers/list";
    readonly requestType: "ListProvidersRequest";
    readonly responseType: "ListProvidersResponse";
}, {
    readonly method: "_goose/providers/details";
    readonly requestType: "GetProviderDetailsRequest";
    readonly responseType: "GetProviderDetailsResponse";
}, {
    readonly method: "_goose/providers/models";
    readonly requestType: "GetProviderModelsRequest";
    readonly responseType: "GetProviderModelsResponse";
}, {
    readonly method: "_goose/config/read";
    readonly requestType: "ReadConfigRequest";
    readonly responseType: "ReadConfigResponse";
}, {
    readonly method: "_goose/config/upsert";
    readonly requestType: "UpsertConfigRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/config/remove";
    readonly requestType: "RemoveConfigRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/secret/check";
    readonly requestType: "CheckSecretRequest";
    readonly responseType: "CheckSecretResponse";
}, {
    readonly method: "_goose/secret/upsert";
    readonly requestType: "UpsertSecretRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/secret/remove";
    readonly requestType: "RemoveSecretRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/session/export";
    readonly requestType: "ExportSessionRequest";
    readonly responseType: "ExportSessionResponse";
}, {
    readonly method: "_goose/session/import";
    readonly requestType: "ImportSessionRequest";
    readonly responseType: "ImportSessionResponse";
}, {
    readonly method: "_goose/session/archive";
    readonly requestType: "ArchiveSessionRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/session/unarchive";
    readonly requestType: "UnarchiveSessionRequest";
    readonly responseType: "EmptyResponse";
}, {
    readonly method: "_goose/dictation/transcribe";
    readonly requestType: "DictationTranscribeRequest";
    readonly responseType: "DictationTranscribeResponse";
}, {
    readonly method: "_goose/dictation/config";
    readonly requestType: "DictationConfigRequest";
    readonly responseType: "DictationConfigResponse";
}];
export type GooseExtMethod = (typeof GOOSE_EXT_METHODS)[number];
//# sourceMappingURL=index.d.ts.map