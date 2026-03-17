import { ApiKey } from "../model";
import { Configuration, Fetch } from "./Fetch";

export class ApiKeyService {
    public configuration?: Configuration

    // Create API Key
    public async create(credentiaId: string, keyName: string, expiresOn: Date|undefined): Promise<{}> {
        return await Fetch.post(`/api-key/${credentiaId}`, {name: keyName, expiresOn: expiresOn?.toISOString()}, this.configuration)
    }

    // Get API Keys associated with a given credential
    public async list(credentialId: string): Promise<{}> {
        return await Fetch.get(`/api-key/${credentialId}`, this.configuration)
    }

    // Delete an API key
    public async delete(apiKeyId: string): Promise<{}> {
        return await Fetch.delete(`/api-key/${apiKeyId}`, this.configuration)
    }
}