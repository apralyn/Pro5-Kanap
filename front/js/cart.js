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
    cartTotal();
    changeItemQty();
    deleteItem();
  });

function createEachItemCard(allProductsData) {
  // TODO clean-up and simplify templated strings to simple strings if possible. - done
  // TODO extract blocks of code into helper functions using VSCode extract.
  //      keep in mind to use meaningful names on helper functions.
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

function displayQtyTotal() {
  const totalQty = document.getElementById("totalQuantity");
  const quantities = cart.map((item) => item.qty);
  const newQtyTotal = quantities.reduce((x, y) => x + y, 0);
  totalQty.innerText = newQtyTotal;
  console.log(totalQty);
}

function cartTotal() {
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

//Milestone 9
// TODO add event listeners for quantity input field and delete link.
/* event listener */
// let itemQtyInput = document.getElementsByClassName("itemQuantity");
// itemQtyInput.addEventListener("click", () => {
//   console.log("click");
// });

function changeItemQty() {
  let qtyItemChange = document.getElementsByClassName("itemQuantity");
  for (let c of qtyItemChange) {
    let btn = c;
    btn.addEventListener("change", () => {
      console.log("change");
    });
  }
}

//TODO I have find to a way to change the quantity when the user changed their mind.
//    TODO this is where you will call the event listener (input).
/*
   * TODO: Ask the right questions. What does this function do? 
   * and what information/data do i need.
   * 
   * this function works when the user changes the quantity of an item from the cart using an eventListener.
   * when does this function activate? or when does it work?
   * condition: there has to be something in the cart in order for this function to activate.
   * when the user decide to change the quantity of an item, this function will:
   * automatically, recalculate the total number of articles in the cart and the total amount of the cart.
   * make sure that when the user is changing the value that it doesn't go below zero to negative. function must be stopped at 1.
   * also make sure that when the user changes the value in the cart, it is also updated in the localStorage.
   
  */

function deleteItem() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let e of deleteItemBtn) {
    let btn = e;
    btn.addEventListener("click", () => {
      console.log("delete");
    });
  }
  //TODO if the user click on the delete it will delete the whole item card from the cart page
  //      and also from the local storage.
}
