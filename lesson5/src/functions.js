const stringArray = ['1', '2', '3', '4'];
const numberArray = [1, 2, 3, 4];
const anyArray = ['text', 42, '2', '5', { objKey: 33 }, [21, 92]];
const num = 3;

function sumArray(arr, type = 'number') {
    if (!Array.isArray(arr)) {
        throw new TypeError(`Expected an array. Initial value is ${arr} and has type ${typeof arr}`);
    }
    const sumOfArrayValues = filterArrayByType(arr, type).reduce((acc, value) => acc + Number(value), 0);
    Number.isFinite(sumOfArrayValues)
        ? console.log('sumOfArrayValues:', sumOfArrayValues)
        : console.log('sumOfArrayValues:', 'not a number');
}

function sumArrayNumbers(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError(`Expected an array. Initial value is ${arr} and has type ${typeof arr}`);
    }
    let sumOfArrayValues = 0;
    arr.forEach((item) => {
        if (Number.isFinite(Number(item))) {
            sumOfArrayValues += Number(item);
        } else {
            console.log('sumOfArrayValues:', `not a number, it is ${typeof item} and value is ${item}`);
        }
    });
    console.log('sumOfArrayValues:', sumOfArrayValues);
}

function filterArrayByType(arr, type) {
    return arr.filter((item) => typeof item === type);
}

sumArray(stringArray, 'string');
sumArray(numberArray);
sumArray([...stringArray, ...numberArray]);
sumArray(anyArray, 'number');
sumArray(anyArray, 'string');
// sumArray(num);

sumArrayNumbers(stringArray);
sumArrayNumbers(numberArray);
sumArrayNumbers([...stringArray, ...numberArray]);
sumArrayNumbers(anyArray);
sumArrayNumbers(num);
