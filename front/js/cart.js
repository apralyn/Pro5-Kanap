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
function displayQtyTotal() {
  const totalQty = document.getElementById("totalQuantity");
  const quantities = cart.map((item) => item.qty);
  const newQtyTotal = quantities.reduce((x, y) => x + y, 0);
  totalQty.innerText = newQtyTotal;
  console.log(totalQty);
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
/*
 * TODO:
 *    automatically recalculate the total number of articles(#) in the cart and the total amount($) of the cart.
 *    localStorage must be updated with the changes as well.
 *  TODO find cart item for the item that user is changing the quantity
 *     note** const cartItemElement = event.target.closest("article");
 *     I need data-id and data-color to find the cart item who's quantity should be increased.
 *  TODO increase the item quantity with the value the user selected.
 *    note** remember to parse strings with numbers.
 *  TODO put the updated cart back into the local storage
 */

function changeItemQty(event) {
  if(cart.length == 0) {
    console.log ('cart is empty');
  } else {
    // i need to figure out how to target the specific value of the product that the user quantity changed. 
    let el = document.querySelector("#cart__items");
    console.log(el);
    for (let item of el){
      console.log('id' in item.dataset);
    } 
    // for (let eachItem of cart) {
    //  console.log(eachItem);
    // }
    console.log('you have', cart.length, ' items in your cart');
    cartTotal(cart);
  }
  
  }


/*
 * Reference: https://www.youtube.com/watch?v=YeFzkC2awTM&t=507s (parentElement)
 *TODO:
 *   if the user click on the delete it will delete the whole item card from the cart page -done
 *   automatically recalculate the total number of articles(#) in the cart and the total amount($) of the cart.
 *   localStorage must be updated with the changes.
 */
//TODO refer to function changeItemQty TODOS same with delete.
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", (event) => {
      let delBtnClicked = event.target;
      delBtnClicked.parentElement.parentElement.parentElement.parentElement.remove();
      console.log("deleted");
    });
  }
}
