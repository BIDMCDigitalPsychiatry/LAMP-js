import { Fetch, Configuration } from './Fetch';

export interface OAuthParams {
  serverAddress?: string
  codeVerifier?: string
  codeChallenge?: string
}

export interface AuthResponse {
  success: boolean | undefined,
  access_token: string | undefined,
  refresh_token: string | undefined,
}
export class OAuthService {
  public configuration?: Configuration
  
  public get is_enabled(): boolean {
    return JSON.parse(sessionStorage?.getItem("LAMP._oauth_enabled")) as boolean ?? false
  }

  public set is_enabled(value: boolean) {
    sessionStorage?.setItem("LAMP._oauth_enabled", JSON.stringify(value))
  }

  public get params(): OAuthParams {
    try {
      return JSON.parse(sessionStorage?.getItem("LAMP._oauth"))
    } catch {
      return { serverAddress: null, codeVerifier: null }
    }
  }

  public set params(value: OAuthParams) {
    this.configuration = {
      ...this.configuration,
      base: value.serverAddress ?? "api.lamp.digital"
    }
    sessionStorage?.setItem("LAMP._auth", JSON.stringify({
      serverAddress: value.serverAddress
    }))

    // Save the authorization in sessionStorage for later.
    sessionStorage?.setItem("LAMP._oauth", JSON.stringify(value))
  }

  public async start_flow(): Promise<URL>{
    let url: URL

    const urlString = (await Fetch.get<{url: string}>("/oauth/start", this.configuration)).url
    if (!urlString) {
      url = null
    } else {
      try {
        url = new URL(urlString)
      } catch (error) {
        throw Error(`Invalid start URL ${urlString}`)
      }
    }

    this.is_enabled = !!url
    return url
  }

  public async request_authorization(code: string): Promise<AuthResponse> {
    return await Fetch.post(
      "/oauth/authenticate",
      {
        code: code,
        code_verifier: this.params.codeVerifier
      },
      this.configuration
    )
  }
}