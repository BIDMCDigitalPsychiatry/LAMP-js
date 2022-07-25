export declare class APIService {
    /**
     * Query the LAMP Database.
     */
    query(transform: string): Promise<{}>;
    /**
     * View the API schema document.
     */
    schema(): Promise<{}>;
}
