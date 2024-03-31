import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/'
    });

    const response = await fakerApi.get('users');
    const responseBody = await response.json();
    console.log(await response.json());
    randomPerson = responseBody[0];

    const postResponse = await fakerApi.post('users/1/todos',{
      data:{
        "title" : "Learn Playwright",
        "completed" : "false"
      }
    });
    const postResponseBody = await postResponse.json();

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