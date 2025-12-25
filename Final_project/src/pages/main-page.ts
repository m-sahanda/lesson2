import {Page} from '@playwright/test';
import {BasePage} from './base-page';

export class MainPage extends BasePage{
    public constructor( page: Page) {
        super(page);
    }

    public async goTo(): Promise<void> {
        await this.page.goto('');
    }

    public async login(): Promise<void> {
        await this.goTo();
        await this.header.signInBtn.click();
        await this.signInPopup.emailInput().fill(process.env.LOGIN!);
        await this.signInPopup.passwordInput().fill(process.env.PASSWORD!);
        await this.signInPopup.getSubmitBtn().click();
        await this.header.welcomeText.waitFor({state: 'visible'});
    }
}
