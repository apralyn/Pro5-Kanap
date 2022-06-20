
// 
let getCart = JSON.parse(localStorage.getItem('cart'));
console.log(getCart);

fetch("http://localhost:3000/api/products/")


function createItemCard() {
   //------_Start_-----
/*
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
*/
//the parent for article
let newArticleParent = document.querySelector('#cart__items');
//create an article with class attribute "cart__item", data-id attribute and data-color attribute
let cartItemHolder = document.createElement("article");
cartItemHolder.classList.add('cart__item'); // class atrribute added
cartItemHolder.setAttribute('data-id', getCart[0].id);
cartItemHolder.setAttribute('data-color', getCart[0].color);
newArticleParent.appendChild(cartItemHolder);
//------_End_--------

//---_Start Image Tag-----
/*
<div class="cart__item__img">
   <img src="../images/product01.jpg" alt="Photo of a sofa">
</div>
*/
//create a div(#1) inside article
let cartItemImg = document.createElement('div');
cartItemImg.classList.add('cart__item__img');
cartItemHolder.appendChild(cartItemImg);
//img inside div
let cartItemImgHolder = document.createElement('img');
// added dummy src and alt to check if DOM is working
cartItemImgHolder.setAttribute('src', 'image');
cartItemImgHolder.setAttribute('alt', 'Photo of a sofa');
cartItemImg.appendChild(cartItemImgHolder); 

console.log('product image suppose to be in here', cartItemImg);
//----_End of Image Tag--------

//------_start_ div(2)------ 
/*
<div class="cart__item__content">
*/
let cartItemContent = document.createElement('div');
cartItemContent.classList.add('cart__item__content');
cartItemHolder.appendChild(cartItemContent);

//-----description start-------
/*
<div class="cart__item__content__description">
                    <h2>Name of the product</h2>
                    <p>Green</p>
                    <p>€42.00</p>
                  </div>
*/
// cart__item__content__description
let cartItemDescription = document.createElement('div');
cartItemDescription.classList.add('cart__item__content__description');
cartItemContent.appendChild(cartItemDescription);
//Name, Color, Price
let cartItemName = document.createElement('h2');
let cartItemColor = document.createElement('p');
let cartItemPrice = document.createElement('p');
cartItemDescription.appendChild(cartItemName).innerHTML = 'Name of the product';
cartItemDescription.appendChild(cartItemColor).innerHTML = 'Green';
cartItemDescription.appendChild(cartItemPrice).innerHTML = '&#836442.00';

console.log('name color and price of item in', cartItemDescription);
//-------description end--------

//------ setting start---------
/*
<div class="cart__item__content__settings">
   <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
   </div>
   <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Delete</p>
   </div>
</div>
*/
//<div class="cart__item__content__settings">
let cartItemContentSettings = document.createElement('div');
cartItemContentSettings.classList.add('cart__item__content__settings');
cartItemContent.appendChild(cartItemContentSettings);

// <div class="cart__item__content__settings__quantity">
let cartItemContentSettingsQty = document.createElement('div');
cartItemContentSettingsQty.classList.add('cart__item__content__settings__quantity');
cartItemContentSettings.appendChild(cartItemContentSettingsQty);

//<p>Qté : </p>
//<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
let itemQty = document.createElement('p');
let inputItemQty = document.createElement('input');
inputItemQty.setAttribute("type", "number");
inputItemQty.classList.add('itemQuantity'); 
inputItemQty.setAttribute("name", "itemQuantity");
inputItemQty.setAttribute("min", 1);
inputItemQty.setAttribute("max", 100);
inputItemQty.setAttribute("value", 42);
cartItemContentSettingsQty.appendChild(itemQty).innerHTML = 'Qt&#233; : ';
cartItemContentSettingsQty.appendChild(inputItemQty).innerHTML = '';

//<div class="cart__item__content__settings__delete">
let cartItemContentSettingsDelete = document.createElement('div');
cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

//<p class="deleteItem">Delete</p>
let deleteItem = document.createElement('p');
deleteItem.classList.add('deleteItem');
cartItemContentSettingsDelete.appendChild(deleteItem).innerHTML = 'Delete';
//------ setting end-----------
//-------_End_ div(2)----------
console.log(cartItemHolder.outerHTML);

}
createItemCard();
