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
  public async start_flow(): Promise<StartFlowResponse>{
    const urls = await Fetch.get<{ loginURL?: string, logoutURL?: string }>("/oauth/start")
    return {
      loginURL: urlFromString(urls.loginURL),
      logoutURL: urlFromString(urls.logoutURL),
    }
  }

  public async request_authorization(code: string, verifier: string): Promise<AuthResponse> {
    return await Fetch.post(
      "/oauth/authenticate",
      {
        code: code,
        code_verifier: verifier
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