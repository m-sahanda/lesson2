function getData() {
    return fetch('https://api.restful-api.dev/objects')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            processData(json);
            findItemByName(json, 'iPad');
            return json;
        })
        .then((json) => {
            console.log('json: ', json);
            return json;
        })
        .catch((e) => {
            console.error('Fetch failed:', e.message);
        });
}

function processData(json) {
    console.log('trying to process our JSON');
    console.log(json);
}

function findItemByName(json, name) {
    const searchedItems = [];
    const elseGadgets = [];

    const arr = Array.isArray(json) ? json : [json];
    arr.forEach((item) => {
        if ((item?.name ?? '').toLowerCase().includes(name.toLowerCase())) {
            searchedItems.push(item);
        } else {
            elseGadgets.push(item);
        }
    });

    console.log(`${name.toUpperCase()}`, searchedItems);
    console.log('elseGadgets: ', elseGadgets);

    return { searchedItems, elseGadgets };
}

getData().then((json) => {
    console.log('last json: ', json);
});
