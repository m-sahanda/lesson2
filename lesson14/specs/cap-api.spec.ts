import { expect } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import { FavouriteItem, VoteItem, Breed, Category } from '../models/cat-api.dto';
import { catApi } from '../api/cat.api.constructor';

describe('lesson14: TheCatAPI integration (images <-> favourites <-> votes)', function () {
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

        const [response, responseData] = await catApi.image.uploadImage(form);

        expect(response.status()).to.eq(201);
        expect(response.statusText()).to.eq('Created');
        expect(responseData).to.be.an('object');

        imageId = responseData.id;
    });

    it('should get image by id (images/:id)', async () => {
        const [response, responseData] = await catApi.image.getImageById(imageId);

        expect(response.status()).to.equal(200);
        expect(responseData).to.be.an('object');
        expect(responseData.id).to.equal(imageId);
    });

    it('should create a favourite for the uploaded image (POST /favourites)', async () => {
        const [response, responseData] = await catApi.favourite.createFavourite(imageId, subId);

        expect(response.status()).to.equal(200);
        expect(responseData).to.include.keys(['message', 'id']);

        favouriteId = responseData.id;
    });

    it('should list favourites and include our favourite (GET /favourites)', async () => {
        const [response, responseData] = await catApi.favourite.listFavourites(subId);

        expect(response.status()).to.equal(200);
        expect(responseData).to.be.an('array');

        const found = responseData.find((item: FavouriteItem) => item.id === favouriteId);

        expect(Boolean(found)).to.equal(true);
        expect(responseData.length).to.equal(1);
        expect(responseData[0].image).to.be.an('object');
        expect(responseData[0].image).to.include.keys(['id', 'url']);
        expect(responseData[0].image.id).to.equal(imageId);
        expect(responseData[0].image.url).to.includes(imageId);
    });

    it('should create an up-vote for the image (POST /votes)', async () => {
        const [response, responseData] = await catApi.vote.createVote(subId, 1, imageId);

        expect(response.status()).to.equal(201);
        expect(response.statusText()).to.eq('Created');
        expect(responseData).to.include.keys(['message', 'id']);
        expect(responseData.image_id).to.equal(imageId);

        voteId = responseData.id;
    });

    it('should list votes and include our vote (GET /votes)', async () => {
        const [response, responseData] = await catApi.vote.listVotes(subId);

        expect(response.status()).to.equal(200);
        expect(responseData).to.be.an('array');

        const found = responseData.find((item: VoteItem) => item.id === voteId);

        expect(Boolean(found)).to.equal(true);
        expect(responseData.length).to.equal(1);
        expect(responseData[0].image).to.be.an('object');
        expect(responseData[0].image).to.include.keys(['id', 'url']);
        expect(responseData[0].image.id).to.equal(imageId);
        expect(responseData[0].image.url).to.includes(imageId);
    });

    it('should delete the vote (DELETE /votes/:vote_id)', async () => {
        const [response, responseData] = await catApi.vote.deleteVote(voteId);

        expect(response.status()).to.equal(200);
        expect(responseData.message).to.include('SUCCESS');
    });

    it('should delete the favourite (DELETE /favourites/:favourite_id)', async () => {
        const [response, responseData] = await catApi.favourite.deleteFavourite(favouriteId);

        expect(response.status()).to.equal(200);
        expect(responseData.message).to.include('SUCCESS');
    });

    it('should delete the uploaded image (DELETE /images/:image_id)', async () => {
        const response = await catApi.image.deleteImage(imageId);

        expect(response.status()).to.be.oneOf([200, 204]);
    });

    describe('Catalog endpoints: /breeds, /categories', function () {
        it('should list breeds and include a known breed (GET /breeds)', async () => {
            const [response, responseData] = await catApi.catalog.listBreeds();

            expect(response.status()).to.equal(200);

            expect(responseData).to.be.an('array');

            const hasBengal = responseData.some((b: Breed) => b.id === 'beng');

            expect(hasBengal).to.equal(true);
        });

        it('should list categories (GET /categories)', async () => {
            const [response, responseData] = await catApi.catalog.listCategories();

            expect(response.status()).to.equal(200);

            expect(responseData).to.be.an('array');

            responseData.forEach((cat: Category) => {
                expect(cat).to.include.keys(['id', 'name']);
            });
        });
    });
});
