/* Step by Step Guide on product.js page */
// Step 01 - URLSearch Param
    // this step is essential so that the code can pull the correct id from the current URL. 

// Step 02 - fetching the project API 

// Step 03 - function that will display the product information

// Step 04 - use eventlisteners to GET the user input data

// Step 05 - addToCart() will check if... 

// Step 06 - create an object cartItem that will hold the actual and correct user input data to use as a key value pair for localStorage

// Step 07 - check localStorage using getItem to see if there's an item there, if not set the Item in the localStorage. 
    // do i create a function for this? 

// Step 08 - end goal
    //  successfuly add item in cart, 
    // store the item in the localStorage, 
    // update the item values in the local storage when new items are added.


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
    return data.json(); // move .then product
  }).then ((product) => {
    console.log(product);
    const prodName = product.name;
    console.log(prodName);
    // this has the product ID that I need
    
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

//STEP04 - use eventListener
// I have the product ID
  console.log(productId);
// I have the color choice
  let chooseColor = document.getElementById('colors');
  chooseColor.addEventListener('change', userInputEvents);
 
//qty choice
  let addQty = document.getElementById('quantity');
  addQty.addEventListener('click', userInputEvents);

function userInputEvents () {
  console.log(chooseColor.value + addQty.value);
  return;
}
 
// access addToCart Button.
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart); // the addtoCart button event listener will trigger the addToCart function.

//STEP05 addToCart()

function addToCart() {
console.log('Youre cart has ' + productId + ' the color you chose is ' + chooseColor.value + ' and you got ' + addQty.value + ' of em.');
}
addToCart();


//STEP06 cartItem object

const cartItem = { 
  cartItemID: productId,
  cartItemColor: chooseColor,
  cartItemQty: addQty
}
console.log(cartItem); //checking if this actually works

//STEP07 localStorage

window.localStorage.setItem("cart", JSON.stringify(cartItem));
const jsonString = localStorage.getItem("cart");
const cartObject = JSON.parse(jsonString);

console.log(jsonString);
console.log(cartObject);

function toLocalStorage() {
//check if there's something in the localStorage

}
toLocalStorage();