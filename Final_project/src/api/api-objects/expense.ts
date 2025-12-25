import { PlaywrightApiService } from '../../../services/playwright-api.service';
import { IApiService } from '../../../services/abstractions/i-api-service';
import {ExpenseDTO, ExpensesListDTO} from '../../dto/expense.dto';
import {APIResponse, expect} from '@playwright/test';

export class Expense {
    private apiContext: IApiService<APIResponse>;

    public constructor(apiServiceOrStorageState?: IApiService<APIResponse> | string) {
        if (typeof apiServiceOrStorageState === 'object') {
            this.apiContext = apiServiceOrStorageState;
        } else {
            this.apiContext = new PlaywrightApiService(apiServiceOrStorageState);
        }
    }

    public async getExpenses(): Promise<ExpenseDTO[]> {
        const response = await this.apiContext.get('/api/v2/expenses');

        const responseJson = await response.json() as ExpensesListDTO;

        return Object.values(responseJson).flat();
    }

    public async addExpenseAndCheckMsg(expense: object): Promise<string> {
        const addResponse  = await this.apiContext.post('/api/v2/expenses/add', expense) ;
        expect(addResponse.status()).toBe(200);

        const addMessage = await addResponse.text();
        return  addMessage.replace(/"/g, '').split('ID: ')[1]?.trim();
    }

    public async updateExpenseAndCheckMsg(expenseId: string, expense: object): Promise<void> {
        const updateResponse = await this.apiContext.post('/api/v2/expenses/update', expense);
        expect(updateResponse.status()).toBe(200);

        const updateMessage = await updateResponse.text();
        expect(updateMessage.replace(/"/g, '')).toEqual(`Successfully modified expense ID: ${expenseId}`);
    }

    public async deleteExpenseAndCheckMsg(expenseId: string): Promise<void> {
        const deleteResponse = await this.apiContext.post('/api/v2/expenses/delete', {id: expenseId});
        expect(deleteResponse.status()).toBe(200);

        const deleteMessage = await deleteResponse.text();
        expect(deleteMessage).toContain('Successfully deleted');
    }

    public async checkExpensesDataById(expenseId: string, expenseObject: ExpenseDTO): Promise<void> {
        const allExpenses = await this.getExpenses();

        const addedExpense = allExpenses.find((expense) => expense.id === expenseId);

        expect(addedExpense?.comment).toEqual(expenseObject.comment);
        expect(addedExpense?.expense).toEqual(Number(expenseObject.expense));
        expect(addedExpense?.currency).toEqual(expenseObject.currency);
        expect(addedExpense?.cash).toEqual(expenseObject.cash);
    }

    public async checkExpensesNotContainId(expenseId: string): Promise<void> {
        const allExpenses = await this.getExpenses();
        const foundExpense = allExpenses.find((expense) => expense.id === expenseId);

        expect(foundExpense, `Expense with ID ${expenseId} should NOT be present in the list`).toBeUndefined();
    }

    public async clearAllExpenses(): Promise<void> {
        const expenses = await this.getExpenses();
        for (const expense of expenses) {
            await this.deleteExpenseAndCheckMsg(expense.id!);
        }
    }
}
