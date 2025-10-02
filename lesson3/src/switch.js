const num1 = 10;
const strNum = '10';
const strTxt = 'abc';
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 1];

switch (num1) {
    case 1:
        console.log('num1 !== 1');
        break;
    case 2:
        console.log('num1 !== 2');
        break;
    case 10:
        console.log('num1 === 10-----is true-----');
        break;
}

switch (num1) {
    case strNum:
        console.log('strNum === num1-----is false-----');
        break;
    case Number(strNum):
        console.log('Number(strNum) === num1-----is true-----');
        break;
    default:
        console.log('default log');
}

switch (typeof strTxt) {
    case 'boolean':
        console.log('typeof strTxt === boolean-----is false-----');
        break;
    case 'number':
        console.log('typeof strTxt === number-----is false-----');
        break;
    case 'string':
        console.log('typeof strTxt === string-----is true-----');
        break;
    default:
        console.log(`strTxt is not boolean, number or string it is ${typeof strTxt}`);
}

switch (arr1.sort()) {
    case arr2:
        console.log('arr1 === arr2-----is false-----');
        break;
    case arr2.sort():
        console.log('arr1 === arr2.sort()-----is true-----');
        break;
    case [1, 2, 3]:
        console.log('arr1 === [1, 2, 3]-----is true-----');
        break;
    default:
        console.log(`default log ${arr1} = ${arr2}`);
}


switch (arr1[0]) {
    case arr2[0]:
        console.log(`arr1[0] === arr2[0]-----is true-----${arr1[0]} = ${arr2[0]}`);
        break;
    default:
        console.log(`default log ${arr1} + ${arr2}`);
}


