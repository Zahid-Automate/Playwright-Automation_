import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;


  test.beforeAll(async () => {
    await apiController.init();
    randomPerson = await apiController.getUsers();
    const newUserTodo = await apiController.createrUserTodo();
    console.log(newUserTodo);
  });


  test('Fill contact form using API and verify success message', async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate()
    await page.pause();
    //  fill out the input fields and submit
    await contactPage.submitForm(
        randomPerson['name'], 
        randomPerson['email'], 
        randomPerson['phone'], 
        randomPerson['website']);
       
    // verify success message
    await expect(contactPage.formSubmitMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
  })
})