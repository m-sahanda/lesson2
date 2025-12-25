export interface ExpenseDTO {
    id?: string;
    dt?: string;
    date?: string;
    expense: string;
    currency: string;
    comment: string;
    cash: boolean;
    userID?: string;
}

export interface ExpensesListDTO {
    [key: string]: ExpenseDTO[];
}
