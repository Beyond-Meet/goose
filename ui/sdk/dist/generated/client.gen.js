// This file is auto-generated — do not edit manually.
import { zCheckSecretResponse, zDictationConfigResponse, zDictationTranscribeResponse, zExportSessionResponse, zGetExtensionsResponse, zGetProviderDetailsResponse, zGetProviderModelsResponse, zGetSessionExtensionsResponse, zGetToolsResponse, zImportSessionResponse, zListProvidersResponse, zReadConfigResponse, zReadResourceResponse, zUpdateProviderResponse, } from './zod.gen.js';
export class GooseExtClient {
    conn;
    constructor(conn) {
        this.conn = conn;
    }
    async GooseExtensionsAdd(params) {
        await this.conn.extMethod("_goose/extensions/add", params);
    }
    async GooseExtensionsRemove(params) {
        await this.conn.extMethod("_goose/extensions/remove", params);
    }
    async GooseTools(params) {
        const raw = await this.conn.extMethod("_goose/tools", params);
        return zGetToolsResponse.parse(raw);
    }
    async GooseResourceRead(params) {
        const raw = await this.conn.extMethod("_goose/resource/read", params);
        return zReadResourceResponse.parse(raw);
    }
    async GooseWorkingDirUpdate(params) {
        await this.conn.extMethod("_goose/working_dir/update", params);
    }
    async sessionDelete(params) {
        await this.conn.extMethod("session/delete", params);
    }
    async GooseConfigExtensions(params) {
        const raw = await this.conn.extMethod("_goose/config/extensions", params);
        return zGetExtensionsResponse.parse(raw);
    }
    async GooseSessionExtensions(params) {
        const raw = await this.conn.extMethod("_goose/session/extensions", params);
        return zGetSessionExtensionsResponse.parse(raw);
    }
    async GooseSessionProviderUpdate(params) {
        const raw = await this.conn.extMethod("_goose/session/provider/update", params);
        return zUpdateProviderResponse.parse(raw);
    }
    async GooseProvidersList(params) {
        const raw = await this.conn.extMethod("_goose/providers/list", params);
        return zListProvidersResponse.parse(raw);
    }
    async GooseProvidersDetails(params) {
        const raw = await this.conn.extMethod("_goose/providers/details", params);
        return zGetProviderDetailsResponse.parse(raw);
    }
    async GooseProvidersModels(params) {
        const raw = await this.conn.extMethod("_goose/providers/models", params);
        return zGetProviderModelsResponse.parse(raw);
    }
    async GooseConfigRead(params) {
        const raw = await this.conn.extMethod("_goose/config/read", params);
        return zReadConfigResponse.parse(raw);
    }
    async GooseConfigUpsert(params) {
        await this.conn.extMethod("_goose/config/upsert", params);
    }
    async GooseConfigRemove(params) {
        await this.conn.extMethod("_goose/config/remove", params);
    }
    async GooseSecretCheck(params) {
        const raw = await this.conn.extMethod("_goose/secret/check", params);
        return zCheckSecretResponse.parse(raw);
    }
    async GooseSecretUpsert(params) {
        await this.conn.extMethod("_goose/secret/upsert", params);
    }
    async GooseSecretRemove(params) {
        await this.conn.extMethod("_goose/secret/remove", params);
    }
    async GooseSessionExport(params) {
        const raw = await this.conn.extMethod("_goose/session/export", params);
        return zExportSessionResponse.parse(raw);
    }
    async GooseSessionImport(params) {
        const raw = await this.conn.extMethod("_goose/session/import", params);
        return zImportSessionResponse.parse(raw);
    }
    async GooseSessionArchive(params) {
        await this.conn.extMethod("_goose/session/archive", params);
    }
    async GooseSessionUnarchive(params) {
        await this.conn.extMethod("_goose/session/unarchive", params);
    }
    async GooseDictationTranscribe(params) {
        const raw = await this.conn.extMethod("_goose/dictation/transcribe", params);
        return zDictationTranscribeResponse.parse(raw);
    }
    async GooseDictationConfig(params) {
        const raw = await this.conn.extMethod("_goose/dictation/config", params);
        return zDictationConfigResponse.parse(raw);
    }
}
