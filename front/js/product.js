
const productUrl = window.location.href;

const newProductUrl = new URL(productUrl);

const productUrlId = newProductUrl.searchParams.get('id');


// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productUrlId)
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

const cart = [];
const Item = function(prodID, prodColor, prodQty) {
  this.prodID = prodID;
  this.prodColor = prodColor;
  this.prodQty = prodQty;
};

/* Step 02 Functions 
-- create a function checkCartLogic()
  -- cart will only exist if user input data is correct must have [prodID, prodColor, prodQty].
    -- then cart exist.
  if data is missing
    --alert pops up [please pick right data]
  if cart already exist
    -- figure out parameters so that you don't get double carts or that logic and code will not create new cart. 
    -- in basic perspective. only create new cart if cart don't exist. if cart don't exist yet then create new cart.
  --use loop to check for non-existent and existing cart.
-- create addToCart()
  -- given that cart Array is working properly. addToCart() should be triggered to store user input product choices. 
  -- everytime the user adds new product store it in this function.
  -- make sure that user can only add the product with correct user input data.
    --if user did not add correct data alert will pop up [please pick...]
-- create storeCartInLocaStorage()
  -- this function will happen whenever addToCart() is triggered and has correct data.
  -- this function will store the addToCart data in the local storage.
*/









