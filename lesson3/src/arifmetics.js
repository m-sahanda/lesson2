let num1 = 5;
const num2 = 7;
const [strNum1, strNum2] = ['6', '7'];
const strText1 = 'hello';
const strText2 = '5 apples';
const boolT = true;
const boolF = false;
const floatA = 2.5;
const floatB = 0.5;

console.log('додаємо число до числа як стрінги-----', num1 + strNum1, typeof (num1 + strNum1) );
console.log('додаємо число до числа-----', num1 + num2, typeof (num1 + num2));
console.log('віднімаємо від числа число як стрінгу-----', num1 - strNum1, typeof (num1 - strNum1));
console.log('віднімаємо від числа у стрінзі інше число у стрінзі-----', strNum1 - strNum2, typeof (strNum1 - strNum2));
console.log('віднімаємо нечислову стрінгу від числової стрінги-----', strNum1 - strText1, typeof (strNum1 - strText1));
console.log('множимо число на число як стрінгу-----', num1 * strNum1, typeof (num1 * strNum1));
console.log('ділимо два числа-----', num2 / num1, typeof (num2 / num1));
console.log('ділимо число на число як стрінгу-----', num1 / strNum1, typeof (num1 / strNum1));
console.log('остача від ділення числа на число як стрінгу-----', num1 % strNum1, typeof (num1 % strNum1));
console.log('піднесення числа до степеня (степінь як стрінга)-----', num1 ** strNum1, typeof (num1 ** strNum1));
console.log('число + true-----', num2 + boolT, typeof (num2 + boolT));
console.log('число стрінга * false-----', strNum1 * boolF, typeof (strNum1 * boolF));
console.log('множимо два числа float між собою-----', floatA * floatB, typeof (floatA * floatB));
console.log('множимо число float на число-----', floatA * num2, typeof (floatA * num2));
console.log('Number.isNaN(number * string("5 apples"))-----', Number.isNaN(num1 * strText2), typeof (Number.isNaN(num1 * strText2)));

num1 += num1;
console.log('після число += число-----', num1, typeof num1);

num1 -= num1;
console.log('після число -= число-----', num1, typeof num1);

num1 = 5;
num1 *= num1;
console.log('після число *= число-----', num1, typeof num1);

num1 /= num1;
console.log('після число /= число-----', num1, typeof num1);

num1 %= num1;
console.log('після число %= число-----', num1, typeof num1);

num1 = 5;
num1 **= num1;
console.log('після число **= число-----', num1, typeof num1);

console.log('додаємо два обєкти через +-----', {a: '1'} + {b: '2'}, typeof ({a: '1'} + {b: '2'}));

function sumObjects(a, b) {
    return {...a, ...b};
}
console.log('додаємо обєкт до обєкта-----', sumObjects({a: '1'}, {b: '2'}), typeof (sumObjects({a: '1'}, {b: '2'})));

const bigA = 10n;
const bigB = 3n;

console.log('додаємо великі інти-----', bigA + bigB, typeof (bigA + bigB));
console.log('віднімаємо великі інти-----', bigA - bigB, typeof (bigA - bigB));
console.log('множимо великі інти-----', bigA * bigB, typeof (bigA * bigB));
console.log('дилимо великі інти-----', bigA / bigB, typeof (bigA / bigB));
console.log('великий інт додаємо число (потрібно перетворення інакше отримаємо помилку)-----', bigA + BigInt(num1), typeof (bigA + BigInt(num1)));


