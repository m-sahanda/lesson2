export interface IApiService<T> {
    get(endpoint: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<T>;
    post(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    postForm(endpoint: string, formData: FormData, headers?: Record<string, string>): Promise<T>;
    delete(endpoint: string, headers?: Record<string, string>): Promise<T>;
}
