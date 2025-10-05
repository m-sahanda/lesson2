import { user } from './models/user.js';
import { Fruit } from './models/fruit.js';

const apple = new Fruit('apple', 'red', 10);

console.log('Initial summary:', user.summary());
user.lastName = '       bozha       ';
console.log(user.lastName);
user.age = 35;
console.log(user.age);
user.age = 'very young';
console.log(user.age);
user.firstName = '    raBunyA';
console.log(user.firstName);
user.moveToCity('   cloudSville');
user.address.street = ' nebesna street';
console.log('Updated summary:', user.summary());

console.log(apple.fruitSummary());
apple.name = '   banana   ';
console.log(apple.fruitSummary());
apple.color = 'yellow';
console.log(apple.fruitSummary());
apple.sweetness = 'very sweet';
console.log(apple.fruitSummary());
