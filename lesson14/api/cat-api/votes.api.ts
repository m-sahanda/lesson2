import { IApiService } from '../../services/abstractions/i-api-service';
import { APIResponse } from '@playwright/test';
import { ActionMessage, VoteCreateResponse, VoteItem } from '../../models/cat-api.dto';

export class VotesApi {
    public constructor(private readonly api: IApiService<APIResponse>) {}

    public async createVote(subId: string | undefined, voteValue: number, imageId?: string): Promise<[APIResponse, VoteCreateResponse]> {
        const body: Record<string, unknown> = { image_id: imageId, value: voteValue, sub_id: subId };
        const response = await this.api.post('votes', body);
        const data = await response.json();
        return [response, data];
    }

    public async listVotes(subId: string): Promise<[APIResponse, VoteItem[]]> {
        const params: Record<string, string | number | boolean> = {};
        params['sub_id'] = subId;
        params['limit'] = 100;
        params['order'] = 'DESC';
        const response = await this.api.get('votes', params);
        const data = await response.json();
        return [response, data];
    }

    public async deleteVote(voteId?: number): Promise<[APIResponse, ActionMessage]> {
        const response = await this.api.delete(`votes/${voteId}`);
        const data = await response.json();
        return [response, data];
    }
}
