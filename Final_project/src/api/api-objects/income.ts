import {PlaywrightApiService} from '../../../services/playwright-api.service';
import {IApiService} from '../../../services/abstractions/i-api-service';
import {APIResponse, expect} from '@playwright/test';
import {IncomeDTO, IncomesListDTO} from '../../dto/income.dto';

export class Income {
    private apiContext: IApiService<APIResponse>;

    public constructor(apiServiceOrStorageState?: IApiService<APIResponse> | string) {
        if (typeof apiServiceOrStorageState === 'object') {
            this.apiContext = apiServiceOrStorageState;
        } else {
            this.apiContext = new PlaywrightApiService(apiServiceOrStorageState);
        }
    }

    public async getIncomes(): Promise<IncomeDTO[]> {
        const response = await this.apiContext.get('/api/v2/incomes');
        expect(response.status()).toBe(200);

        const responseJson = await response.json() as IncomesListDTO;
        return Object.values(responseJson).flat();
    }

    public async addIncomeAndCheckMsg(income: object): Promise<string> {
        const addResponse = await this.apiContext.post('/api/v2/incomes/add', income);
        expect(addResponse.status()).toBe(200);

        const addMessage = await addResponse.text();
        return addMessage.replace(/"/g, '').split('ID: ')[1]?.trim();
    }

    public async updateIncomeAndCheckMsg(incomeId: string, income: object): Promise<void> {
        const updateResponse = await this.apiContext.post('/api/v2/incomes/update', income);
        expect(updateResponse.status()).toBe(200);

        const updateMessage = await updateResponse.text();
        expect(updateMessage.replace(/"/g, '')).toEqual(`Successfully modified income ID: ${incomeId}`);
    }

    public async deleteIncomeAndCheckMsg(incomeId: string): Promise<void> {
        const deleteResponse = await this.apiContext.post('/api/v2/incomes/delete', {id: incomeId});
        expect(deleteResponse.status()).toBe(200);

        const deleteMessage = await deleteResponse.text();
        expect(deleteMessage).toContain('Successfully deleted');
    }

    public async checkIncomesDataById(incomeId: string, incomeObject: IncomeDTO): Promise<void> {
        const allIncomes = await this.getIncomes();
        const addedIncome = allIncomes.find((income) => income.id === incomeId);

        expect(addedIncome, `Income with ID ${incomeId} should be present in the list`).toBeDefined();
        expect(addedIncome?.comment).toEqual(incomeObject.comment);
        expect(addedIncome?.income).toEqual(Number(incomeObject.income));
        expect(addedIncome?.currency).toEqual(incomeObject.currency);
        expect(addedIncome?.cash).toEqual(incomeObject.cash);
    }

    public async checkIncomesNotContainId(incomeId: string): Promise<void> {
        const allIncomes = await this.getIncomes();
        const foundIncome = allIncomes.find((income) => income.id === incomeId);

        expect(foundIncome, `Income with ID ${incomeId} should NOT be present in the list`).toBeUndefined();
    }

    public async clearAllIncomes(): Promise<void> {
        const incomes = await this.getIncomes();
        for (const income of incomes) {
            await this.deleteIncomeAndCheckMsg(income.id!);
        }
    }
}
