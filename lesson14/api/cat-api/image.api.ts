import { IApiService } from '../../services/abstractions/i-api-service';
import { APIResponse } from '@playwright/test';
import { ImageById, UploadImageResponse } from '../../models/cat-api.dto';
import fs from 'node:fs';

export class ImageApi {
    public constructor(private readonly api: IApiService<APIResponse>) {}

    public async uploadImage(imagePath: string, subId: string): Promise<[APIResponse, UploadImageResponse]> {
        const buffer = fs.readFileSync(imagePath);
        const form = new FormData();
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        form.append('file', blob, 'upload.jpg');
        form.append('sub_id', subId);

        const response = await this.api.postForm('images/upload', form);
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
