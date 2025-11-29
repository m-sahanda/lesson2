import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/abstractions/i-api-service';
import { PlaywrightApiService } from '../services/playwright-api.service';
import { ImageApi, FavouritesApi, VotesApi, CatalogApi } from './cat-api';

export class CatApiConstructor {
    private readonly baseUrl: string;
    private readonly apiContext: IApiService<APIResponse>;
    public readonly image: ImageApi;
    public readonly favourite: FavouritesApi;
    public readonly vote: VotesApi;
    public readonly catalog: CatalogApi;

    public constructor() {
        this.baseUrl = process.env.CAT_API_BASE_URL ?? '';
        const apiKey = process.env.CAT_API_KEY ?? undefined;
        this.apiContext = new PlaywrightApiService(this.baseUrl, { apiKey: apiKey });

        this.image = new ImageApi(this.apiContext);
        this.favourite = new FavouritesApi(this.apiContext);
        this.vote = new VotesApi(this.apiContext);
        this.catalog = new CatalogApi(this.apiContext);
    }
}

export const catApi = new CatApiConstructor();
