import {IApiService} from '../../../services/abstractions/i-api-service';
import {PlaywrightApiService} from '../../../services/playwright-api.service';
import {ReportDTO, ReportsListDTO} from '../../dto/report.dto';
import {APIResponse, expect} from '@playwright/test';

export class Reports {
    private apiContext: IApiService<APIResponse>;

    public constructor(apiServiceOrStorageState?: IApiService<APIResponse> | string) {
        if (typeof apiServiceOrStorageState === 'object') {
            this.apiContext = apiServiceOrStorageState;
        } else {
            this.apiContext = new PlaywrightApiService(apiServiceOrStorageState);
        }
    }

    public async getReports(): Promise<ReportDTO[]>{
        const listResponse =   await this.apiContext.get('/api/v2/reports?pending=true');
        expect(listResponse.status()).toBe(200);

        const reports = await listResponse.json() as ReportsListDTO;

        return Object.values(reports).flat();
    }

    public async saveReport(report: object): Promise<string> {
        const addResponse = await this.apiContext.post('/api/v2/reports/save', report);
        const addMessage = await addResponse.text();
        return addMessage.replace(/"/g, '').split('report ')[1]?.trim();
    }

    public async deleteReportAndCheckMsg(reportId: string): Promise<void> {
        const deleteResponse = await this.apiContext.post(`/api/v2.0/reports/remove?repID=${reportId}`, null);
        expect(deleteResponse.status()).toBe(200);

        const deleteMessage = await deleteResponse.text();
        expect(deleteMessage).toContain(`Successfully Report with ID: ${reportId}`);
    }
}
