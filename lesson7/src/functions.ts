import { arrayArithmetic, numberArray, stringArray, TypeOfValue } from './arrow-functions';

function sumArray(arr: (string | number | boolean)[], type = 'number'): void {
    const sumOfArrayValues = filterArrayByType(arr, type)
        .map((value) => (typeof value === 'number' ? value : Number(value)))
        .filter((number) => Number.isFinite(number))
        .reduce((acc, number) => acc + number, 0);

    console.log('sumOfArrayValues:', sumOfArrayValues);
}

function sumArrayNumbers(arr: (string | number | boolean)[]): void {
    let sumOfArrayValues = 0;

    arr.forEach((item: string | number | boolean): void => {
        const valueToNumber = Number(item);
        if (Number.isFinite(valueToNumber)) {
            sumOfArrayValues += valueToNumber;
        } else {
            console.log(`Array value is not a number, it is ${typeof item} and value is ${item}`);
        }
    });

    console.log('sumOfArrayValues:', sumOfArrayValues);
}

function filterArrayByType(arr: (string | number | boolean)[], type: string): (string | number | boolean)[] {
    return arr.filter((item: string | number | boolean): boolean => typeof item === type);
}

sumArray(stringArray, 'string');
sumArray(numberArray);
sumArray([...stringArray, ...numberArray]);

sumArrayNumbers(stringArray);
arrayArithmetic.sumArray(stringArray, TypeOfValue.String);
arrayArithmetic.sumArrayNumbers(stringArray);
sumArrayNumbers(numberArray);
sumArrayNumbers([...stringArray, ...numberArray]);

console.log('-----------The end of functions.ts-----------');
