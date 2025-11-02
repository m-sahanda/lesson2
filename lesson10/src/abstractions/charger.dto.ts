export interface ICharger {
    chargeOn(owner: object): boolean;
    chargeOff(owner: object): void;
    readonly isCharging: boolean;
    readonly currentOwner: object | null;
}
