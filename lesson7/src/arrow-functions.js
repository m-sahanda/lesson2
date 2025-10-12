"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayArithmetic = exports.ArrayArithmetic = exports.num = exports.anyArray = exports.numberArray = exports.stringArray = void 0;
exports.stringArray = ['1', '2', '3', '4'];
exports.numberArray = [1, 2, 3, 4];
exports.anyArray = ['text', 42, '2', '5', { objKey: 33 }, [21, 92]];
exports.num = 3;
var ArrayArithmetic = /** @class */ (function () {
    function ArrayArithmetic() {
        var _this = this;
        this.sumArray = function (arr, type) {
            if (type === void 0) { type = 'number'; }
            var sumOfArrayValues = _this.filterArrayByType(arr, type).reduce(function (acc, value) { return acc + Number(value); }, 0);
            Number.isFinite(sumOfArrayValues)
                ? console.log('sumOfArrayValues:', sumOfArrayValues)
                : console.log('sumOfArrayValues:', "not a number ".concat(sumOfArrayValues));
        };
        this.sumArrayNumbers = function (arr) {
            var sumOfArrayValues = 0;
            arr.forEach(function (item) {
                if (Number.isFinite(Number(item))) {
                    sumOfArrayValues += Number(item);
                }
                else {
                    console.log("Array value is not a number, it is ".concat(typeof item, " and value is ").concat(item));
                }
            });
            console.log('sumOfArrayValues:', sumOfArrayValues);
        };
        this.filterArrayByType = function (arr, type) {
            return arr.filter(function (item) { return typeof item === type; });
        };
    }
    ArrayArithmetic.prototype.printToConsole = function (string) {
        console.log(string);
    };
    ArrayArithmetic.prototype.printToConsoleErr = function (value) {
        console.error("value was ".concat(value, " and it is not a string (typeof ").concat(typeof value, ")"));
    };
    ArrayArithmetic.prototype.checkingPrintToConsoleType = function (value, printOk, printErr) {
        if (printOk === void 0) { printOk = this.printToConsole; }
        if (printErr === void 0) { printErr = this.printToConsoleErr; }
        if (typeof value === 'string') {
            printOk(value);
        }
        else {
            printErr(value);
        }
    };
    return ArrayArithmetic;
}());
exports.ArrayArithmetic = ArrayArithmetic;
exports.arrayArithmetic = new ArrayArithmetic();
exports.arrayArithmetic.sumArray(exports.stringArray, 'string');
exports.arrayArithmetic.sumArray(exports.numberArray);
exports.arrayArithmetic.sumArray(__spreadArray(__spreadArray([], exports.stringArray, true), exports.numberArray, true));
exports.arrayArithmetic.sumArray(exports.anyArray, 'number');
exports.arrayArithmetic.sumArray(exports.anyArray, 'string');
exports.arrayArithmetic.sumArrayNumbers(exports.stringArray);
exports.arrayArithmetic.sumArrayNumbers(exports.numberArray);
exports.arrayArithmetic.sumArrayNumbers(__spreadArray(__spreadArray([], exports.stringArray, true), exports.numberArray, true));
exports.arrayArithmetic.sumArrayNumbers(exports.anyArray);
// arrayArithmetic.sumArrayNumbers(num); - this will not work because num is not an array. That`s why we choose TS)
exports.arrayArithmetic.checkingPrintToConsoleType('some string');
exports.arrayArithmetic.checkingPrintToConsoleType(23);
console.log('-----------The end of arrow-functions.ts-----------');
