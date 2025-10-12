import { arrayArithmetic } from './arrow-functions';
import { stringArray, numberArray, anyArray } from './arrow-functions';

function sumArray(arr: unknown[], type = 'number'): void {
    const sumOfArrayValues: number = filterArrayByType(arr, type).reduce((acc: number, value: unknown): number => acc + Number(value), 0);

    Number.isFinite(sumOfArrayValues)
        ? console.log('sumOfArrayValues:', sumOfArrayValues)
        : console.log('sumOfArrayValues:', 'not a number');
}

function sumArrayNumbers(arr: unknown[]): void {
    let sumOfArrayValues = 0;

    arr.forEach((item: unknown): void => {
        if (Number.isFinite(Number(item))) {
            sumOfArrayValues += Number(item);
        } else {
            console.log(`Array value is not a number, it is ${typeof item} and value is ${item}`);
        }
    });

    console.log('sumOfArrayValues:', sumOfArrayValues);
}

function filterArrayByType(arr: unknown[], type: string): unknown[] {
    return arr.filter((item: unknown): boolean => typeof item === type);
}

sumArray(stringArray, 'string');
sumArray(numberArray);
sumArray([...stringArray, ...numberArray]);
sumArray(anyArray, 'number');
sumArray(anyArray, 'string');

sumArrayNumbers(stringArray);
arrayArithmetic.sumArrayNumbers(stringArray);
sumArrayNumbers(numberArray);
sumArrayNumbers([...stringArray, ...numberArray]);
sumArrayNumbers(anyArray);

console.log('-----------The end of functions.ts-----------');
