
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

// ---- next tasks  ------

// user input/ events
  // pick a  color
  // add qty of product
  //'click' add to cart button

// eventlister click only for the add to cart button. assigned to objects, listens to event 
function clickBtn() {
  console.log ('clicked'); 
}
const click = document.getElementById('addToCart');
click.addEventListener('click', clickBtn); 
//or example using an eventhandler on add to cart button
// click.onclick = () => {
//   console.log('clacked');
// }
//end of eventListener

//event listener for item quantity  
let addQty = document.getElementById('quantity');

addQty.onchange = () => { // this is to input the value and then enter key is pressed
  console.log(addQty.value);
}
addQty.addEventListener('click', () => { // user clicks on arrow keys up and down only
  console.log ('you got ' + addQty.value);
})


//event listener for choosing a color only on a drop down menu
let chooseColor = document.getElementById('colors');
chooseColor.addEventListener('change', () => {
  
  window.localStorage.setItem("color", JSON.stringify(chooseColor.value));
  console.log('the color you picked is' + ' ' + chooseColor.value); 
})

// ----- cart Object example only ------------
// // example of cart made as an object 
// // the product information is a hard code
// //need to figure out the actual user input to replace the hard code
// // new Object is an example of an Object Constructor
// const cart = new Object(); 
//   cart.productID =  product._id; // I can create a function method to get the product ID from the API
//   cart.productQty =  1;
//   cart.productColor =  "red"; 

// //convert the cart object into JSON string and save it into storage
// window.localStorage.setItem("shoppingCart", JSON.stringify(cart));

// //retrieving the JSON string
// const jsonString = localStorage.getItem("shoppingCart");
// console.log(jsonString);

// //parse the JSON string back to the JS object
// const cartObject = JSON.parse(jsonString);
// // console.log(cartObject);
// console.log(cartObject.productID);
// // console.log(cartObject.productQty);
// // console.log(cartObject.productColor);

// --------- end of cart Object example ------------

// ---------- cart logic -------------
/* cart = [];
cart Array is global;
triggered by eventListener on addTocart button + (){}; // (){}; == function.
*/

/* addTocart(){};
if (cart == cart)(){};
  //do this:
    // code will check if cart has correct data before moving on
    // if cart == product._id + prdQty + prdColor
      // do this function addToLocalStorage.
    //if not == item cannot be added to the cart
      //alert must have all 3 datas.
      //please add prdcolor or please add prdQty.
else (cart != cart)(){};
  // add new cart. 
MUST: use loop so the code can keep checking for new product._id == new item.
*/
/* cart == cart do function cartItems();
cartItem(); will container for user input products choice.
  if user adds specific product._id push to cartItem.
  if user add product._id == product._id == add to prdQty [some sort of counter logic]
  if user add prodcut._id == different == product._id == push product._id to cartItem.
*/
/* addToLocalStorage(){};
*/



// parameters for when a NEW item is added to the cart

  //if //line code purpose: i want computer to check if cart does not exist when triggered make new, if cart exist use that existing cart, before moving on to P02 cart must exist.
    // const cart ==  cart // use existing cart
  //else cart !== cart
    // new cart = []; // create new cart. 
// P02 - param1: cart[] must exist before P02 is executed.
  // P02 params2.1 = the cart will then get populated by these data cart = [product._id, prdQty, prdColor]; // non negotiable, must exist on P02
  // P02 params2.2 = function checkItemsInCartforDouble(){};
    /* 2.2.1 if item in cart == product._id == [correct data] + prdQty == [corrrect data] + prdColor  == correct [data] move on to the next code = P03
    if not move on to 2.2.2
    2.2.2 if item in cart == parameters
      2.2.2[params] product.id == > 1 add to prdQty count.
      2.2.3[params] product.id == [correct data], 
                    prdQty == 0; //alert message
                    prdColor == 0; //alert message;
    */
    //function of the P02 is to make sure when user ADD same product._id =+ on prdQtyt, // not create new item. //make sure product._id is not double.
//P03 - new item is only == to new item if:
  /* paramP03.1  - new item will only exist if product._id does not exit in cart Array.
      paramP03.2 - new item must have unique only 1 product._id + prdColor [add data] + prdQty [add data]      
  */
//P04 - if cart == all correct data:
  // paramP04.1 - data in cart == call cartInLocalStorage(){};
/* cartInLocalStorage(){};
*/
    // prodcuct ID + product Color add to qty not create new item. // break it down to more steps
// make sure all logic correctly other wise data's will get lost and won't save in the localStorage
// last step - if all logic works
//cart data will be saved in the localStorage.





/* figured out the events and user input
i got the events basic working when user picks a color console log the color
when user picks a qty console log the actual qty picked
when user clicks add to button console log clicked
*/

//setting a parameter if user does not pick color? 
//use conditional execution
//user must pick.
  // if user does not pick 
  //show alert box [must pick color]

//event handler for adding qty
// set a parameter for min and max qty
//user limit between 1 and 100, no negative or beyond
  //if user 'accidentally' input negative value or over 100
  //show alert box [qty not allowed, pick between 1-100 only]

// one or the other
// if user picked color but not qty and hit addToCart btn
//alert [must add qty]
// if user pick qty and did not pick color
//alert [must pick color].

//addToCart must have both values input from user before it can be stored in local storage.

// FOCUS on...
// user input color to localStorage.







