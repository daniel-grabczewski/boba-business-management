<p align="center">
  <img src="public/images/thank-you.svg" alt="Logo" width="175"/>
</p>

<h1 align="center" style="font-size: 5rem;">
Boba Business Management
</h1>

### Some quick context
Boba Business Management is an overhauled version of Boba Buddies Store, which was a group project we made together as a team of four. 
You can view the repository of Boba Buddies Store [here.](https://github.com/Boba-Buddies/boba-buddies-store)

After we finished Boba Buddies Store, I had to take a 6 month hiatus from coding. When I came back, I needed some coding practise to refresh my knowledge of web development.
We never ended up deploying Boba Buddies Store to the web, so I thought why not make a live version of it?

With that, I got to work!

## What does this app do?
- This app features two modes the user can switch between: **Shopper** and **Admin.**
- Everything you do as a shopper is reflected in the admin mode. And everything you do as an admin is reflected in the shopper mode.


### Shopper mode features:
- Search, filter, and sort for products you'd like to buy.
- Add products to your cart, modify quantities, choose your shipping method, and checkout with your delivery information.
- Create a wishlist of products you'd like to buy.
- Review and rate products.
- Fill out a contact form to send a message to the admins.
- Access your profile page:
    - View past orders.
    - Delete reviews you've made.
    - Edit your default address and personal details.

### Admin mode features:
- See daily notifications on the dashboard of new reviews, orders, messages, and products that need restocking.
- Access the reviews page:
    - Search, filter, and sort product reviews.
    - Moderate reviews with an option to disable their visibility to shoppers (e.g. if the review contains offensive material)
- Access the inbox page:
    - Search, filter, and sort user messages.
    - Delete messages.
- Access the orders page:
    - Search, filter, and sort user orders.
    - View full details of each order, e.g. total cost w/ shipping, delivery and contact information
- Access the products page:
    - Search, filter, and sort your store's products.
    - Edit any product's details, e.g. name, stock, price, description, and product image.
    - Enable/disable visiblity of a product to shoppers
    - View a product's reviews and rating metrics.

## What are the differences between Boba Business Management and Boba Buddies Store?

### New features

Daily generated orders/reviews/messages. Everyday you log in as an admin, you will see a newly generated orders/reviews/messages. This is a business management app after all. Before, this wasn't a feature. This way, as an admin, you need to manage your products. Every order actually reduces the stock of the items in the order. So you need to restock it. Because, if an order is attempted, and the item is out of stock, the order won't come through! And you'll lose a customer. Also, the daily reviews from users directly impact the average ratings of your products. It's your job to moderate these reviews. What if there's a review that's irrelevant to the product? Or it could offend? It's your job to disable these reviews to keep them from appearing to shoppers.

Speaking of orders, now the orders actually reduce the stock of the items. Previously, the orders would have no impact on the actual stock levels of the products. When a product is below a threshold, it will be tagged as 'low stock' across the app. So shoppers can see that. And they are limited to buying as many as are left in stock. Afterwards, the 'add to cart' button is disabled and the message appears 'out of stock'

query params (refreshing doesn't remove your filter/sort/search, also, when you navigate to an item, andd then you go back, the filter/sort/search are remembered. Whereas before, they would be gone. So your custom search/filters etc would be reset. So imagine you did a bunch of custom search/filter/sorting to view products you were interested in. But after viewing the first product, and then going back to see the others that were in your custom search, all your custom parameters would dissapear! Bad user experience) Along with this, it would also remember what page of the search you were on. E.g. the second page of products.
E.g. /shop?filter=without-pearls&sort=price-low-to-high&page=1
/admin/reviews?sort=oldest-first&filter=enabled&page=3
/admin/products-summary?filter=low-stock&page=2
And what you put into the search bar is cached into local storage. But by clicking the link to the page directly in the nav bar, the search/sort/filter would be reset as expected.
Implemented on the following pages : shop, admin orders table, admin reviews table, admin Inbox, and the admin product management page.

Speaking of search bars, previously the shop page didn't have a search bar! So, the user wouldn't be able to search for a specific product they had in mind. Now. There is a search bar.

form validation, each specific field is checked. E.g. You can't put a phone nunmber into your name field. And you can't put your name as the zip code. It gives specific error messages for each field that is missed. Whereas before, you could enter anything into any field. And you could even leave it empty and then continue, leading to empty data being stored. Now, every field must be filled AND be appropriate) 
Implemented in the following forms, custom validation tailored for the conditions for each one : checkout form, edit profile form, modify product form, edit product form.

A custom 404 page. Previously, there was only a default 404 page that read 'error'. I made sure that whenever there is an error loading a page, it's a friendly informative message 'Sorry, we couldn't find that page.' And then with a button to redirect the user to the store. Or, if you get the error while in admin mode, the button will allow you to redirect to the admin dashbord.

Converting the product page's url to use a 'slug' instead of an id. For example, previously, the URL for the product 'pearl milk tea' would be:
/shop/1
This URL is not very informative to the shopper. And if they share the URL to a friend, then it's not informative at all to where the user would go to if they clicked it.
So currently, the URL, with the auto-generated slug would look like this : /shop/pearl-milk-tea
This is far more informative and obvious as to what the page is going to load.

- The slug is auto generated based on the name. And so it must be updated automaitcally whenever the product name is changed by the admin.
- Something tricky I ran into is what if the shopper navigates to a slug that no longer existed and they get confused because the admin updated the slug? E.g. the shopper saved the page of a product they wanted to buy in their bookmark. But they log in the next day, and it says the page is missing, because the slug has been changed to fit the new product. So, to counter this, I had to create a cache of old slug names. Each old slug is associated with its original id, so when an old slug is entered into the URL, it will automatically find the associated id,  and then redirect the shopper straight to the product which the admin modified.
- I also accounted for the possibility of entering the id instead of the slug as the paramter. There is logic put in place to find the slug associated with the id. So, even if the user puts in the URL : /shop/1 , it would redirect them automatically to /shop/pearl-milk-tea



  









