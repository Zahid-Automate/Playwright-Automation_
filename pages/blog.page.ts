import { Page , Locator} from '@playwright/test';

class BlogPage{
    page: Page;
    blogHeading: Locator;
    blogLinksList: Locator;
    constructor(page: Page){
        this.page=page;
        this.blogHeading = page.locator('//h2[normalize-space()="Recent Posts"]');
        this.blogLinksList = page.locator('//section[@id="recent-posts-3"]//ul//li');
        
    }
  
}

export default BlogPage;
