const person = {
    id: 101,
    profile: {
        name: {
            first: 'Kara',
            last: 'Nebesna'
        },
        age: 28,
        address: {
            country: 'Ukraine',
            city: 'Kyiv',
            street: 'Khreshchatyk',
            house: 10
        }
    },
    contacts: {
        email: 'kara.nebesna@gmail.com',
        phones: [
            {
                type: 'home',
                numbers: ['+380501112233', '+3804452365']
            },
            {
                type: 'work',
                numbers: ['+380671112233']
            }
        ]
    },
    hobbies: ['football', 'photography', 'travel'],
    is_active: true,
    printGreeting: function () {
        const fullName = `${this.profile.name.first} ${this.profile.name.last}`;
        const city = this.profile.address.city;
        const message = `Hello, I am ${fullName} from ${city}!`;
        console.log(message);
        return message;
    }
};

const objKeys = Object.keys(person);
const objValues = Object.values(person);
const objEntries = Object.entries(person);
console.log(objKeys, objValues, objEntries);

const singleLevelCopy = { ...person };
singleLevelCopy.id = 'id changed to string';
singleLevelCopy.contacts.email = 'email changed';
singleLevelCopy.contacts.phones[0].type = 'mobile';

console.log('---single level copy: id not changed in origin object, email was changed in origin object---');
console.log(person, singleLevelCopy);
console.log(Object.values(singleLevelCopy.contacts.phones[0]));

/**
 * Не буде працювати так як в оригінальному об'єкті є функція і при запуску коду на етапі
 * structuredClone(person) отримуємо помилку [DataCloneError]: printGreeting()
 *
const deepCopy = structuredClone(person);
const deppCopyWithDoubleConversion = JSON.parse(JSON.stringify(person));
deepCopy.contacts.email = 'new email value';
deppCopyWithDoubleConversion.contacts.phones[0].type = 'new home value';
console.log('---deep copy ---');
console.log(person, deepCopy, deppCopyWithDoubleConversion);
**/
//Далі як копіювати без функції, щоб не було помилки [DataCloneError]: printGreeting(

// Відкидаємо метод перед клонуванням
const { printGreeting, ...dataOnly } = person;
const copy = structuredClone(dataOnly);
//Повертаємо функцію в нашу копію
copy.printGreeting = person.printGreeting;
copy.newMethod = function () {
    console.log('new method');
};
copy.newMethod();
copy.printGreeting();
person.printGreeting();
// Далі застосовуємо зміни до копії
copy.contacts.email = 'new email value';
copy.is_active = false;

console.log('---deep copy ---');
console.log(person, copy);

console.log('---object constructor---');
function ObjectConstructor(value1, value2, value3) {
    this.name = value1;
    this.prop = value2;
    this.prop2 = value3;
}
const objFromConstructor = new ObjectConstructor('name', { key: 'value' }, [{ key: 'value', key2: 'value2' }]);
console.log(objFromConstructor);
