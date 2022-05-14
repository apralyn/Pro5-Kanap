/* Step by Step Guide on product.js page */
// Step 01 - URLSearch Param
    // this step is essential so that the code can pull the correct id from the current URL. 

// Step 02 - fetching the project API 

// Step 03 - function that will display the product information

// Step 04 - use eventlisteners to GET the user input data
  // user choose color
  // user choose qty
  // user will click addToCart Button

  // Step 4.1 what do you want the button to do? 
      // i want the data [productId + chooseColor + addQty = userItemPick(object)] to go to the cart.
        //where is the cart?
          //the cart is in the localStorage
        //how do you check if the data is correct or not?
          // i can use loop plus nested if
            // loop to check the cart 
        //how does the code check if there's a cart?
          // maybe create a function for this
          //if yes there's a cart use existing cart, use getItem on localStorage
          //if no setItem and create a new cart then push to localStorage?
        
// Step 05 - If TheCart exist 
  //use loop to check if items in cart 
    // if item is duplicate
      //trigger an update on duplicate ITEM, increase the qty + update the storage
    //if no
      // add the item to the cart + update the storage

// Step 06 - create an object cartItem that will hold the actual and correct user input data to use as a key value pair for localStorage
  // productId
  // user selected color = chooseColor.value
  // user selected quantity = addQty.value

  // Step 07 - check localStorage using getItem to see if there's an item there, if not set the Item in the localStorage. 
    // do i create a function for this? 
    // theLocalStorage() 

// Step 08 - end goal
    // successfuly add item in cart, 
    // store the item in the localStorage, 
    // update the item values in the local storage when new items are added || qty count is changed.


// STEP01 - URLSearch Params to get the product ID
//product url
const productUrl = window.location.href;
//URL object to access search params
const newProductUrl = new URL(productUrl);
//product ID
const productId = newProductUrl.searchParams.get('id');


//can i put the fetch in a function and call it somewhere?
//STEP02 Fetch API + productId 
// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productId)
  .then ((data) => {
    return data.json();
  }).then ((product) => {
    console.log(product);
    //STEP03 - displaySingleProduct()
    //populate the item details in this area from the API to show in the product page.
    function displaySingleProduct(product) {
    
      let productTitle = document.getElementById('title');
      productTitle.innerHTML = product.name;
      
      let productPrice = document.getElementById('price');
      productPrice.innerHTML = product.price;
      
      let productDescription = document.getElementById('description');
      productDescription.innerHTML = product.description;
      
      let productItem = document.querySelector('.item__img');
      let productImg = document.createElement('img');
      productImg.setAttribute('src', product.imageUrl);
      productImg.setAttribute('alt', product.altTxt);
      productItem.appendChild(productImg); 

      //loop for the color options
      for (let color of product.colors) {  
        const productColor = document.querySelector('#colors');
        const colorOption = document.createElement('option');
        colorOption.setAttribute('value', color);
        productColor.appendChild(colorOption);
        colorOption.innerHTML = color;
          
        }
    }
    displaySingleProduct(product);
    //why is there an error in this loop? i need to store the value of the product in a variable, figure out how to.
    for (let item of product) {
        displaySingleProduct(item);
      }
  })

//-------Milestone 7-----------
/*
--- add the item to the cart ---
--- store the cart in the localStorage ---
--- update/add new item into the cart ---
*/
// global variables
    // The product ID
console.log(productId);
    //defined user input - whatever color and quantity the user picked.global access
let colorChoice = document.getElementById('colors');
let qtyChoice = document.getElementById('quantity');
    //add to cart button - the actual add to cart button
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart); 
        /* the button will trigger the following actions inside the function. //reference used: webdev simplified logic
        1. creates a variable that holds the value of the user input[color and qty].
        2. if the input is wrong it will trigger an alert so that user will input right amount.
        3. else - if correct data is inputed by the user the function will place the data inside an object called item. 
        4. when the item is created it will be stored in the localstorage.
        */
      
function addToCart () {
      let userPickColor = colorChoice.value; //since this element is an input, the input value is the uder input data I needed. 
      let userPickQty = qtyChoice.value;
      // create the cart array
      let cart = [];

      
      //check if cart is in local storage. 
      let isThereCart = localStorage.getItem('cart');
      // console.log(isThereCart); //in the initial console.log if there is no cart the value of the variable isThereCart is null, therefore
      if (isThereCart == null) { // this will create the cart the moment any product is loaded
        window.localStorage.setItem('cart',JSON.stringify(cart)); 
      } else { // if the cart already exit then use that cart
        window.localStorage.getItem('cart');
        console.log(isThereCart);
        addItems();
      }
      

      function addItems() {
        if (userPickColor.length == 0) {
          console.log('user did not pick any color');
        } else { 
          console.log('the color you picked is ' + userPickColor);
        }
        
        if(userPickQty.value <= 0) {
          console.log('user must pick quatity'); // how do i block the code from moving on if this is empty
        }else {
          console.log('you got ', userPickQty + ' of this ', productId );        
        

        // the values of the user choice is stored in an object
        // the objrct itemToAdd has user input value which varies.    
        let itemToAdd = { 
            itemProductId: productId,
            itemColor: userPickColor,
            itemQty: userPickQty,  
          }
        

        // this will add an item to the array
          cart.push(itemToAdd);
          // console.log ('your cart has', cart + 'stuff in it.');
        // set the the object inside the array that is stored in the local storage
          window.localStorage.setItem("cart", JSON.stringify(cart)); 
          
          let cartInfo = JSON.parse(isThereCart);
          console.log ('your cart has', cartInfo + 'stuff in it.');
          // i can't figure out how to add different obj in the array.

          for (let cartItem of cart) { // using for of since cart is an array
            console.log('looping through item', cartItem);
            if (itemToAdd.itemProductId != cartItem.itemProductId) { 
                cart.push(2);
                    if(itemToAdd.itemColor == cartItem.itemColor) {
                      itemToAdd.itemQty ++;
                      break;
                    } //breaks the loop
                } 
                else  
                if (itemToAdd.itemProductId == itemToAdd.itemProductId) { // if the itemProductId === itemProductId + itemColor != itemColor, then do this add new item into the array + setItem cart in localStorage
                    if (itemToAdd.itemColor != itemColor) {
                      // this should add the same product in the cart but with a different color
                      cart.push(itemToAdd);
                      //then i want to update the cart in the local storage with a new added item.
                      window.localStorage.setItem("cart", JSON.stringify(cart)); //replace 
                    } 
                }
        }
      }
      
    }
}
addToCart();

