// cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProductsData = [];
console.log(typeof cart);

// products data
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

/**
 * Generate each product card added by user.
 *
 * @param {Object[]} allProductsData - product info
 */
function createEachItemCard(allProductsData) {
  for (let cartItem of cart) {
    let cartItemProdInfo = allProductsData.find(
      (product) => cartItem.id === product._id
    );
    //parent Article
    const cartItems = document.getElementById("cart__items");
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
    cartContentQty.appendChild(cartItemQty).innerText = "Qté : ";
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
/**
 * Calculate the current total number of items
 *
 * @param {object} cart items added by user
 */
function displayQtyTotal(cart = []) {
  const totalQty = document.getElementById("totalQuantity");
  const quantities = cart.map((item) => item.qty);
  const newQtyTotal = quantities.reduce(
    (oldQtyValue, newQtyValue) => oldQtyValue + newQtyValue,
    0
  );
  totalQty.innerText = newQtyTotal;
}

/**
 * Calcualte the current total amount of all items
 *
 * @param {object} cart items added by user
 */
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

/**
 * use can change all item quantities in the cart
 */
function addChangeItemQtyListeners() {
  let qtyItemChange = document.getElementsByClassName("itemQuantity");
  for (let change of qtyItemChange) {
    change.addEventListener("change", changeItemQty);
  }
}

/**
 * Calculate total price when use changes the quantity of each item.
 *
 * @param {string} event quantity value change by user
 */
function changeItemQty(event) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const articleElement = event.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  let quantity = event.target.value;

  let totalPriceChange = 0;
  allProductsData.forEach((itemData) => {
    let itemDataPrice = itemData.price;
    if (id === itemData._id) {
      totalPriceChange = totalPriceChange + itemDataPrice * quantity;
    }
  });

  //user selected item for id & color .
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
}

/**
 *  Delete button for each item
 */
function addDeleteItemListeners() {
  let deleteItemBtn = document.getElementsByClassName("deleteItem");
  for (let deleteBtn of deleteItemBtn) {
    deleteBtn.addEventListener("click", deleteCartItem);
  }
}

/**
 * Calculate total article and price for when user deletes an item.
 *
 * @param {HTMLElement} event each item card
 */
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
/**
 * Update the total price of all items in the cart
 *
 * @param {number} quantity
 */
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
const firstName = document.getElementById("firstName");
firstName.addEventListener("change", validateFirstName);
// last name
const lastName = document.getElementById("lastName");
lastName.addEventListener("change", validateLastName);
//address
const address = document.getElementById("address");
const city = document.getElementById("city");
// email
const email = document.getElementById("email");
email.addEventListener("change", validateEmail);
// order button
const order = document.getElementById("order");
order.addEventListener("click", validateOrderForm);

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
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const checkEmail = emailRegex.test(event.target.value);
  if (checkEmail === false) {
    document.getElementById("emailErrorMsg").innerText = "Incorrect Email";
  } else {
    document.getElementById("emailErrorMsg").innerText = "";
  }
}
/**
 * Check to see if given fields are not empty
 *
 * @param {HTMLElement} firstName
 * @param {*} lastName
 * @param {*} address
 * @param {*} city
 * @param {*} email
 * @returns {boolean} true if all fields are valid
 */
function checkAllValidInput(firstName, lastName, address, city, email) {
  const emptyFirstName = firstName.value;
  const emptyLastName = lastName.value;
  const emptyAddress = address.value;
  const emptyCity = city.value;
  const emptyEmail = email.value;
  let isValid = true;

  isValid = checkInputField(
    emptyFirstName,
    isValid,
    "firstNameErrorMsg",
    "First name is empty"
  );
  isValid = checkInputField(
    emptyLastName,
    isValid,
    "lastNameErrorMsg",
    "Last name is empty"
  );
  isValid = checkInputField(
    emptyAddress,
    isValid,
    "addressErrorMsg",
    "Address is empty"
  );
  isValid = checkInputField(
    emptyCity,
    isValid,
    "cityErrorMsg",
    "City is empty"
  );
  isValid = checkInputField(
    emptyEmpty,
    isValid,
    "emailErrorMsg",
    "Email is empty"
  );
  return isValid;
}

function checkInputField(emptyFirstName, isValid, id, errorMessage) {
  if (!emptyFirstName) {
    document.getElementById(id).innerText = errorMessage;
    isValid = isValid && false;
  } else {
    document.getElementById(id).innerText = "";
  }
  return isValid;
}

function validateOrderForm(event) {
  event.preventDefault();
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (checkAllValidInput(firstName, lastName, address, city, email) && cart) {
    //map itirate each items in the cart and will get the IDs of each item.
    const products = cart.map((item) => item.id);

    //POST API
    const order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
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
        console.log(confirmation.orderId);
        localStorage.removeItem("cart");

        location.assign(`./confirmation.html?orderId=${confirmation.orderId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
