interface RequestOptions {
    method?: string;
    body?: unknown;
    params?: Record<string, string>;
}
export declare function apiRequest<T>(path: string, options?: RequestOptions): Promise<T>;
export {};
