import { Fetch, Configuration } from "./Fetch";

export class OAuthService {
    public configuration?: Configuration

    public async startOauthFlow() : Promise<string>{
        return await Fetch.get<string>("/oauth/start", this.configuration);
    }
}