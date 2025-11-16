import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/abstractions/i-api-service';
import { PlaywrightApiService } from '../services/playwright-api.service';
import { JokeDto } from '../models/joke-api.dto';

export class JokesApi {
    private readonly baseUrl: string;
    private apiContext: IApiService<APIResponse>;
    public constructor() {
        this.baseUrl = process.env.JOKE_API_BASE_URL ?? '';
        this.apiContext = new PlaywrightApiService(this.baseUrl);
    }
    public async getPong(): Promise<APIResponse> {
        return await this.apiContext.get('/ping');
    }

    public async getRandomJoke(): Promise<[APIResponse, JokeDto]> {
        const response = await this.apiContext.get('/jokes/random');
        const joke = await response.json();
        return [response, joke];
    }

    public async getJokesTypes(): Promise<[APIResponse, string[]]> {
        const response = await this.apiContext.get('/types');
        const types = await response.json();
        return [response, types];
    }

    public async getRandomJokeByType(type: string): Promise<[APIResponse, JokeDto[]]> {
        const response = await this.apiContext.get(`/jokes/${type}/random`);
        const joke = await response.json();
        return [response, joke];
    }

    public async getJokesCount(count: number): Promise<[APIResponse, JokeDto[]]> {
        const response = await this.apiContext.get(`/jokes/random/${count}`);
        const joke = await response.json();
        return [response, joke];
    }

    public async getJokeById(id: number): Promise<[APIResponse, JokeDto]> {
        const response = await this.apiContext.get(`/jokes/${id}`);
        const joke = await response.json();
        return [response, joke];
    }
}

export const jokesApi = new JokesApi();
