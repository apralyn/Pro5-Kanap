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
    let cartItems = document.getElementById("cart__items"); // not sure why document.querySeletor was not working
    let itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.setAttribute("data-id", `${cartItem.id}`);
    itemArticle.setAttribute("data-color", `${cartItem.color}`);
    cartItems.appendChild(itemArticle);
    

    // Article child no.1 div for cart item img
    let cartItemImg = document.createElement("div");
    cartItemImg.classList.add("cart__item__img");
    itemArticle.appendChild(cartItemImg);
    let img = document.createElement("img");
    cartItemImg.appendChild(img);
    img.setAttribute("src", `${allProductsData.imageUrl}`);

    // Article child no.2 div for cart item content
    let cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");

    itemArticle.appendChild(cartItemContent);
  }
}
