import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { IApiService } from './abstractions/i-api-service';

export class PlaywrightApiService implements IApiService<APIResponse> {
    protected apiRequestContext?: APIRequestContext;

    public constructor(
        private readonly baseUrl: string,
        private readonly secret?: {
            apiKey?: string;
        }
    ) {}

    public async get(
        endpoint: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        const apiHeaders = this.getDefaultHeaders(headers);
        const requestContext = await this.getRequestContext();

        return await requestContext.get(endpoint, { headers: apiHeaders, params: params });
    }

    public async post(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const apiHeaders = this.getDefaultHeaders(headers);
        const requestContext = await this.getRequestContext();

        return await requestContext.post(endpoint, { headers: apiHeaders, data: body });
    }

    public async postForm(endpoint: string, formData: FormData, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders: Record<string, string> = this.getAuthHeader();
        const requestContext = await this.getRequestContext();

        return await requestContext.post(endpoint, { headers: { ...defaultHeaders, ...headers }, multipart: formData });
    }

    public async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        const apiHeaders = this.getDefaultHeaders(headers);
        const requestContext = await this.getRequestContext();

        return await requestContext.delete(endpoint, { headers: apiHeaders });
    }

    private async getRequestContext(): Promise<APIRequestContext> {
        if (!this.apiRequestContext) {
            this.apiRequestContext = await request.newContext({ baseURL: this.baseUrl, ignoreHTTPSErrors: true });
        }

        return this.apiRequestContext;
    }

    private getAuthHeader(): Record<string, string> {
        const headers: Record<string, string> = {};

        if (this.secret?.apiKey) {
            headers['x-api-key'] = this.secret.apiKey;
        }

        return headers;
    }

    private getDefaultHeaders(headers?: Record<string, string>): Record<string, string> {
        return {
            ...this.getAuthHeader(),
            ...headers,
            ...{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };
    }
}
