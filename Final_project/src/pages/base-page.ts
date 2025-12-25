import {SignInPopup} from '../components/sign-in-popup';
import {Header} from '../components/header';
import {Page} from '@playwright/test';
import {MainNavigation} from '../components/main-navigation';
import {ModalPopup} from '../components/modal-popup';

export class BasePage {
    public readonly header: Header;
    public readonly signInPopup: SignInPopup;
    public readonly mainNavigation: MainNavigation;
    public readonly modalPopup: ModalPopup;

    public constructor(public readonly page: Page) {
        this.header = new Header(page);
        this.signInPopup = new SignInPopup(page);
        this.mainNavigation = new MainNavigation(page);
        this.modalPopup = new ModalPopup(page);
    }
}
