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
    return data.json();
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
    //const itemArticle = parentArticle(cartItem);
    const cartItems = document.getElementById("cart__items"); // not sure why document.querySeletor was not working
    const itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.dataset.id = cartItem.id;
    itemArticle.dataset.color = cartItem.color;
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

    //cart item
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

    //itemQty
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

    //delete btn
    const cartItemDeleteBtn = document.createElement("div");
    cartItemDeleteBtn.classList.add("cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartItemDeleteBtn);
    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    cartItemDeleteBtn.appendChild(deleteItem).innerText = "Delete";
  }
}
/* End of each item cards */

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

// delete an item from the cart
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", deleteCartItem);
  }
}
// remove item card from the cart
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

// first name
const firstNameEl = document.getElementById("firstName");
firstNameEl.addEventListener("change", validateFirstName);
// last name
const lastNameEl = document.getElementById("lastName");
lastNameEl.addEventListener("change", validateLastName);
// email
const emailElement = document.getElementById("email");
emailElement.addEventListener("change", validateEmail);
const form = document.getElementsByClassName("cart__order__form__question");
console.log(form);
// order button
const orderEl = document.getElementById("order");
orderEl.addEventListener("click", validateOrderForm);

function validateFirstName(event) {
  const nameRegex = new RegExp(/^[a-zA-Z '.-]*$/);
  const checkFirstName = nameRegex.test(event.target.value);
  console.log(checkFirstName);
  if (checkFirstName === false) {
    document.getElementById("firstNameErrorMsg").innerText =
      "First name is not valid";
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "";
  }
}

function validateLastName(event) {
  const nameRegex = new RegExp(/^[a-zA-Z '.-]*$/);
  const checkLastName = nameRegex.test(event.target.value);
  console.log(checkLastName);
  if (checkLastName === false) {
    document.getElementById("lastNameErrorMsg").innerText =
      "Last name is not valid";
  } else {
    document.getElementById("lastNameErrorMsg").innerText = "";
  }
}

function validateEmail(event) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const checkEmail = emailRegex.test(event.target.value);
  if (checkEmail === false) {
    document.getElementById("emailErrorMsg").innerText = "Incorrect Email";
  } else {
    document.getElementById("emailErrorMsg").innerText = "";
  }
}

function validateOrderForm(event) {
  event.preventDefault();
  const cart = JSON.parse(localStorage.getItem("cart"));
  const products = cart.map((item) => item.id);
  console.log(products);

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  //check values cannot be empty
  if (firstName === "") {
    alert("Please provide your first name");
  }

  //POST API
  const order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    // TODO get the id's from the cart inside the localStorage
    products,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((data) => {
      return data.json();
    })
    .then((confirmation) => {
      //TODO after verifying all correct user input, use fetch API to POST the order to the backend server.
      //TODO redirect to confirmation page with order ID (refer to the product.js for search params)
      //TODO Clear out the local storage
      //TODO use location.assign("(it will be confirmation html)") (refer to line 20 on script)
      console.log(confirmation.orderId);
    });
}
