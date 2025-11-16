import { expect } from 'chai';
import { jokesApi } from '../api/jokes.api';

describe('Joke API', function () {
    let randomJokeType: string;
    let randomJokeId: number;

    it('should get a pong', async () => {
        const response = await jokesApi.getPong();

        expect(response.status()).to.equal(200);
        expect(await response.text()).to.equal('pong');
    });

    it.only('should get random joke', async () => {
        const [response, joke] = await jokesApi.getRandomJoke();

        expect(response).to.exist;
        expect(response.status()).to.equal(200);
        expect(joke).to.have.property('id');
        expect(joke).to.have.property('setup');
        expect(joke).to.have.property('punchline');
        expect(joke).to.have.property('type');

        randomJokeId = joke.id;
    });

    it.only('should get joke by id', async () => {
        const [response, joke] = await jokesApi.getJokeById(randomJokeId);

        expect(response).to.exist;
        expect(response.status()).to.equal(200);
        expect(joke.id).to.equal(randomJokeId);
    });

    it('should get jokes types', async () => {
        const [response, types] = await jokesApi.getJokesTypes();
        randomJokeType = types[Math.floor(Math.random() * types.length)];

        expect(response).to.exist;
        expect(response.status()).to.equal(200);
        expect(types).to.have.length(4);
    });

    it('should received 1 random joke by type', async () => {
        const [response, joke] = await jokesApi.getRandomJokeByType(randomJokeType);

        expect(response).to.exist;
        expect(response.status()).to.equal(200);
        expect(joke.length).to.equal(1);
        expect(joke[0].type).to.equal(randomJokeType);
    });

    it.only('should received same count of jokes as requested', async () => {
        const jokesCount = Math.floor(Math.random() * 15) + 1;
        const [response, joke] = await jokesApi.getJokesCount(jokesCount);

        expect(response).to.exist;
        expect(response.status()).to.equal(200);
        expect(joke.length).to.equal(jokesCount);
    });
});
