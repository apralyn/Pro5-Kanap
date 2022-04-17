// create a function displaySingleProduct(id)
// this function will retrieve the id from url
// and then process the rest api and update the view//insert DOM product.html page

// --------------------- URLSearchParams

//to show the current url of the specific product stored in productUrl variable.
const productUrl = window.location.href;
// console.log(productUrl); // current page URL

//what does this specificically do
//I know that the [new URL] is an object
// which means I can access methods inside new URL object specifically the searchparam.
const newProductUrl = new URL(productUrl);
// console.log(newProductUrl);

// this productUrlId variable is where I can find the specific product ID's of each item.
const productUrlId = newProductUrl.searchParams.get('id');
// console.log(productUrlId);

// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productUrlId)
  .then ((data) => {
    return data.json(); // move .then product
  }).then ((product) => {
    // console.log(product);

    //populate the item details in this area from the API to show in the product page.
  function displaySingleProduct(product) {
  
  // //for produc t title
     const productTitle = document.getElementById('title');
     productTitle.innerHTML = product.name;
     let productPrice = document.getElementById('price').innerHTML = product.price;
     let productDescription = document.getElementById('description').innerHTML = product.description;
     
     //need to figure out how to display the color selection
     
     //access to the color data from API
     //color loop
      for (let color of product.colors) { // ["red", "yellow" ] 
        //color == red
      const productColor = document.querySelector('#colors');
      const colorOption = document.createElement('option');
      colorOption.setAttribute('value', color);
      productColor.appendChild(colorOption);
      colorOption.innerHTML = color;
        
      }
      // parent element
      const productItem = document.querySelector('.item__img');
        // create an img element
      const productImg = document.createElement('img');
        // append the new element to the parent.
      productImg.setAttribute('src', product.imageUrl);
      productImg.setAttribute('alt', product.altTxt);
      productItem.appendChild(productImg);

   }
   displaySingleProduct(product);

   for (let item of product) {
      displaySingleProduct(item);
    }
  })

// ---- next tasks


// user input
  // pick a  color
  // add qty of product
  //'click' add to cart button

// eventlister click only for the add to cart button. assigned to objects, listens to event 
function clickBtn() {
  console.log ('clicked'); 
}
const click = document.getElementById('addToCart');
click.addEventListener('click', clickBtn); 
//or eventhandler 
// click.onclick = () => {
//   console.log('clacked');
// }
//end of eventListener


//event listener for choosing a color only on a drop down menu
let chooseColor = document.getElementById('colors');
chooseColor.addEventListener('change', () => {
  console.log('the color you picked is' + ' ' + chooseColor.value); 
})

// note** 
//How do i set a parameter if user does not pick color? 
//user must pick.

//event handler for adding qty
//note** min max does not work 
// how do i set a parameter for min and max
//user limit between 1 and 100, no negative or beyond
let addQty = document.getElementById('quantity');

addQty.onchange = () => { // this is to input the value and then enter key is pressed
  console.log(addQty.value);
}
addQty.addEventListener('click', () => { // user clicks on arrow keys up and down only
  console.log ('you got ' + addQty.value);
})



// cart objects
// new Object is an example of an Object Constructor
const cart = new Object(); 
  cart.productID =  "12342346yt"; // I can create a function method to get the product ID from the API
  cart.productQty =  1;
  cart.productColor =  "red"; 

//convert the cart object into JSON string and save it into storage
window.localStorage.setItem("cart", JSON.stringify(cart));

//retrieving the JSON string
const jsonString = localStorage.getItem("cart");

//parse the JSON string back to the JS object
const cartObject = JSON.parse(jsonString);
// console.log(cartObject);
// console.log(cartObject.productID);
// console.log(cartObject.productQty);
// console.log(cartObject.productColor);

//end of cart object








