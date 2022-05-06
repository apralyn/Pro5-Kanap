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
// console.log(productId);
// this also has the product ID that I need


//STEP02 Fetch API + productId
// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productId)
  .then ((data) => {
    return data.json();
  }).then ((product) => {
    // console.log(product);
    
//STEP03 - displaySingleProduct()
    //populate the item details in this area from the API to show in the product page.
  function displaySingleProduct(product) {
  
     const productTitle = document.getElementById('title');
     productTitle.innerHTML = product.name;
     let productPrice = document.getElementById('price').innerHTML = product.price;
     let productDescription = document.getElementById('description').innerHTML = product.description;

      for (let color of product.colors) { // ["red", "yellow" ] 

      const productColor = document.querySelector('#colors');
      const colorOption = document.createElement('option');
      colorOption.setAttribute('value', color);
      productColor.appendChild(colorOption);
      colorOption.innerHTML = color;
        
      }
      // parent element
      const productItem = document.querySelector('.item__img');
      const productImg = document.createElement('img');
      productImg.setAttribute('src', product.imageUrl);
      productImg.setAttribute('alt', product.altTxt);
      productItem.appendChild(productImg);

   }
   displaySingleProduct(product);

   for (let item of product) {
      displaySingleProduct(item);
    }
  })
//--------------------------------------- Milestone 7

//The product ID
console.log(productId);

//defined user input - whatever color and quantity the user picked.
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

  // when the user input values on color and qty and then actually clicks on the button -function
function addToCart () {
  // let button = event.target;
  let userPickColor = colorChoice.value; //since this element is an input, the input value is the data I need. 
  let userPickQty = qtyChoice.value;
  
  if (userPickQty < 0) {
    alert('not allowed, must pick between 1-100');
    return;
  } else { // if the other statement is not true do the following... 
    //create the item object with the right data.
    let item = { 
      itemProductId: productId,
      itemColor: userPickColor,
      itemQty: userPickQty,  
    }
    // create the cart array
    let cart = []; 
    //set the cart array in the local storage
    let setItemToStorage = window.localStorage.setItem("cart", JSON.stringify(cart)); //the cart is set in the localStorage [/]
    //check if there's a cart in the storage
    if (cart === cart) {
      let thereIsCartInStorage = localStorage.getItem("cart");
      console.log('yas there is cart ' + thereIsCartInStorage + ' in the storage');
      // cart exist push item into the cart and set the cart or update the cart
      let addItemToCart = cart.push(item);
      console.log(addItemToCart);
    } else {
      console.log ('uhmm where is the cart');
    }
    
    
  }
}
addToCart();

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
// access addToCart Button.


//STEP05 addToCart()




//STEP06 cartItem object

// const cartItem = { 
//   cartItemID: productId,
//   cartItemColor: chooseColor.value,
//   cartItemQty: addQty.value
// }
// // console.log(cartItem); //checking if this actually works

// //STEP07 localStorage

// let cart = [];
// const jsonString = localStorage.getItem("cart");
// const cartObject = JSON.parse(jsonString);

// console.log(jsonString);
// console.log(cartObject);

// function addToCart() {
//   let userProductColorChoice = document.getElementById("colors").value;
//   let userProductQtyChoice = document.getElementById("quantity").value;
//   if (userProductColorChoice = ""){ // how do I put empty here?
//     console.log("if is empty");
//     alert ("must choose color");
//   }else 
//     console.log ("else is empty");
  
// }
//   addToCart();
// console.log(addToCart);
// console.log(cart);

// cart.push(cartItem);
  // window.localStorage.setItem("cart", JSON.stringify(cart));