export const stringArray: string[] = ['1', '2', '3', '4'];
export const numberArray: number[] = [1, 2, 3, 4];
export const anyArray: unknown[] = ['text', 42, '2', '5', { objKey: 33 }, [21, 92]];
export const num = 3;

export enum TypeOfValue {
    Number = 'number',
    String = 'string',
    Object = 'object'
}

export class ArrayArithmetic {
    public sumArray = (arr: unknown[], type: TypeOfValue = TypeOfValue.Number): void => {
        const sumOfArrayValues: number = this.filterArrayByType(arr, type).reduce(
            (acc: number, value: unknown): number => acc + Number(value),
            0
        );

        Number.isFinite(sumOfArrayValues)
            ? console.log('sumOfArrayValues:', sumOfArrayValues)
            : console.log('sumOfArrayValues:', `not a number ${sumOfArrayValues}`);
    };

    public sumArrayNumbers = (arr: unknown[]): void => {
        let sumOfArrayValues = 0;

        arr.forEach((item: unknown): void => {
            if (Number.isFinite(Number(item))) {
                sumOfArrayValues += Number(item);
            } else {
                console.log(`Array value is not a number, it is ${typeof item} and value is ${item}`);
            }
        });

        console.log('sumOfArrayValues:', sumOfArrayValues);
    };

    private filterArrayByType = (arr: unknown[], type: TypeOfValue): unknown[] => {
        return arr.filter((item: unknown): boolean => typeof item === type);
    };

    public printToConsole(string: string): void {
        console.log(string);
    }

    public printToConsoleErr(value: unknown): void {
        console.error(`value was ${value} and it is not a string (typeof ${typeof value})`);
    }

    public checkingPrintToConsoleType(
        value: unknown,
        printOk: (value: string) => void = this.printToConsole,
        printErr: (value: unknown) => void = this.printToConsoleErr
    ): void {
        if (typeof value === 'string') {
            printOk(value);
        } else {
            printErr(value);
        }
    }
}

export const arrayArithmetic = new ArrayArithmetic();

arrayArithmetic.sumArray(stringArray, TypeOfValue.String);
arrayArithmetic.sumArray(numberArray);
arrayArithmetic.sumArray([...stringArray, ...numberArray]);
arrayArithmetic.sumArray(anyArray, TypeOfValue.Number);
arrayArithmetic.sumArray(anyArray, TypeOfValue.String);
arrayArithmetic.sumArray(anyArray, TypeOfValue.Object);

arrayArithmetic.sumArrayNumbers(stringArray);
arrayArithmetic.sumArrayNumbers(numberArray);
arrayArithmetic.sumArrayNumbers([...stringArray, ...numberArray]);
arrayArithmetic.sumArrayNumbers(anyArray);

// arrayArithmetic.sumArrayNumbers(num); - this will not work because num is not an array. That`s why we choose TS)

arrayArithmetic.checkingPrintToConsoleType('some string');
arrayArithmetic.checkingPrintToConsoleType(23);

console.log('-----------The end of arrow-functions.ts-----------');
