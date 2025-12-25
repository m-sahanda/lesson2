export interface IncomeDTO {
    id?: string;
    dt?: string;
    date?: string;
    income: string;
    currency: string;
    comment: string;
    cash: boolean;
    userID?: string;
}

export interface IncomesListDTO {
    [key: string]: IncomeDTO[];
}
