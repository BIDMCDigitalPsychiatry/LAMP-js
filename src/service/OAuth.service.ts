import { Fetch } from './Fetch';
import LAMP from '../index';

export interface OAuthParams {
  codeVerifier?: string
  codeChallenge?: string
}

export interface StartFlowResponse {
  loginURL?: URL
  logoutURL?: URL
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

  public async start_flow(): Promise<StartFlowResponse>{
    const urls = await Fetch.get<{ loginURL?: string, logoutURL?: string }>("/oauth/start")
    this.is_enabled = !!urls.loginURL
    return {
      loginURL: urlFromString(urls.loginURL),
      logoutURL: urlFromString(urls.logoutURL),
    }
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

const urlFromString = (urlString?: string): URL | null => {
  if (!urlString) return null

  try {
    return new URL(urlString)
  } catch {
    throw Error(`Invalid start URL ${urlString}`)
  }
}