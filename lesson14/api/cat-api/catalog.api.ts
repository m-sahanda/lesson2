import { APIResponse } from '@playwright/test';
import { IApiService } from '../../services/abstractions/i-api-service';
import { Breed, Category } from '../../models/cat-api.dto';

export class CatalogApi {
    public constructor(private readonly api: IApiService<APIResponse>) {}
    public async listBreeds(): Promise<[APIResponse, Breed[]]> {
        const response = await this.api.get('breeds');
        const data = await response.json();
        return [response, data];
    }

    public async listCategories(): Promise<[APIResponse, Category[]]> {
        const response = await this.api.get('categories');
        const data = await response.json();
        return [response, data];
    }
}
