import {APIRequestContext, request, APIResponse} from '@playwright/test';
import {IApiService} from './abstractions/i-api-service';

export class PlaywrightApiService implements IApiService<APIResponse> {
    protected apiRequestContext?: APIRequestContext;

    public constructor(
        private readonly storageState?: string
    ) {
    }

    public async get(
        endpoint: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        const currentState = await requestContext.storageState();
        const apiHeaders = this.getDefaultHeaders(currentState, headers);

        return await requestContext.get(endpoint, {headers: apiHeaders, params: params});
    }

    public async post(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        const currentState = await requestContext.storageState();
        const apiHeaders = this.getDefaultHeaders(currentState, headers);

        return await requestContext.post(endpoint, {headers: apiHeaders, data: body});
    }

    public async postForm(endpoint: string, formData: FormData, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        const currentState = await requestContext.storageState();
        const apiHeaders = this.getDefaultHeaders(currentState, headers);

        return await requestContext.post(endpoint, {headers: apiHeaders, multipart: formData});
    }

    public async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        const currentState = await requestContext.storageState();
        const apiHeaders = this.getDefaultHeaders(currentState, headers);

        return await requestContext.delete(endpoint, {headers: apiHeaders});
    }

    public async getStorageState(): Promise<{
        cookies: {
            name: string;
            value: string;
            domain: string;
            path: string;
            expires: number;
            httpOnly: boolean;
            secure: boolean;
            sameSite: 'Strict' | 'Lax' | 'None'
        }[];
        origins: { origin: string; localStorage: { name: string; value: string }[] }[]
    }> {
        const requestContext = await this.getRequestContext();
        return await requestContext.storageState();
    }

    private async getRequestContext(): Promise<APIRequestContext> {
        if (!this.apiRequestContext) {
            this.apiRequestContext = await request.newContext({
                ignoreHTTPSErrors: true,
                storageState: this.storageState
            });
        }
        return this.apiRequestContext;
    }

    private getDefaultHeaders(currentState?: {
        cookies?: { name: string; value: string }[]
    }, headers?: Record<string, string>): Record<string, string> {
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        if (currentState?.cookies && Array.isArray(currentState.cookies)) {
            const cookies = currentState.cookies;
            const xAccessToken = cookies.find(c => c.name === 'X-Access-Token')?.value;
            const xUsername = cookies.find(c => c.name === 'X-Username')?.value;
            const xRefreshToken = cookies.find(c => c.name === 'X-Refresh-Token')?.value;
            const sessionUser = cookies.find(c => c.name === 'Session-User')?.value;

            if (xAccessToken) defaultHeaders['X-Access-Token'] = xAccessToken;
            if (xUsername) defaultHeaders['X-Username'] = xUsername;
            if (xRefreshToken) defaultHeaders['X-Refresh-Token'] = xRefreshToken;
            if (sessionUser) defaultHeaders['Session-User'] = sessionUser;
        }

        return {...defaultHeaders, ...headers};
    };
}
