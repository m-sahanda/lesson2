import { arrayArifmetics } from './arrow-functions.js';
import { stringArray, numberArray, anyArray, num } from './arrow-functions.js';

function sumArray(arr, type = 'number') {
    if (!Array.isArray(arr)) {
        console.error(`Expected an array. Initial value is ${arr} and has type ${typeof arr}`);
        return;
    }
    const sumOfArrayValues = filterArrayByType(arr, type).reduce((acc, value) => acc + Number(value), 0);
    Number.isFinite(sumOfArrayValues)
        ? console.log('sumOfArrayValues:', sumOfArrayValues)
        : console.log('sumOfArrayValues:', 'not a number');
}

function sumArrayNumbers(arr) {
    if (!Array.isArray(arr)) {
        console.error(`Expected an array. Initial value is ${arr} and has type ${typeof arr}`);
        return;
    }
    let sumOfArrayValues = 0;
    arr.forEach((item) => {
        if (Number.isFinite(Number(item))) {
            sumOfArrayValues += Number(item);
        } else {
            console.log(`Array value is not a number, it is ${typeof item} and value is ${item}`);
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

sumArrayNumbers(stringArray);
arrayArifmetics.sumArrayNumbers(stringArray);
sumArrayNumbers(numberArray);
sumArrayNumbers([...stringArray, ...numberArray]);
sumArrayNumbers(anyArray);
sumArrayNumbers(num);
sumArray(num);
