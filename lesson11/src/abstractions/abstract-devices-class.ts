import { ICharger } from './charger.dto';

export class ChargerTypeC implements ICharger {
    private _isCharging = false;
    private _owner: object | null = null;

    public get isCharging(): boolean {
        return this._isCharging;
    }

    public get currentOwner(): object | null {
        return this._owner;
    }

    public chargeOn(owner: object): boolean {
        if (!this._isCharging) {
            this._isCharging = true;
            this._owner = owner;
            console.log('charging ON');
            return true;
        } else if (this._owner === owner) {
            return true;
        } else {
            console.log('charger is busy by another device');
            return false;
        }
    }

    public chargeOff(owner: object): void {
        if (this._isCharging && this._owner === owner) {
            this._isCharging = false;
            this._owner = null;
            console.log('charging OFF');
        }
    }
}

export abstract class Device {
    protected charger: ICharger;
    public name: string;

    protected constructor(name: string, charger: ICharger) {
        this.name = name;
        this.charger = charger;
    }

    public abstract describe(): void;

    public startCharging(): string {
        this.charger.chargeOn(this);
        return `Charging ON, state is ${this.isCharging}`;
    }

    public stopCharging(): string {
        this.charger.chargeOff(this);
        return `Charging OFF, state is ${this.isCharging}`;
    }

    public get isCharging(): boolean {
        return this.charger.currentOwner === this;
    }

    public get busyInfo(): string {
        if (!this.charger.isCharging) return 'free';
        const owner = this.charger.currentOwner as Partial<Device> | null;
        return owner === this ? `busy by me (${this.name})` : `busy by ${owner!.name}`;
    }
}

export class Phone extends Device {
    public os: string;

    public constructor(name: string, os: string, charger: ICharger) {
        super(name, charger);
        this.os = os;
    }

    public describe(): void {
        console.log(`Phone: ${this.name}, OS: ${this.os}`);
    }
}

export class Laptop extends Device {
    public cpu: string;

    public constructor(name: string, cpu: string, charger: ICharger) {
        super(name, charger);
        this.cpu = cpu;
    }

    public describe(): void {
        console.log(`Laptop: ${this.name}, CPU: ${this.cpu}`);
    }
}

export class Headphones extends Device {
    public model: string;
    public constructor(name: string, model: string, charger: ICharger) {
        super(name, charger);
        this.model = model;
    }

    public describe(): void {
        console.log(`Name: ${this.name}, Model: ${this.model}`);
    }
}
