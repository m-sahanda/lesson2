import { IApiService } from '../../services/abstractions/i-api-service';
import { APIResponse } from '@playwright/test';
import { Reports, Expense, Income } from './api-objects';

export class ApiConstructor {
    public readonly expense: Expense;
    public readonly income: Income;
    public readonly report: Reports;

    public constructor(apiService: IApiService<APIResponse>) {
        this.expense = new Expense(apiService);
        this.income = new Income(apiService);
        this.report = new Reports(apiService);
    }
}
