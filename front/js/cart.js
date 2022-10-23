// TODO get cart items from local storage - done
// TODO get all products information from fetch api and save it somewhere like in a variable. - done
// TODO take care of the quantity string from the product.js (parse from string to number)

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
    createEachItemCard();
  });

function createEachItemCard() {
  // TODO insert cards that was added in the cart
  //    TODO loop things added to the cart which is an array from the local storage - done
  //    TODO while there are items in the cart the loop will go through each of the items and will insert cart items in the page. I need product information for each cart item from the products variable - see line 2 on TODO. (use innerHTML with back ticks)
  for (let cartItem of cart) {
    // console.log(cartItem);

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
    img.setAttribute("src", `${allProductsData.imageUrl}`);
    img.setAttribute("alt", `${allProductsData.altTxt}`);

    // Article child no.2 div for cart item content
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    itemArticle.appendChild(cartItemContent);

    const cartItemDescription = document.createElement("div");
    const cartItemProdName = document.createElement("h2");
    const cartItemProdColor = document.createElement("p");
    const cartItemProdPrice = document.createElement("p");
    cartItemContent.appendChild(cartItemDescription);
    cartItemDescription.appendChild(
      cartItemProdName
    ).innerHTML = `${allProductsData.name}`;
    cartItemDescription.appendChild(
      cartItemProdColor
    ).innerHTML = `${cartItem.color}`;
    cartItemDescription.appendChild(
      cartItemProdPrice
    ).innerHTML = `${allProductsData.price}`;

    //
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
    cartQtyInput.setAttribute("value", "42");
    cartContentQty.appendChild(cartItemQty);
    cartContentQty.appendChild(cartQtyInput);

    const cartItemDeleteBtn = document.createElement("div");
    cartItemDeleteBtn.classList.add("cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartItemDeleteBtn);
    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    cartItemDeleteBtn.appendChild(deleteItem).innerHTML = "Delete";
  }
}
