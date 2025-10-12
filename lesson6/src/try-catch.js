const badUrl = 'https://api.restful-api.dev/does-not-exist';
const goodUrl = 'https://api.restful-api.dev/objects';

async function fetchWithFallback(url, url2) {
    try {
        const first = await fetch(url);

        if (!first.ok) {
            throw new Error(`Primary request failed with status ${first.status}`);
        }
        return first.json();
    } catch {
        const second = await fetch(url2);

        if (!second.ok) {
            throw new Error(`CustomError: Fallback request failed with status ${second.status}`);
        }
        return second.json();
    } finally {
        console.log('Done');
    }
}

try {
    const response = await fetchWithFallback(badUrl, goodUrl);
    console.log(response);
} catch (e) {
    console.log(e.message);
}
