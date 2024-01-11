import { test, expect } from '@playwright/test';
import ContactPage from '../pages/contact.page';

test.describe('Contact Page', () => {
    let contactPage:ContactPage;
    test('Verify the submission of contact page', async ({ page }) => {
        contactPage = new ContactPage(page);
        const name="MZ";
        const email="mz@gmail.com";
        const phone="7781114146";
        const message="hi there";
        //Open Url
        await contactPage.navigate();

        //Go to contact
        await contactPage.contactMenu.click();

        //Fill the form
        await contactPage.formFillName.fill(name);
        await contactPage.formFillEmail.fill(email);
        await contactPage.formFillPhone.fill(phone);
        await contactPage.formFillMessage.fill(message);

        await contactPage.formFillSubmitBtn.click();
        
        //Verify success message
        const successAlert = contactPage.formSubmitMessage;
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly	');
        await page.close();
    })
    
});
