import {BasePage} from './base-page';
import {Page} from '@playwright/test';
import {TableContainer} from '../components/table-container';
import {FiltersContainer} from '../components/filters-container';

export class IncomesPage extends BasePage{
    public readonly table: TableContainer;
    public readonly filtersContainer: FiltersContainer;

    public constructor( page: Page) {
        super(page);
        this.table = new TableContainer(page, '.income-table-container');
        this.filtersContainer = new FiltersContainer(page);
    }
}
