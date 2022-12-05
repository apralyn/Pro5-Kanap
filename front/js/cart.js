// >>>>>>>> CART <<<<<<<<<<
const cart = JSON.parse(localStorage.getItem("cart"));
let allProductsData = [];
console.log(cart);

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
    displayQtyTotal(cart);
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
  itemArticle.dataset.id = cartItem.id;
  itemArticle.dataset.color = cartItem.color;
  cartItems.appendChild(itemArticle);
  return itemArticle;
}
/* End of item cards */

function displayQtyTotal(cart = []) {
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

function addChangeItemQtyListeners() {
  let qtyItemChange = document.getElementsByClassName("itemQuantity");
  for (let change of qtyItemChange) {
    change.addEventListener("change", changeItemQty);
  }
}

function changeItemQty(event) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const articleElement = event.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  let quantity = event.target.value;

  //recalculation when user change item qty from cart page.
  let totalPriceChange = 0;
  allProductsData.forEach((itemData) => {
    let itemDataPrice = itemData.price;
    if (id === itemData._id) {
      totalPriceChange = totalPriceChange + itemDataPrice * quantity;
    }
  });

  //targets the specific item using id & color when user changes the item qty.
  const selectedItem = id;
  const selectedColor = color;
  const search = cart.find(
    (item) => item.id === selectedItem && item.color === selectedColor
  );
  if (search.qty < quantity) {
    search.qty++;
  } else if (quantity < search.qty) {
    search.qty--;
  }

  displayQtyTotal(cart);
  cartTotal(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  //console.log(cart);
}

/* when user deletes an item from the cart page */
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", deleteCartItem);
  }
}
// removes the card from the cart page
function deleteCartItem(event) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const articleElement = event.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  const selectedItem = id;
  const selectedColor = color;

  const quantity = parseInt(
    articleElement.querySelector(".itemQuantity").value
  );
  const filteredCart = cart.filter(
    (item) => !(item.id === selectedItem && item.color === selectedColor)
  );
  articleElement.remove();
  localStorage.setItem("cart", JSON.stringify(filteredCart));
  updateTotalQty(quantity);
  updateTotalPrice(quantity);
}
/**
 * Update the total quantity on the cart page.
 *
 * @param {number} quantity - Cart item quantity.
 */
function updateTotalQty(quantity) {
  const totalQtyEl = document.getElementById("totalQuantity");
  const totalQty = parseInt(totalQtyEl.innerText);
  totalQtyEl.innerText = totalQty - quantity;
  location.reload();
}
function updateTotalPrice(quantity) {
  const totalPriceEl = document.getElementById("totalPrice");
  const totalPrice = parseInt(totalPriceEl.innerText);
  totalPriceEl.innerText = totalPrice - quantity;
  location.reload();
}
/**
 * form validation
 */
// email
const emailEl = document.getElementById("email");
emailEl.addEventListener("change", isEmailValid);

// name
const firstEl = document.getElementById("firstName");
const lastEl = document.getElementById("lastName");
firstEl.addEventListener("change", isNameValid);
lastEl.addEventListener("change", isNameValid);

/* ---input form validation--- */
// Milestone 10
// First and Last name  can have letters
// address
//email must have @sign and .

//first/last name: a-z, A-Z
//TODO addEventListener change to check for numbers on the name.
const nameRegex = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/);
const isNameValid = nameRegex.test();

//adress: a-z, A-Z, 0-9
const addressRegex = new RegExp(
  /^[ \w]{3,}([A-Za-z]\.)?([ \w]*\#\d+)?(\r\n| )[ \w]{3,},\x20[A-Za-z]{2}\x20\d{5}(-\d{4})?$/
);
const isAddressValid = addressRegex.test();

function isEmailValid(event) {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const checkEmail = emailRegex.test(event.target.value);
  console.log(checkEmail);

  //TODO if checkEmail is false add error message in the email id="emailErrorMsg". use innerText
}

//TODO add a click eventListener to the order button "commander!"
// check to see if all the fields has a value (no fields should be left empty) and check one last time that the email field has the correct value.
// use function to check the email field.

//Milestone 11
//TODO after verifying all correct user input, use fetch API to POST the order to the backend server.
//TODO redirect to confirmation page with order ID (refer to the product.js for search params)
//TODO use location.assign("(it will be confirmation html)") (refer to line 20 on script)
