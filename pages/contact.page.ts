import { Page , Locator} from '@playwright/test'

class ContactPage{
    page: Page;
    formFillName: Locator;
    formFillEmail: Locator;
    formFillPhone: Locator;
    formFillMessage: Locator;
    formFillSubmitBtn: Locator;
    formSubmitMessage: Locator;
    contactMenu: Locator;

    constructor(page: Page){
    this.page = page;
    this.formFillName = page.locator('#evf-277-field_ys0GeZISRs-1');
    this.formFillEmail = page.locator('#evf-277-field_LbH5NxasXM-2');
    this.formFillPhone = page.locator('#evf-277-field_66FR384cge-3');
    this.formFillMessage = page.locator('#evf-277-field_yhGx3FOwr2-4');
    this.formFillSubmitBtn = page.getByRole('button', { name: 'Submit' });
    this.formSubmitMessage = page.locator('div[role="alert"]');
    this.contactMenu =  page.locator('(//a[normalize-space()="Contact"])[1]');
    }

    async navigate(){
        await this.page.goto('https://practice.sdetunicorns.com/contact');
    }
}

export default ContactPage;