// create a function displaySingleProduct(id)
// this function will retrieve the id from url
// and then process the rest api and update the view//insert DOM product.html page

// --------------------- URLSearchParams

//to show the current url of the specific product stored in productUrl variable.
const productUrl = window.location.href;
console.log(productUrl); // current page URL

//what does this specificically do
//I know that the [new URL] is an object
// which means I can access methods inside new URL object specifically the searchparam.
const newProductUrl = new URL(productUrl);
console.log(newProductUrl);

// this productUrlId variable is where I can find the specific product ID's of each item.
const productUrlId = newProductUrl.searchParams.get('id');
console.log(productUrlId);

// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productUrlId)
  .then ((data) => {
    return data.json(); // move .then product
  }).then ((product) => {
    console.log(product);

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



// eventlister for the add to cart button.
function clickBtn() {
  console.log ('clicked'); 
}
const click = document.getElementById('addToCart');
click.addEventListener('click', clickBtn); 
//end of eventListener


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
console.log(cartObject);
console.log(cartObject.productID);
console.log(cartObject.productQty);
console.log(cartObject.productColor);

end of cart object








//where to get the right data for the cart objects.

// figure out how to access the data individually
  // product ID of the item.
  // product color
  // quantity chosen

//once I have them in an object, i need to attach them to the event listener, so once the event listener hears the click the cart function is envoke

//the cart function will do something...

//get the product ID (this data is coming from the api) i need to find  a way to get the data to store in local storage once invoked

//product qty and product color data is also important i need to figure out how to attach it to the local storage once it is invoked.  

//basically the event listener will only listen for a click and then performs a function that will gather important data from user input and from data from the api(product_id) and temporarily store this event listener data in the local storage. 

//function addItemToCart(productID, productColor, productQty)