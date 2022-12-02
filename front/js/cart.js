// >>>>>>>> CART <<<<<<<<<<
const cart = JSON.parse(localStorage.getItem("cart"));
let allProductsData = [];

// will check if isCartEmpty or NOT.
let isCartEmpty = cart === null; // always "null" when localStorage is empty/emptied.
if (isCartEmpty) {
  alert("Your CART is currently empty.");
} else {
  displayQtyTotal();
}

// >>>>>>>>  All PRODUCTS data  <<<<<<<<<<
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json(); // all products data is returned as json format
  })
  .then((products) => {
    allProductsData = products;
    allProductsData._id;
    createEachItemCard(allProductsData);
    cartTotal(cart);
    addChangeItemQtyListeners();
    addDeleteItemListeners();
  });
/* Item card Start here */
function createEachItemCard(allProductsData) {
  for (let cartItem of cart) {
    let cartItemProdInfo = allProductsData.find(
      (product) => cartItem.id === product._id
    );
    //parent Article
    const itemArticle = parentArticle(cartItem);

    // Article child no.1 div for cart item img
    const cartItemImg = document.createElement("div");
    cartItemImg.classList.add("cart__item__img");
    itemArticle.appendChild(cartItemImg);

    //img tag
    const img = document.createElement("img");
    cartItemImg.appendChild(img);
    img.setAttribute("src", cartItemProdInfo.imageUrl);
    img.setAttribute("alt", cartItemProdInfo.altTxt);

    // Article child no.2 div for cart item content
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    itemArticle.appendChild(cartItemContent);

    cartItemInfo(cartItemContent, cartItemProdInfo, cartItem);

    const cartContentSettings = document.createElement("div");
    cartContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartContentSettings);

    const cartContentQty = document.createElement("div");
    cartContentQty.classList.add("cart__item__content__settings__quantity");
    cartContentSettings.appendChild(cartContentQty);

    itemQty(cartItem, cartContentQty);
    deleteBtn(cartContentSettings);
  }
}
function cartItemInfo(cartItemContent, cartItemProdInfo, cartItem) {
  const cartItemDescription = document.createElement("div");
  const cartItemProdName = document.createElement("h2");
  const cartItemProdColor = document.createElement("p");
  const cartItemProdPrice = document.createElement("p");
  cartItemContent.appendChild(cartItemDescription);
  cartItemDescription.appendChild(cartItemProdName).innerText =
    cartItemProdInfo.name;
  cartItemDescription.appendChild(cartItemProdColor).innerText = cartItem.color;
  cartItemDescription.appendChild(
    cartItemProdPrice
  ).innerText = `€${cartItemProdInfo.price}`;
}

function itemQty(cartItem, cartContentQty) {
  const cartItemQty = document.createElement("p");
  const cartQtyInput = document.createElement("input");
  cartQtyInput.setAttribute("type", "number");
  cartQtyInput.classList.add("itemQuantity");
  cartQtyInput.setAttribute("name", "itemQuantity");
  cartQtyInput.setAttribute("min", "1");
  cartQtyInput.setAttribute("max", "100");
  cartQtyInput.setAttribute("value", cartItem.qty);
  cartContentQty.appendChild(cartItemQty).innerHTML = "<p>Qté : </p>";
  cartContentQty.appendChild(cartQtyInput);
}

function deleteBtn(cartContentSettings) {
  const cartItemDeleteBtn = document.createElement("div");
  cartItemDeleteBtn.classList.add("cart__item__content__settings__delete");
  cartContentSettings.appendChild(cartItemDeleteBtn);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  cartItemDeleteBtn.appendChild(deleteItem).innerText = "Delete";
}

function parentArticle(cartItem) {
  const cartItems = document.getElementById("cart__items"); // not sure why document.querySeletor was not working
  const itemArticle = document.createElement("article");
  itemArticle.classList.add("cart__item");
  itemArticle.setAttribute("data-id", `${cartItem.id}`);
  itemArticle.setAttribute("data-color", `${cartItem.color}`);
  cartItems.appendChild(itemArticle);
  return itemArticle;
}
/* End of item cards */


/*--------------------------------------------------------*/
// this function is for the # of articles in the cart
// it counts the correct quantities of the items added in the cart + dynamically changes when the
// user decides to update the quantity from the cart page.
// the function should:
// 1. initial total number of article for when the user adds an item from the product page. - done
// 2. recalculates automatically when the user decides to change the item quantity from the cart page.
// 3. recalculates automatically when the user decides to delete an item from the cart page.

function displayQtyTotal() {
  const totalQty = document.getElementById("totalQuantity");
  const quantities = cart.map((item) => item.qty);
  const newQtyTotal = quantities.reduce(
    (oldQtyValue, newQtyValue) => oldQtyValue + newQtyValue,
    0
  );
  totalQty.innerText = newQtyTotal;
}

