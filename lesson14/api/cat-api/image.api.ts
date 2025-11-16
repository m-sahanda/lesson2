import { IApiService } from '../../services/abstractions/i-api-service';
import { APIResponse } from '@playwright/test';
import { ImageById, UploadImageResponse } from '../../models/cat-api.dto';

export class ImageApi {
    public constructor(private readonly api: IApiService<APIResponse>) {}

    public async uploadImage(formData: FormData): Promise<[APIResponse, UploadImageResponse]> {
        const response = await this.api.postForm('images/upload', formData);
        const data = await response.json();
        return [response, data];
    }

    public async getImageById(imageId?: string): Promise<[APIResponse, ImageById]> {
        const response = await this.api.get(`images/${imageId}`);
        const data = await response.json();
        return [response, data];
    }

    public async deleteImage(imageId?: string): Promise<APIResponse> {
        return await this.api.delete(`images/${imageId}`);
    }
}
