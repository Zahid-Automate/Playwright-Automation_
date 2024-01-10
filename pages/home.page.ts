import {Page,Locator} from '@playwright/test'

class HomePage{
    page: Page;
    getStartedButton: Locator;
    headingText: Locator;
    homeLink: Locator;
    searchIcon: Locator;
    navlinks: Locator;
    formFillName: Locator;
    formFillEmail: Locator;
    formFillPhone: Locator;
    formFillMessage: Locator;
    formFillSubmitBtn: Locator;
    formSubmitMessage: Locator;
    contactMenu: Locator;
    blogMenu: Locator;
    constructor(page: Page){
        this.page = page;
        this.getStartedButton = page.locator('#get-started');
        this.headingText = page.locator('text=Think different. Make different.');
        this.homeLink = page.locator('#primary-menu:has-text("Home")');
        this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//div[@class="zak-header-action zak-header-search"]');
        this.navlinks = page.locator('#zak-primary-menu li[id*=menu]');
        this.formFillName = page.locator('#evf-277-field_ys0GeZISRs-1');
        this.formFillEmail = page.locator('#evf-277-field_LbH5NxasXM-2');
        this.formFillPhone = page.locator('#evf-277-field_66FR384cge-3');
        this.formFillMessage = page.locator('#evf-277-field_yhGx3FOwr2-4');
        this.formFillSubmitBtn = page.getByRole('button', { name: 'Submit' });
        this.formSubmitMessage = page.locator('div[role="alert"]');
        this.contactMenu =  page.locator('(//a[normalize-space()="Contact"])[1]');
        this.blogMenu = page.locator('(//a[normalize-space()="Blog"])[1]');

    }

    async navigate(){
        await this.page.goto('https://practice.sdetunicorns.com/');
    }
}

export default HomePage;