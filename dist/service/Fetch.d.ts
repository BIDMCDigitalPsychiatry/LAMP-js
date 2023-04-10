export declare class Fetch {
    static get<ResultType>(route: string): Promise<ResultType>;
    static post<ResultType>(route: string, body: any): Promise<ResultType>;
    static put<ResultType>(route: string, body: any): Promise<ResultType>;
    static patch<ResultType>(route: string, body: any): Promise<ResultType>;
    static delete<ResultType>(route: string): Promise<ResultType>;
}
