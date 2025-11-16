import { IApiService } from '../../services/abstractions/i-api-service';
import { APIResponse } from '@playwright/test';
import { ActionMessage, FavouriteCreateResponse, FavouriteItem } from '../../models/cat-api.dto';

export class FavouritesApi {
    public constructor(private readonly api: IApiService<APIResponse>) {}

    public async createFavourite(imageId?: string, subId?: string): Promise<[APIResponse, FavouriteCreateResponse]> {
        const body: Record<string, unknown> = { image_id: imageId, sub_id: subId };
        const response = await this.api.post('favourites', body);
        const data = await response.json();
        return [response, data];
    }

    public async listFavourites(subId: string): Promise<[APIResponse, FavouriteItem[]]> {
        const params: Record<string, string | number | boolean> = {};
        params['sub_id'] = subId;
        params['limit'] = 100;
        params['order'] = 'DESC';
        const response = await this.api.get('favourites', params);
        const data = await response.json();
        return [response, data];
    }

    public async deleteFavourite(favouriteId?: number): Promise<[APIResponse, ActionMessage]> {
        const response = await this.api.delete(`favourites/${favouriteId}`);
        const data = await response.json();
        return [response, data];
    }
}
