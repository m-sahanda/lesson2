const num1 = 5;
const num2 = 7;
const num0 = 0;
const strNum = '5';
const strTxt1 = 'abc';
const strTxt2 = 'b';
const boolT = true;
const boolF = false;
const bigA = 10n;
const bigB = 10n;
const nul = null;
let undef;
const someNumber = 15;
const someString = 'hello';
const emptyString = '';

console.log('num1 == strNum-----', num1 == strNum);
console.log('num1 === strNum (always false)-----', num1 === strNum);
console.log('num1 != strNum-----', num1 != strNum);
console.log('num1 !== strNum (always true)-----', num1 !== strNum);

console.log('num1 > num2-----', num1 > num2);
console.log('num1 < num2-----', num1 < num2);
console.log('num1 >= 5-----', num1 >= 5);
console.log('num2 <= 7-----', num2 <= 7);

console.log('bigA == 10-----', bigA == 10);
console.log('bigA === 10 (always false)-----', bigA === 10);
console.log('bigA < 20-----', bigA < 20);
console.log('bigA >= bigB-----', bigA >= bigB);

console.log('strTxt1 < strTxt2-----', strTxt1 < strTxt2);
console.log('num1 > someNumber-----', num1 > someNumber);

console.log('null == undefined-----', nul == undef);
console.log('null === undefined-----', nul === undef);

console.log('true && false-----', boolT && boolF);
console.log('true || false-----', boolT || boolF);
console.log('!true-----', !boolT);
console.log('!false-----', !boolF);

console.log('someString && 123-----', someString && 123);
console.log('emptyString || someString-----', emptyString || someString);
console.log('0 || 42-----', num0 || 42);
console.log('0 && 42-----', num0 && 42);

console.log('undefined ?? num2-----', undef ?? num2);
console.log('null ?? num2-----', nul ?? num2);
console.log('num0 ?? num2-----', num0 ?? num2);
console.log('emptyString ?? someString-----', emptyString ?? someString);

console.log('(num1 == strNum) && (num2 > num1)-----', (num1 == strNum) && (num2 > num1));
console.log('(num1 === strNum) || (num2 <= 7)-----', (num1 === strNum) || (num2 <= 7));
console.log('!(num2 < num1)-----', !(num2 < num1));

const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;
console.log('obj1 === obj2 (різні обʼєкти з однаковим вмістом)-----', obj1 === obj2);
console.log('obj1 === obj3 (obj3 це посилання на obj1)-----', obj1 === obj3);
