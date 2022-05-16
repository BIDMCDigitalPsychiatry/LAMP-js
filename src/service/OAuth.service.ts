import { Fetch } from './Fetch';
import LAMP from '../index';

export interface OAuthParams {
  codeVerifier?: string
  codeChallenge?: string
}

export interface AuthResponse {
  success: boolean | undefined,
  access_token: string | undefined,
  refresh_token: string | undefined,
}
export class OAuthService {
  
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
      return {}
    }
  }

  public set params(value: OAuthParams) {
    // Save the authorization in sessionStorage for later.
    sessionStorage?.setItem("LAMP._oauth", JSON.stringify(value))
  }

  public async start_flow(): Promise<URL>{
    let url: URL

    const urlString = (await Fetch.get<{url: string}>("/oauth/start")).url
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
    )
  }
}