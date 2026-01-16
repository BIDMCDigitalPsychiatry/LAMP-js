export type AccountSetupState = "NOT_REQUIRED" | "INCOMPLETE" | "OAUTH" | "TWO_FACTOR" | "TWO_FACTOR_UNVERIFIED"

export type SessionInfo = {
    accountSetupState:AccountSetupState | undefined
    [key: string]: unknown
}