import { expect } from 'chai';
import { apiFetch } from './first-test.spec';
import { Breed, Category, ImageSearchItem, VoteCreateResponse, VoteItem } from '../src/response.dto';

async function pickPublicImageId(): Promise<string> {
    const { status, json } = await apiFetch<ImageSearchItem[]>('/images/search?limit=1&mime_types=jpg,png');

    expect(status).to.equal(200);
    expect(json).to.be.an('array');
    expect(json![0]?.id).to.be.a('string');

    return json![0].id;
}

describe('lesson13: TheCatAPI integration (breeds <-> categories <-> votes)', function () {
    const subId = `new-sub-${Date.now()}`;

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

    describe('Votes: down-vote, listing and cleanup', function () {
        let voteImageId: string;
        let voteId: number | undefined;

        before(async () => {
            voteImageId = await pickPublicImageId();
        });

        it('should create a down-vote', async () => {
            const { status, json } = await apiFetch<VoteCreateResponse>('/votes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: voteImageId, sub_id: subId, value: 0 })
            });

            expect(status).to.be.oneOf([200, 201]);
            expect(json).to.include.keys(['message', 'id']);

            voteId = json!.id;
        });

        it('should list votes and include our down-vote with correct value', async () => {
            const { status, json } = await apiFetch<VoteItem[]>(`/votes?sub_id=${encodeURIComponent(subId)}&limit=50&order=DESC`);

            expect(status).to.equal(200);
            expect(json).to.be.an('array');

            const found = json!.find((item: VoteItem) => item.id === voteId);

            expect(Boolean(found)).to.equal(true);

            if (found) {
                expect(found.value === 0 || found.value === -1).to.equal(true);
            }
        });

        after(async () => {
            if (voteId != null) {
                const del = await apiFetch(`/votes/${voteId}`, { method: 'DELETE' });

                expect(del.status).to.equal(200);
            }
        });
    });
});
