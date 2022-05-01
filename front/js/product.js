//URLSearch Params to get the product ID
//product url
const productUrl = window.location.href;
//URL object to access search params
const newProductUrl = new URL(productUrl);
//product ID
const productId = newProductUrl.searchParams.get('id');
console.log(productId);
// this also has the product ID that I need



// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productId)
  .then ((data) => {
    return data.json(); // move .then product
  }).then ((product) => {
    console.log(product);
    // this has the product ID that I need
    

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

// I have the cart
  const cart = []; // an array to hold the cart items
//I just want to add one item to the cart. 

// I have the product ID
  console.log(productId);
// I have the color choice
  let chooseColor = document.getElementById('colors');
  chooseColor.addEventListener('change', userInputEvents);
 
//qty choice
  let addQty = document.getElementById('quantity');
  addQty.addEventListener('click', userInputEvents);

function userInputEvents () {
  const color = chooseColor.value;
  const quantity = addQty.value;
  // console.log(chooseColor.value + addQty.value)};
 
// access addToCart Button.
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart); // the addtoCart button event listener will trigger the addToCart function.

/* Goal for the next hour */
/* I need to figure out how i can move the data into a function */

function addToCart() {
console.log('Youre cart has ' + productId + ' the color you chose is ' + chooseColor.value + ' and you got ' + addQty.value + ' of em.');

}

addToCart();












