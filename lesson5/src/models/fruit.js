export class Fruit {
    #name;
    #color;
    sweetness;

    constructor(name, color, sweetness) {
        this.#name = name;
        this.#color = color;
        this.sweetness = sweetness;
    }

    get name() {
        return this.#name.toUpperCase();
    }

    set name(value) {
        this.#name = value.trim();
    }

    get color() {
        return this.#color.toUpperCase();
    }
    set color(value) {
        this.#color = value.trim();
    }

    fruitSummary() {
        return `Name of fruit is ${this.name}, it has color ${this.color}, and sweetness ${this.sweetness}`;
    }
}
