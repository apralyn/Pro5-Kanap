//Milestone 8
/*
Displaying a recap table of purchases on the cart page
 |Goal| 
    The cart page will display the user added items/products choice. --
 |Step-by-Step|
    -- use getItem to pull the cart from localStorage
      what if there's nothing on the cart/ or there's no cart how do i structure this logic
    -- use the data from JSON.parse(jsonString) to...
        --create and insert the elements on the cart page
    -- figure out how the cart page is suppose to look.
    -- check your parameters/conditions
        - don’t create any duplicates of the various elements in the recap table (the cart).
        - If there are several identical products (same ID + same colour) they should be listed on the same row in the table.
 |Extra|
    create a function displayCart()
     - this function will retrieve the product list stored in local storage and update the cart.html
*/
let getCart = window.localStorage.getItem('cart');
console.log(getCart);
console.log(cart.length);







//Milestone 9
/*
Dealing with any modifications or removals of products on the cart page
 |Goal|
    Edit the quantity of product or to completely remove a product
 |Step-by-Step| !!!NEEDS ATTENTION and more details!!!
    - use change event (addEventListener, change event) to enable changes in quantities of product.
    - the Element.closest() method should allow you to target the product you want to delete (or modify the quantity) thanks to its ID and its color.
 |Extra|
    create a function removeFromCart(product)
     - this function will retriece a product from the local storage and then call displayCart()
*/

//Milestone 10
/*
Confirming the order
 |Goal|
    Display an order number on the screen for a completed order
 |Step-by-Step| !!!NEEDS ATTENTION and more details!!!
    - Send a POST request to the API in order to collect the order ID.
    - Redirect the user to the confirmation page by moving the order ID
into the URL to display the order number.
    - This number should be displayed on the screen but it must not be
stored.
 |Extra|
    create a function makeOrder()
     - this function will process the contact form retrieve the product id and call the post Rest API.
*/



// to do 3
//create a function addToCart(product)
//this function will add a specific prodcut to the local storage
//and increase the cart number

//to do 7
//create a function updateCartNumber(type, qty)
//this function will add or remove the total number of item appearing in the cart.