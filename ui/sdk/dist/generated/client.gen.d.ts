export interface ExtMethodProvider {
    extMethod(method: string, params: Record<string, unknown>): Promise<Record<string, unknown>>;
}
import type { AddExtensionRequest, ArchiveSessionRequest, CheckSecretRequest, CheckSecretResponse, DeleteSessionRequest, DictationConfigRequest, DictationConfigResponse, DictationTranscribeRequest, DictationTranscribeResponse, ExportSessionRequest, ExportSessionResponse, GetExtensionsRequest, GetExtensionsResponse, GetProviderDetailsRequest, GetProviderDetailsResponse, GetProviderModelsRequest, GetProviderModelsResponse, GetSessionExtensionsRequest, GetSessionExtensionsResponse, GetToolsRequest, GetToolsResponse, ImportSessionRequest, ImportSessionResponse, ListProvidersRequest, ListProvidersResponse, ReadConfigRequest, ReadConfigResponse, ReadResourceRequest, ReadResourceResponse, RemoveConfigRequest, RemoveExtensionRequest, RemoveSecretRequest, UnarchiveSessionRequest, UpdateProviderRequest, UpdateProviderResponse, UpdateWorkingDirRequest, UpsertConfigRequest, UpsertSecretRequest } from './types.gen.js';
export declare class GooseExtClient {
    private conn;
    constructor(conn: ExtMethodProvider);
    GooseExtensionsAdd(params: AddExtensionRequest): Promise<void>;
    GooseExtensionsRemove(params: RemoveExtensionRequest): Promise<void>;
    GooseTools(params: GetToolsRequest): Promise<GetToolsResponse>;
    GooseResourceRead(params: ReadResourceRequest): Promise<ReadResourceResponse>;
    GooseWorkingDirUpdate(params: UpdateWorkingDirRequest): Promise<void>;
    sessionDelete(params: DeleteSessionRequest): Promise<void>;
    GooseConfigExtensions(params: GetExtensionsRequest): Promise<GetExtensionsResponse>;
    GooseSessionExtensions(params: GetSessionExtensionsRequest): Promise<GetSessionExtensionsResponse>;
    GooseSessionProviderUpdate(params: UpdateProviderRequest): Promise<UpdateProviderResponse>;
    GooseProvidersList(params: ListProvidersRequest): Promise<ListProvidersResponse>;
    GooseProvidersDetails(params: GetProviderDetailsRequest): Promise<GetProviderDetailsResponse>;
    GooseProvidersModels(params: GetProviderModelsRequest): Promise<GetProviderModelsResponse>;
    GooseConfigRead(params: ReadConfigRequest): Promise<ReadConfigResponse>;
    GooseConfigUpsert(params: UpsertConfigRequest): Promise<void>;
    GooseConfigRemove(params: RemoveConfigRequest): Promise<void>;
    GooseSecretCheck(params: CheckSecretRequest): Promise<CheckSecretResponse>;
    GooseSecretUpsert(params: UpsertSecretRequest): Promise<void>;
    GooseSecretRemove(params: RemoveSecretRequest): Promise<void>;
    GooseSessionExport(params: ExportSessionRequest): Promise<ExportSessionResponse>;
    GooseSessionImport(params: ImportSessionRequest): Promise<ImportSessionResponse>;
    GooseSessionArchive(params: ArchiveSessionRequest): Promise<void>;
    GooseSessionUnarchive(params: UnarchiveSessionRequest): Promise<void>;
    GooseDictationTranscribe(params: DictationTranscribeRequest): Promise<DictationTranscribeResponse>;
    GooseDictationConfig(params: DictationConfigRequest): Promise<DictationConfigResponse>;
}
//# sourceMappingURL=client.gen.d.ts.map