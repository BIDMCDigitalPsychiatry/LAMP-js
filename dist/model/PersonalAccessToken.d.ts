export declare class PersonalAccessToken {
    /**
     * The generated jwt, which contains the access key associated to the credential.
     */
    token: string;
    /**
     * The user-visible description of the credential.
     */
    description: string;
    /**
     * The timestamp on which the token was created.
     */
    created: number;
    /**
     * The timestamp on which the token expires.
     */
    expiry: number;
}
