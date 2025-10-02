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
