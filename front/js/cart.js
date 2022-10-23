// >>>>>>>> CART <<<<<<<<<<
const cart = JSON.parse(localStorage.getItem("cart"));
let allProductsData = [];

// will check if isCartEmpty or NOT.
let isCartEmpty = cart === null; // always "null" when localStorage is empty/emptied.
if (isCartEmpty) {
  //   console.log("the CART inside the local storage is currently empty.");
}

// >>>>>>>>  All PRODUCTS data  <<<<<<<<<<
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json(); // all products data is returned as json format
  })
  .then((products) => {
    // "allProductsData" contains all the products data from the API
    allProductsData = products;
    allProductsData._id;
    createEachItemCard(allProductsData);
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
    const cartItems = document.getElementById("cart__items"); // not sure why document.querySeletor was not working
    const itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.setAttribute("data-id", `${cartItem.id}`);
    itemArticle.setAttribute("data-color", `${cartItem.color}`);
    cartItems.appendChild(itemArticle);

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

    const cartItemDescription = document.createElement("div");
    const cartItemProdName = document.createElement("h2");
    const cartItemProdColor = document.createElement("p");
    const cartItemProdPrice = document.createElement("p");
    cartItemContent.appendChild(cartItemDescription);
    cartItemDescription.appendChild(cartItemProdName).innerText =
      cartItemProdInfo.name;
    cartItemDescription.appendChild(cartItemProdColor).innerText =
      cartItem.color;
    cartItemDescription.appendChild(
      cartItemProdPrice
    ).innerText = `€${cartItemProdInfo.price}`;

    const cartContentSettings = document.createElement("div");
    cartContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartContentSettings);

    const cartContentQty = document.createElement("div");
    cartContentQty.classList.add("cart__item__content__settings__quantity");
    cartContentSettings.appendChild(cartContentQty);

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

    const cartItemDeleteBtn = document.createElement("div");
    cartItemDeleteBtn.classList.add("cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartItemDeleteBtn);
    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    cartItemDeleteBtn.appendChild(deleteItem).innerText = "Delete";
  }
}
//Milestone 8
//TODO insert the total iotem quantity into the cart page
//TODO insert the total amount of all the the cart items into the cart page
//     - amount is the total price of all sofas
const totalQty = document.getElementById("totalQuantity");
totalQty.innerText = 2;

const totalPrice = document.getElementById("totalPrice");
totalPrice.innerText = 84;

function insertItemQty(cartItem, cartContentQty) {
  //Milestone 9
  //TODO I have to a way to change the quantity when the user changed their mind.
  //    TODO this is where you will call the event listener (input).
}
//TODO create new function to handle the changing of item quantities
//    TODO I have to make sure that when quantity from the cart page is changed, the quantity
//         of the item from the local storage is also change and match the cart page.
//    TODO refresh the totals

function insertDeleteBtn(cartContentSettings) {
  //Milestone 9
  //TODO if the user click on the delete it will delete the whole item card from the cart page
  //      and also from the local storage.
}
