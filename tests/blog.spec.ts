import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import BlogPage from '../pages/blog.page';

test.describe('Blog page', () => {
    let homePage:HomePage;
    let blogPage:BlogPage;

    test('Verify the number of links present in the blogs page', async ({ page }) => {
        homePage = new HomePage(page);
        blogPage = new BlogPage(page);
   
        //Open Url
       await homePage.navigate();
       page.pause();
       //Click on Blog
       await homePage.blogMenu.click();
    
       //Verify url has blog
       await expect(page).toHaveURL(/.*blog/);
     

       await blogPage.blogHeading.hover();
       const relatedLinks = blogPage.blogLinksList;
       const len = await relatedLinks.count();
       console.log ("Total number of links present in Recent Posts is "+ len);

       // Verify the number of related links present in blogs is 5
       expect(len).toEqual(5);
  
       const mylist = blogPage.blogLinksList.allTextContents();
       const myList = await mylist; // Assuming mylist is an asynchronous operation that returns a list

       for (let i = 0; i < myList.length; i++) {
           console.log("Length of " + myList[i].trim() + " is " + myList[i].trim().length);
       }
    
    })
    }
    
);
