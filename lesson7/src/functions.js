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
var arrow_functions_1 = require("./arrow-functions");
var arrow_functions_2 = require("./arrow-functions");
function sumArray(arr, type) {
    if (type === void 0) { type = 'number'; }
    var sumOfArrayValues = filterArrayByType(arr, type).reduce(function (acc, value) { return acc + Number(value); }, 0);
    Number.isFinite(sumOfArrayValues)
        ? console.log('sumOfArrayValues:', sumOfArrayValues)
        : console.log('sumOfArrayValues:', 'not a number');
}
function sumArrayNumbers(arr) {
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
}
function filterArrayByType(arr, type) {
    return arr.filter(function (item) { return typeof item === type; });
}
sumArray(arrow_functions_2.stringArray, 'string');
sumArray(arrow_functions_2.numberArray);
sumArray(__spreadArray(__spreadArray([], arrow_functions_2.stringArray, true), arrow_functions_2.numberArray, true));
sumArray(arrow_functions_2.anyArray, 'number');
sumArray(arrow_functions_2.anyArray, 'string');
sumArrayNumbers(arrow_functions_2.stringArray);
arrow_functions_1.arrayArithmetic.sumArrayNumbers(arrow_functions_2.stringArray);
sumArrayNumbers(arrow_functions_2.numberArray);
sumArrayNumbers(__spreadArray(__spreadArray([], arrow_functions_2.stringArray, true), arrow_functions_2.numberArray, true));
sumArrayNumbers(arrow_functions_2.anyArray);
