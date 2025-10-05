export const user = {
    _firstName: 'Kara',
    _lastName: 'Nebesna',
    age: 28,
    address: {
        _city: 'Kyiv',
        _street: 'St. Khreshchatyk',
        get city() {
            return this._city.toUpperCase();
        },
        set city(value) {
            this._city = value.trim();
        },
        get street() {
            return this._street.toUpperCase();
        },
        set street(value) {
            this._street = value.trim();
        }
    },
    get firstName() {
        return this._firstName.toUpperCase();
    },
    set firstName(value) {
        this._firstName = value.trim();
    },
    get lastName() {
        return this._lastName.toUpperCase();
    },
    set lastName(value) {
        this._lastName = value.trim();
    },
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    moveToCity(newCity) {
        return (this.address.city = newCity);
    },
    summary() {
        const { city, street } = this.address;
        return `${this.fullName}, age ${this.age}, lives at ${street}, city ${city}`;
    }
};
