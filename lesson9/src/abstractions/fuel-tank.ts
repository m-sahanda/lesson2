export interface IFuelTank {
    readonly unit: string;
    amount(): number;
    add(amount: number): void;
    consume(amount: number): void;
}

export class FuelTank implements IFuelTank {
    public readonly unit: string;
    private _amount: number;
    private readonly _capacity: number;

    public constructor(initialAmount: number, unit: string, capacity: number) {
        this.unit = unit;
        this._amount = Math.max(0, initialAmount);
        this._capacity = Math.max(0, capacity);
    }

    public amount(): number {
        return this._amount;
    }

    public add(amount: number): void {
        const requested = Math.max(0, amount);
        const free = this._capacity - this._amount;

        if (free <= 0) {
            console.log(`Fuel tank is full. Cannot add ${requested} ${this.unit}.`);
            return;
        }

        const actuallyAdded = Math.min(requested, free);
        const normalizedActualAdded = Math.round(actuallyAdded * 100) / 100;
        this._amount += normalizedActualAdded;
        console.log(`Added ${normalizedActualAdded} ${this.unit}.`);

        if (normalizedActualAdded < requested) {
            console.log(`Cannot add ${requested} ${this.unit}. Will add only ${normalizedActualAdded} ${this.unit}.`);
        }
    }

    public consume(amount: number): void {
        const used = Math.max(0, amount);
        this._amount = Math.max(0, this._amount - used);
    }
}
