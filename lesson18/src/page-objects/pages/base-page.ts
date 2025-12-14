import { Page } from '@playwright/test';
import { Footer } from '../../components/footer';
import { SideMenu } from '../../components/side-menu';
export class BasePage {
    public footer: Footer;
    public sideMenu: SideMenu;
    public constructor(page: Page) {
        this.footer = new Footer(page);
        this.sideMenu = new SideMenu(page);
    }
}
