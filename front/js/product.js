
const productUrl = window.location.href;
const newProductUrl = new URL(productUrl);
const productId = newProductUrl.searchParams.get("id");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("http://localhost:3000/api/products/" + productId)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    displaySingleProduct(product);
  });
/**
 * Display product with data, color choices, and quantity
 * 
 * @param {*} product 
 */
function displaySingleProduct(product) {
  let productTitle = document.getElementById("title");
  productTitle.innerHTML = product.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  let productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;

  let productItem = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.setAttribute("src", product.imageUrl);
  productImg.setAttribute("alt", product.altTxt);
  productItem.appendChild(productImg);

  //color options
  for (let color of product.colors) {
    const productColor = document.querySelector("#colors");
    const colorOption = document.createElement("option");
    colorOption.setAttribute("value", color);
    productColor.appendChild(colorOption);
    colorOption.innerHTML = color;
  }
}


const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", addItemToCart);
/**
 * User cannot add item to the cart without choosing a color or quantity.
 * 
 * @returns 
 */
function addItemToCart() { 
  let colorChoice = document.getElementById("colors");
  let qtyChoice = document.getElementById("quantity");
  let colorValue = colorChoice.value;
  let qtyValue = parseInt(qtyChoice.value);

  const itemToAdd = {
    id: productId,
    color: colorValue,
    qty: qtyValue,
  };
  if (itemToAdd.color == "" || itemToAdd.qty == 0) {
    return;
  }
  let isCartEmpty = cart == 0;
  if (isCartEmpty) {
    cart.push(itemToAdd); //add to cart
    window.localStorage.setItem("cart", JSON.stringify(cart)); //save to cart
  } else {
    // if cart is not empty update the item qty in cart
    let foundExactItem = false; // boolean flag
    for (let i = 0; i < cart.length; i++) {
      const sameExactItem =
        cart[i].id === itemToAdd.id && cart[i].color === itemToAdd.color;
      if (sameExactItem) {
        foundExactItem = true;
        cart[i].qty++; // update and add from user input qty.
        window.localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    //if i didnt find the same exact item
    //push item to add to cart
    if (!foundExactItem) {
      cart.push(itemToAdd);
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}
