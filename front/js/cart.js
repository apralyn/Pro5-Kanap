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
  for (cartItem of cart) {
    // console.log(cartItem);
    document.getElementById("cart__items").innerHTML = `
    <article class="cart__item" data-id="${allProductsData._id}" data-color="${allProductsData.color}">
                <div class="cart__item__img">
                  <img src=${allProductsData.imgUrl} alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${allProductsData.name}</h2>
                    <p>Green</p>
                    <p>${allProductsData.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
  }
}
