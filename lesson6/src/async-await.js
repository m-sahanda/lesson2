async function getData(name) {
    try {
        const res = await fetch('https://api.restful-api.dev/objects');
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }
        const json = await res.json();

        await processData(json);
        await findAndPrintItemsByName(json, name);

        console.log('json: ', json);
        return json;
    } catch (e) {
        console.error('Fetch failed:', e);
    }
}

function processData(json) {
    console.log('trying to process our JSON');
    console.log(json);
}

async function findAndPrintItemsByName(json, name) {
    const searchItems = [];
    const elseGadgets = [];
    const arr = Array.isArray(json) ? json : [json];

    arr.forEach((item) => {
        if ((item?.name ?? '').toLowerCase().includes(name.toLowerCase())) {
            searchItems.push(item);
        } else {
            elseGadgets.push(item);
        }
    });

    console.log(`${name.toUpperCase()}`, searchItems);
    console.log('elseGadgets: ', elseGadgets);

    return { searchItems, elseGadgets };
}

const nameOfItem = 'iPad';
await getData(nameOfItem);
