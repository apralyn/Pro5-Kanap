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

//TODO pass in cart(could be new or old cart)
// this shows the # of articles in the cart page. what if the user deletes an item in the cart, the article # will change.
function displayQtyTotal() {
  const totalQty = document.getElementById("totalQuantity");
  const quantities = cart.map((item) => item.qty);
  const newQtyTotal = quantities.reduce(
    (oldQtyValue, newQtyValue) => oldQtyValue + newQtyValue,
    0
  );
  totalQty.innerText = newQtyTotal;
}

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

// triggers the event listener for the item quantity change in the cart.
function addChangeItemQtyListeners() {
  let qtyItemChange = document.getElementsByClassName("itemQuantity");
  for (let change of qtyItemChange) {
    change.addEventListener("change", changeItemQtyIncrease);
  }
}

//this function targets the id, color, and quantity of a specific item in the cart
function changeItemQtyIncrease(event) {
  const totalPrice = parseInt(document.getElementById("totalPrice").innerText); //to get the current total of the cart
  const articleElement = event.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  let quantity = event.target.value;
  console.log(quantity);
  //console.log(id, color, quantity, totalPrice);

  let totalQtyIncrease = 0;
  allProductsData.forEach(itemData => {
    let itemDataPrice = itemData.price;
    if (id === itemData._id) {
      totalQtyIncrease += itemDataPrice + totalPrice;

      //set to local storage
      //
      //console.log(totalQtyIncrease);
    }
  });
  // Reference for splice ---> https://bobbyhadz.com/blog/javascript-replace-element-in-array
  // trying to figure out how to replace a spefic element in the array (quantity);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  let newTotalAmt = document.getElementById("totalPrice").innerHTML = totalQtyIncrease;

  
  //what about the quantity changes by decreasing calculation update in real time
  //what about when the user deletes an item. the calculation to the total amount update in real time
  //what about the local storage update in real time.
  
}


/*
 *TODO:
 *   automatically recalculate the total number of articles(#) in the cart and the total amount($) of the cart.
 *   localStorage must be updated with the changes.
 */
//TODO refer to function changeItemQty TODOS same with delete.
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", (event) => {
      const articleElement = event.target.closest("article");
      articleElement.remove();
      // 11-21 TODO update the local storage  when the user deletes an item from the cart.
      // TODO update the number of articles and the total amount when the user change the quantity value of an item.
    });
  }
}

/* ----------------------------------------- form validation */
// Milestone 10
// First and Last name  can have letters
// address
//email must have @sign and .

//first/last name: a-z, A-Z
const nameRegex = 
 new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/);
 const isNameValid = nameRegex.test("apralyn eribal");
 console.log(isNameValid);

//adress: a-z, A-Z, 0-9
const addressRegex = 
 new RegExp(/^[ \w]{3,}([A-Za-z]\.)?([ \w]*\#\d+)?(\r\n| )[ \w]{3,},\x20[A-Za-z]{2}\x20\d{5}(-\d{4})?$/);
 const isAddressValid = addressRegex.test("5358 Java St. Las Vegas, Nevada 89148");
 console.log(isAddressValid);

//email: a-z, A-Z, 0-9, characters(@, ., -, _, ) 
const emailRegex = 
 new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
 const isValidEmail = emailRegex.test("email_address@domain.com");
 console.log(isValidEmail);




//TODO add a change eventListener to the email field that tests the value with a regex email expression.
// if test fails put a message in the email id="emailErrorMsg". use innerText
//TODO add a click eventListener to the order button "commander!"
// check to see if all the fields has a value (no fields should be left empty) and check one last time that the email field has the correct value.
// use function to check the email field.

//Milestone 11
//TODO after verifying all correct user input, use fetch API to POST the order to the backend server.
//TODO redirect to confirmation page with order ID (refer to the product.js for search params)
//TODO use location.assign("(it will be confirmation html)") (refer to line 20 on script)
