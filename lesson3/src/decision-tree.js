const num1 = 1;
const num2 = 2;
const strNum = '6';
let undef;
const nullVariable = null;

if (num1 > num2) {
    console.log('num1 > num2');
} else if (num1 < num2) {
    console.log('num1 < num2-----is true-----');
} else {
    console.log('num1 === num2');
}

if (num1 > num2 && strNum == 6) {
    console.log('num1 > num2 && strNum == 6');
} else if (num1 < num2 && strNum == 6) {
    console.log('num1 < num2 && strNum == 6-----is true-----');
}

if (num1 > num2 || strNum == 6) {
    console.log('num1 > num2 || strNum == 6-----is true----');
} else if (num1 < num2 && typeof strNum == 'number') {
    console.log('num1 < num2 && typeof strNum == \'number\'');
} else {
    console.log('if all expressions is false then we will print this');
}

if (num1 < num2) {
    console.log('num1 < num2-----is true-----');
} else if (typeof num1 === 'number') {
    console.log('skip this step because first expression is true');
} else {
    console.log('if all expressions is false then we will print this');
}

if (strNum) {
    console.log(strNum, 'strNum-----is true-----');
}

if (!undef)
    console.log(undef, '!undef-----is true-----');

const shortIf = typeof strNum !== 'number' ? strNum : Number.parseInt(strNum);
console.log('strNum is not number than our comparison is true and save strNum as shortIf-----', shortIf, typeof shortIf);

const shortIf2 = typeof strNum === 'number' ? strNum : Number.parseInt(strNum);
console.log('strNum is not number than our comparison is false and save Number.parseInt(strNum) as shortIf-----', shortIf2, typeof shortIf2);

console.log(nullVariable, `nullVariable-----is ${nullVariable !== null ? 'true' : 'false'}-----`);
