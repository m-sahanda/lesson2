import { arrayOfArrays } from './arrays.js';

console.log('Loop 0 > 9');
for (let i = 0; i <= 9; i++) {
    console.log(i);
}

console.log('Loop 100 > 0 with step 10');
for (let i = 100; i >= 0; i -= 10) {
    console.log(i);
}

for (const [index, item] of arrayOfArrays.entries()) {
    if (typeof item === 'function') continue;
    console.log(item, index);
}

let iterator = 0;
while (iterator <= 9) {
    console.log(iterator);
    iterator++;
}

let i = 100;
do {
    console.log(i);
    i -= 10;
} while (i >= 0);
