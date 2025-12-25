export interface ReportDTO {
    id: string;
    date?: string;
    quarter?: number;
    incomes?: number;
    expenses?: number;
    flatTax?: number;
    flatTaxQ?: number;
    ssp?: number;
    vat?: number;
    militaryTax?: number;
    submitted?: boolean;
}

export interface ReportsListDTO {
    [key: string]: ReportDTO;
}
