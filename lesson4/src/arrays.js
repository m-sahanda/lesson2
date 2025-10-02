const stringArray = ['veteranu', 'cosmichnuh', 'viysk'];
const numberArray = [5, 1, 3, 4, 2];
const booleanArray = [true, false, true, true];
const anyArray = ['text', 42, false, { objKey: 33 }, [21, 92]];

console.log('work with stringArray------------------', stringArray);
stringArray.push('VKV');
console.log(stringArray, stringArray.length);
console.log(stringArray[0], stringArray[2]);

const output = [];
output.push(stringArray.find((val) => val.toLowerCase() === 'vkv'));

stringArray.forEach((val) => {
    if (val.toLowerCase() !== 'vkv') output.push(val);
});
console.log('ordered:', output.join(' | '));
stringArray.forEach((value, index) => {
    console.log(`stringArray[${index}] = ${value}`);
});

const uppercased = stringArray.map((s) => s.toUpperCase());
console.log('uppercased:', uppercased);

console.log('work with numberArray------------------', numberArray);
const newArray = [];
numberArray.forEach((value, index) => {
    console.log(`numberArray[${index}] = ${value}`);
    newArray.push(value * 10);
});
console.log('newArray:', newArray);
const squared = numberArray.map((n) => n * n);
console.log('squared:', squared);

const sortedArray = numberArray.sort((a, b) => a - b);
console.log('sorted:', sortedArray);

const sum = numberArray.reduce((acc, item) => acc + item, 0);
console.log(sum);

console.log('work with booleanArray------------------', booleanArray);
booleanArray.forEach((value, index) => {
    console.log(`booleanArray[${index}] = ${value}`);
});
const trueCount = booleanArray.reduce((acc, v) => acc + (v === true ? 1 : 0), 0);
console.log('trueCount:', trueCount);
const transformed = booleanArray.map((b) => !b);
console.log('transformed:', transformed);

// 4) Any array (mixed types)

console.log('work with anyArray------------------', anyArray);
const arrayOfArrays = [...stringArray, ...numberArray, ...booleanArray, ...anyArray];
console.log('arrayOfArrays:', arrayOfArrays);
arrayOfArrays.filter((v) => typeof v === 'object').forEach((v, index) => console.log(v, index));
arrayOfArrays.forEach((value, index) => console.log(`anyArray[${index}] (${typeof value}) =`, value));

function arrayMap(array) {
    return array.map((v) => {
        const type = Array.isArray(v) ? 'array' : typeof v;
        if (type === 'string') return `string:${v}`;
        if (type === 'number') return `number:${v * 2}`;
        if (type === 'boolean') return `boolean:${v ? 'T' : 'F'}`;
        if (type === 'array') return `array:=${v}`;
        if (type === 'object') return `object:=${JSON.stringify(v)}`;
        return type;
    });
}
const mappedArray1 = arrayMap(arrayOfArrays);
console.log('arrayMap:', mappedArray1);

arrayOfArrays.push(() => {
    console.log('some function pushed to array');
});
console.log('arrayOfArrays:', arrayOfArrays);
const arrayWithFunction = arrayMap(arrayOfArrays);
console.log('arrayWithFunction:', arrayWithFunction);

arrayOfArrays.forEach((item) => {
    if (typeof item === 'function') item();
});
