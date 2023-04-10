export interface OAuthParams {
    codeVerifier?: string;
    codeChallenge?: string;
}
export interface StartFlowResponse {
    loginURL?: URL;
    logoutURL?: URL;
}
export interface AuthResponse {
    success: boolean | undefined;
    access_token: string | undefined;
    refresh_token: string | undefined;
}
export declare class OAuthService {
    start_flow(): Promise<StartFlowResponse>;
    request_authorization(code: string, verifier: string): Promise<AuthResponse>;
}