// this function displays the correct total amount in the cart page. 
// this function will also need to dynamically calculate the total amount whenever the user updates 
// the quantity from the cart page or when the user deletes an item from the cart page. 
// the function should have:
// 1. initial cartTotal for when the user adds an item from the product page.
// 2. recalculates automatically when the user decides to change the item quantity from the cart page.
// 3. recalculates automatically when the user decides to delete an item from the cart page.  
function cartTotal(cart) {
  let total = 0;
  for (let cartItem of cart) {
    let cartItemProdInfo = allProductsData.find(
      (product) => cartItem.id === product._id
    );
    let price = cartItemProdInfo.price;
    let quantity = cartItem.qty;
    total += price * quantity;
  }
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = total; 
}

// triggers the event listener for each change in the item/items quantity in the cart page.
function addChangeItemQtyListeners() {
  let qtyItemChange = document.getElementsByClassName("itemQuantity");
  for (let change of qtyItemChange) {
    change.addEventListener("change", changeItemQty);
  }
}


//this function targets the id, color, and quantity of a specific item in the cart
//quantity is also an input
function changeItemQty(event) {
  // variable grabs the specific data(ID, Color, Quantity) from each item in the CART 
  const articleElement = event.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  let quantity = event.target.value; //value can be changed dynamically.
console.log(id);
  //TODO update total cart quantity and the total number or articles
  //this calculates the total amount for each item change.
  //then each item total amount will be added and stored in the totalPrice.
  let totalPriceForEachItemChange = 0;
  allProductsData.forEach((itemData) => {
    let itemDataPrice = itemData.price;
    if (id === itemData._id) {
      //FIXME multiply quantity * price for each line item, add it to the running total(totalPrice)
      totalPriceForEachItemChange = totalPriceForEachItemChange + (itemDataPrice * quantity);
    console.log(totalPriceForEachItemChange, quantity);
    }
  });
  // cart item qty is finally increasing
  let selectedItem = id;
  const search = cart.find((item) => item.id === selectedItem);
  search.qty += 1;
  console.log(selectedItem, search);
  //console.log(cart.map((item) => item.qty + item.color));// old qty

  
  
  // i need newTotalPrice = i need to add the dynamic total of each item in the cart
  //let newTotalPrice = document.getElementById("totalPrice").innerHTML = 'hello';
  
  //FIXME use quantity to update the quantity of the items in the localStorage.
  //localStorage.setItem("cart", JSON.stringify(cart));
}


//quantity changes by decreasing calculation update in real time
//when the user deletes an item. the calculation to the total amount update in real time
//set the quantity change in the localStorage update in real time.

//TODO refer to function changeItemQty TODOS same with delete.
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", deleteCartItem);
  }
}

function deleteCartItem(event) {
  const articleElement = event.target.closest("article");
  articleElement.remove();
//TODO remove item from localStorage
}


/* ---input form validation--- */
// Milestone 10
// First and Last name  can have letters
// address
//email must have @sign and .

//first/last name: a-z, A-Z
//TODO addEventListener change to check for numbers on the name.
const nameRegex = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/);
const isNameValid = nameRegex.test("apralyn eribal");
console.log(isNameValid);

//adress: a-z, A-Z, 0-9
const addressRegex = new RegExp(
  /^[ \w]{3,}([A-Za-z]\.)?([ \w]*\#\d+)?(\r\n| )[ \w]{3,},\x20[A-Za-z]{2}\x20\d{5}(-\d{4})?$/
);
const isAddressValid = addressRegex.test(
  "5358 Java St. Las Vegas, Nevada 89148"
);
console.log(isAddressValid);

//email: a-z, A-Z, 0-9, characters(@, ., -, _, )
//TODO add a change eventListener to the email field that tests the value with a regex email expression.
// if test fails put a message in the email id="emailErrorMsg". use innerText
// email is an input element which has value.

const emailEl = document.getElementById("email");
emailEl.addEventListener("change", isEmailValid);

function isEmailValid(event) {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const checkEmail = emailRegex.test(event.target.value);
  console.log(checkEmail);
  //TODO if checkEmail is false add error message in the email id="emailErrorMsg". use innerText
  //TODO if empty they have to add information
}

//TODO add a click eventListener to the order button "commander!"
// check to see if all the fields has a value (no fields should be left empty) and check one last time that the email field has the correct value.
// use function to check the email field.

//Milestone 11
//TODO after verifying all correct user input, use fetch API to POST the order to the backend server.
//TODO redirect to confirmation page with order ID (refer to the product.js for search params)
//TODO use location.assign("(it will be confirmation html)") (refer to line 20 on script)
