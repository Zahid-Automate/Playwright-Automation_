import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage:HomePage;
    test('Open HomePage and Verify Title', async ({ page }) => {
        homePage = new HomePage(page);
        //Open Url
        await homePage.navigate();

        //Verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality.');
        
    })
    
    test('Open AboutUs and Verify Title', async ({ page }) => {
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/about/');

        //Verify title
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
        
    })

    test('Click get started button using CSS Selector', async ({ page }) => {
        homePage = new HomePage(page);
        //Open Url
        await homePage.navigate();

        //Click the button
        //await page.locator('#get-started').click();
        await homePage.getStartedButton.click();
    
        //Verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
        
    })

    test('Verify heading text is visible using text selector', async ({ page }) => {
        homePage = new HomePage(page);
        //Open Url
        await homePage.navigate();

        //find the text locator-Make sure text is unique
        const headingText =  homePage.headingText;

        //Verify heading text is visible
         expect(headingText).toBeVisible;
        
    })

    
    test('Verify home link is visible using text and css selector', async ({ page }) => {
        homePage = new HomePage(page);
        //Open Url
        await homePage.navigate();

        //find the text locator-Make sure text is unique
        //const homeText = await page.locator('#primary-menu >> text=Home');
        const homeText = await homePage.homeLink;

        //Verify heading text is visible
         expect(homeText).toBeVisible;
        
    })

    
    test('Verify Search icon is visible or not using Xpath selector', async ({ page }) => {
        //Open Url
        await homePage.navigate();

        //find the search icon
        const searchIcon =  await homePage.searchIcon;

        //Verify search icon is visible
        expect(searchIcon).toBeVisible;
        
    })
    
    test('Verify the text for all nav links', async ({ page }) => {
        homePage = new HomePage(page);
        const expectedLinks=[
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];
        //Open Url
        await homePage.navigate();

        //find the nav links
        const navLinks = await homePage.navlinks;
        //const navLinks =  page.locator('#zak-primary-menu li[id*=menu]').nth(3);

        //iterate and print out all the links - for of
        for (const el of await navLinks.elementHandles()) {
            console.log(await el.textContent());
        }


        //Verify the nav links text
        expect(await navLinks.allTextContents()).toEqual(expectedLinks);
        //expect(await navLinks.textContent()).toEqual(expectedLinks[3]);
    })
    
    test('Verify and assert the text after filling up the contact us', async ({ page }) => {
        homePage = new HomePage(page);
        const name="MZ";
        const email="mz@gmail.com";
        const phone="7781114146";
        const message="hi there";
        //Open Url
        await homePage.navigate();

        //Go to contact
        await homePage.contactMenu.click();

        //Fill the form
        await homePage.formFillName.fill(name);
        await homePage.formFillEmail.fill(email);
        await homePage.formFillPhone.fill(phone);
        await homePage.formFillMessage.fill(message);

        await homePage.formFillSubmitBtn.click();
        
        //Verify success message
        const successAlert = homePage.formSubmitMessage;
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly	');
    })

    test('Verify that you are able to click on Contact on the menu', async ({ page }) => {
        homePage = new HomePage(page);
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        //Open Url
        await homePage.navigate();

       //Click on Contact
       homePage.contactMenu.click();

       //await page.locator('#zak-primary-menu li[id*=menu]').nth(4).click();
       await expect(page).toHaveURL(/.*contact/);
     
       //const handle = await page.$('text=Submit');

       await homePage.formFillName.hover();
       await homePage.formFillName.click();

       await page.keyboard.down('End');
    })

    test('Verify the number of links present in Recent posts in Blog page', async ({ page }) => {
        homePage = new HomePage(page);
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        //Open Url
       await homePage.navigate();
       page.pause();
       //Click on Blog
       await homePage.blogMenu.click();
    
       //Verify url has blog
       await expect(page).toHaveURL(/.*blog/);
     

       await page.locator('//h2[normalize-space()="Recent Posts"]').hover();
       const relatedLinks = page.locator('//section[@id="recent-posts-3"]//ul//li');
       const len = await relatedLinks.count();
       console.log ("Total number of links present in Recent Posts is "+ len);

       // Verify the number of related links present in blogs is 5
       expect(len).toEqual(5);
  
       const mylist = await page.locator('//section[@id="recent-posts-3"]//ul//li').allTextContents();

            for (let i = 0; i < mylist.length;i++)
            {
                    //console.log("element found in list is "+mylist[i].trim())    
                    console.log("Length of "+ mylist[i].trim() + " is "+mylist[i].trim().length)   
            } 

    })
})