//product url
const productUrl = window.location.href;
//URL object to access search params
const newProductUrl = new URL(productUrl);
//product ID
const productId = newProductUrl.searchParams.get('id');
console.log(productId);



// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productId)
  .then ((data) => {
    return data.json(); // move .then product
  }).then ((product) => {
    console.log(product);
    

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

// ---- next task: cart ------

// user input/ events
  // pick color
  // add qty of product
  //'click' add to cart button

/* Step 01 Global Declarations
-- create a cart Array
-- create object named Item, inside this object Item will have these properties{product._id, prdColor, prodQty}.
*/

const cart = []; // an array to hold the cart items
// console.log(cart); //array exist

const Item = function(prodID, prodColor, prodQty) { // an object to represent the items in the cart.
  this.prodID = prodID;
  this.prodColor = prodColor;
  this.prodQty = prodQty;
};


/* assuming that cart always exists... 
-- there's no trigger for the cart array
-- the addToCart button function is for 
    -- adding Item to the cart only.
-- I have to think of the logic in adding the product into the cart array.
 addToCart() function
i need 3 user input + prodID before I can push product item into array.
1. prodColor
2. prodQty
3. click eventListener addtoCart button.
*/

function addToCart() {}
if (user input all correct data(prodID, prodColor. prodQty) {
  cart.push = Item; // this will add item to the cart array
} 
else if (if user input is missing  [prodQty] || [prodColor] and user clicked on addToCart button) {
  alert ('missing [prodQty] || [prodColor]') //|| is an or operator
} 
else (check if item == item) {
   item quantity will increment, not create new item.
} 
}

// how do i logicall work the local storage.
function cartToLocalStorage()



















