import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.describe('Home', () => {
    test('Open HomePage and Verify Title', async ({ page }) => {
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

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
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

        //Click the button
        await page.locator('#get-started').click();

        //Verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
        
    })

    test('Verify heading text is visible using text selector', async ({ page }) => {
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

        //find the text locator-Make sure text is unique
        const headingText =  page.locator('text=Think different. Make different.');

        //Verify heading text is visible
         expect(headingText).toBeVisible;
        
    })

    
    test('Verify home link is visible using text and css selector', async ({ page }) => {
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

        //find the text locator-Make sure text is unique
        //const homeText = await page.locator('#primary-menu >> text=Home');
        const homeText = page.locator('#primary-menu:has-text("Home")');

        //Verify heading text is visible
         expect(homeText).toBeVisible;
        
    })

    
    test('Verify Search icon is visible or not using Xpath selector', async ({ page }) => {
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

        //find the search icon
        const searchIcon =  page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//div[@class="zak-header-action zak-header-search"]')

        //Verify search icon is visible
        expect(searchIcon).toBeVisible;
        
    })
    
    test('Verify the text for all nav links', async ({ page }) => {
        const expectedLinks=[
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/');

        //find the nav links
        const navLinks =  page.locator('#zak-primary-menu li[id*=menu]')
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
        const name="MZ";
        const email="mz@gmail.com";
        const phone="7781114146";
        const message="hi there";
        //Open Url
        await page.goto('https://practice.sdetunicorns.com/contact');

        //Fill the form
        await page.locator('#evf-277-field_ys0GeZISRs-1').fill(name);
        await page.locator('#evf-277-field_LbH5NxasXM-2').fill(email);
        await page.locator('#evf-277-field_66FR384cge-3').fill(phone);
        await page.locator('#evf-277-field_yhGx3FOwr2-4').fill(message);

        await page.getByRole('button', { name: 'Submit' }).click();
        
        //Verify success message
        const successAlert=page.locator('div[role="alert"]');
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly	');
    })

    test('Verify that you are able to click on Contact on the menu', async ({ page }) => {
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        //Open Url
       await page.goto('https://practice.sdetunicorns.com/');

       //Click on Contact
       page.locator('(//a[normalize-space()="Contact"])[1]').click();

       //await page.locator('#zak-primary-menu li[id*=menu]').nth(4).click();
       await expect(page).toHaveURL(/.*contact/);
     
       //const handle = await page.$('text=Submit');

       await page.locator('#evf-277-field_ys0GeZISRs-1').hover();
       await page.locator('#evf-277-field_ys0GeZISRs-1').click();

       await page.keyboard.down('End');

       await delay(5000);
    })

    test('Verify the number of links present in Recent posts in Blog page', async ({ page }) => {
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        //Open Url
       await page.goto('https://practice.sdetunicorns.com/');
       page.pause();
       //Click on Blog
       page.locator('(//a[normalize-space()="Blog"])[1]').click();

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