import { Fetch, Configuration } from "./Fetch";

export class OAuthService {
    public configuration?: Configuration

    public async startOauthFlow() : Promise<string>{
        return await Fetch.get<string>("/oauth/start", this.configuration);
    }

    public async requestAuthorization(
      code: string,
      codeVerifier: string
    ) : Promise<string> {
      return await Fetch.post(
        "/oauth/authenticate",
        {
          code: code,
          code_verifier: codeVerifier
        },
        this.configuration
      )
    }
}