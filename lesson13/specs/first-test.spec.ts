import { expect } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import {
    ActionMessage,
    FavouriteCreateResponse,
    FavouriteItem,
    ImageById,
    UploadImageResponse,
    VoteCreateResponse,
    VoteItem,
    Breed,
    Category
} from '../src/response.dto';

const CAT_API_KEY = 'live_mwdw32B2DdrTwTHMipNUCFsvstE6GnBq2IqdfND8XhnlyrF8YT9nVhHekm5h71Mf';
const BASE = 'https://api.thecatapi.com/v1';

export async function apiFetch<T = unknown>(url: string, init?: RequestInit): Promise<{ status: number; json: T | null }> {
    const res = await fetch(`${BASE}${url}`, {
        ...init,
        headers: {
            'x-api-key': CAT_API_KEY,
            Accept: 'application/json',
            ...(init?.headers || {})
        }
    });

    const status = res.status;

    if (status === 204) {
        return { status, json: null };
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        try {
            const json = (await res.json()) as T;
            return { status, json };
        } catch {
            return { status, json: null };
        }
    } else {
        return { status, json: null };
    }
}

describe('lesson13: TheCatAPI integration (images <-> favourites <-> votes)', function () {
    const subId = `${Date.now()}`;
    const imageFile = path.join(__dirname, '..', 'test-data', 'beautiful-cat-portrait-close-up.jpg');

    let imageId: string | undefined;
    let favouriteId: number | undefined;
    let voteId: number | undefined;

    it('should upload an image (images/upload) and return it id', async () => {
        const buffer = fs.readFileSync(imageFile);
        const form = new FormData();
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        form.append('file', blob, 'upload.jpg');
        form.append('sub_id', subId);

        const { status, json } = await apiFetch<UploadImageResponse>('/images/upload', {
            method: 'POST',
            body: form
        });

        expect(status).to.be.oneOf([200, 201]);
        expect(json).to.be.an('object');
        expect(json!.id).to.be.a('string');

        imageId = json!.id;
    });

    it('should get image by id (images/:id)', async () => {
        const { status, json } = await apiFetch<ImageById>(`/images/${imageId}`);

        expect(status).to.equal(200);
        expect(json).to.be.an('object');
        expect(json!.id).to.equal(imageId);
    });

    it('should create a favourite for the uploaded image (POST /favourites)', async () => {
        const { status, json } = await apiFetch<FavouriteCreateResponse>('/favourites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: imageId, sub_id: subId })
        });

        expect(status).to.be.oneOf([200, 201]);
        expect(json).to.include.keys(['message', 'id']);

        favouriteId = json!.id;
    });

    it('should list favourites and include our favourite (GET /favourites)', async () => {
        const { status, json } = await apiFetch<FavouriteItem[]>(`/favourites?sub_id=${encodeURIComponent(subId)}&limit=100&order=DESC`);

        expect(status).to.equal(200);
        expect(json).to.be.an('array');

        const found = json!.find((item: FavouriteItem) => item.id === favouriteId);

        expect(Boolean(found)).to.equal(true);
        expect(json?.length).to.equal(1);
        expect(json![0].image).to.be.an('object');
        expect(json![0].image).to.include.keys(['id', 'url']);
        expect(json![0].image.id).to.equal(imageId);
        expect(json![0].image.url).to.includes(imageId);
    });

    it('should create an up-vote for the image (POST /votes)', async () => {
        const { status, json } = await apiFetch<VoteCreateResponse>('/votes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: imageId, sub_id: subId, value: 1 })
        });

        expect(status).to.be.oneOf([200, 201]);
        expect(json).to.include.keys(['message', 'id']);
        expect(json!.image_id).to.equal(imageId);

        voteId = json!.id;
    });

    it('should list votes and include our vote (GET /votes)', async () => {
        const { status, json } = await apiFetch<VoteItem[]>(`/votes?sub_id=${encodeURIComponent(subId)}&limit=100&order=DESC`);

        expect(status).to.equal(200);
        expect(json).to.be.an('array');

        const found = json!.find((item: VoteItem) => item.id === voteId);

        expect(Boolean(found)).to.equal(true);
        expect(json?.length).to.equal(1);
        expect(json![0].image).to.be.an('object');
        expect(json![0].image).to.include.keys(['id', 'url']);
        expect(json![0].image.id).to.equal(imageId);
        expect(json![0].image.url).to.includes(imageId);
    });

    it('should delete the vote (DELETE /votes/:vote_id)', async () => {
        const { status, json } = await apiFetch<ActionMessage>(`/votes/${voteId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        expect(status).to.be.equal(200);
        expect(json!.message).to.include('SUCCESS');
    });

    it('should delete the favourite (DELETE /favourites/:favourite_id)', async () => {
        const { status, json } = await apiFetch<ActionMessage>(`/favourites/${favouriteId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        expect(status).to.be.equal(200);
        expect(json!.message).to.include('SUCCESS');
    });

    it('should delete the uploaded image (DELETE /images/:image_id)', async () => {
        const { status } = await apiFetch(`/images/${imageId}`, {
            method: 'DELETE'
        });

        expect(status).to.be.oneOf([200, 204]);
    });

    describe('Catalog endpoints: /breeds, /categories', function () {
        it('should list breeds and include a known breed (GET /breeds)', async () => {
            const { status, json } = await apiFetch<Breed[]>('/breeds');

            expect(status).to.equal(200);
            expect(json).to.be.an('array');

            const hasBengal = json!.some((b: Breed) => b.id === 'beng');

            expect(hasBengal).to.equal(true);
        });

        it('should list categories (GET /categories)', async () => {
            const { status, json } = await apiFetch<Category[]>('/categories');

            expect(status).to.equal(200);
            expect(json).to.be.an('array');

            json!.forEach((cat: Category) => {
                expect(cat).to.include.keys(['id', 'name']);
            });
        });
    });
});
