export const stringArray = ['1', '2', '3', '4'];
export const numberArray = [1, 2, 3, 4];
export const anyArray = ['text', 42, '2', '5', { objKey: 33 }, [21, 92]];
export const num = 3;
export class ArrayArifmetics {
    sumArray = (arr, type = 'number') => {
        if (!Array.isArray(arr)) {
            console.error(`Expected an array. Initial value is ${arr} and has type ${typeof arr}`);
            return;
        }
        const sumOfArrayValues = this.filterArrayByType(arr, type).reduce((acc, value) => acc + Number(value), 0);
        Number.isFinite(sumOfArrayValues)
            ? console.log('sumOfArrayValues:', sumOfArrayValues)
            : console.log('sumOfArrayValues:', 'not a number');
    };
    sumArrayNumbers = (arr) => {
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
    };
    filterArrayByType = (arr, type) => {
        return arr.filter((item) => typeof item === type);
    };

    printToConsole(string) {
        console.log(string);
    }

    printToConsoleErr(string) {
        console.error(string);
    }

    checkingPrintToConsoleType(value, printToConsoleValue, printToConsoleErrValue) {
        if (typeof value === 'string') {
            printToConsoleValue(value);
        } else {
            printToConsoleErrValue(value);
        }
    }
}

export const arrayArifmetics = new ArrayArifmetics();

arrayArifmetics.sumArray(stringArray, 'string');
arrayArifmetics.sumArray(numberArray);
arrayArifmetics.sumArray([...stringArray, ...numberArray]);
arrayArifmetics.sumArray(anyArray, 'number');
arrayArifmetics.sumArray(anyArray, 'string');

arrayArifmetics.sumArrayNumbers(stringArray);
arrayArifmetics.sumArrayNumbers(numberArray);
arrayArifmetics.sumArrayNumbers([...stringArray, ...numberArray]);
arrayArifmetics.sumArrayNumbers(anyArray);
arrayArifmetics.sumArrayNumbers(num);

arrayArifmetics.checkingPrintToConsoleType('some string', arrayArifmetics.printToConsole, arrayArifmetics.printToConsoleErr);
arrayArifmetics.checkingPrintToConsoleType(23, arrayArifmetics.printToConsole, arrayArifmetics.printToConsoleErr);

console.log('-----------The end of arrow-functions.js-----------');
