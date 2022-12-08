//URL object to access search params
const productUrl = window.location.href;
const newProductUrl = new URL(productUrl);
const cart = JSON.parse(localStorage.getItem("cart")) || [];
//product ID
const productId = newProductUrl.searchParams.get("id");

//Fetch API + productId
fetch("http://localhost:3000/api/products/" + productId)
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    displaySingleProduct(products);
  });

function displaySingleProduct(products) {
  let productTitle = document.getElementById("title");
  productTitle.innerHTML = products.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = products.price;

  let productDescription = document.getElementById("description");
  productDescription.innerHTML = products.description;

  let productItem = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.setAttribute("src", products.imageUrl);
  productImg.setAttribute("alt", products.altTxt);
  productItem.appendChild(productImg);

  //loop for each color options
  for (let color of products.colors) {
    const productColor = document.querySelector("#colors");
    const colorOption = document.createElement("option");
    colorOption.setAttribute("value", color);
    productColor.appendChild(colorOption);
    colorOption.innerHTML = color;
  }
}

//add to cart button click event
const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", addItemToCart);

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
