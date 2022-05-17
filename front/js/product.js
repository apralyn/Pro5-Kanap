const productUrl = window.location.href;
//URL object to access search params
const newProductUrl = new URL(productUrl);
//product ID
const productId = newProductUrl.searchParams.get('id');

//STEP02 Fetch API + productId 
// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productId)
  .then ((data) => {
    return data.json();
  }).then ((product) => {
    // console.log(product);
    function displaySingleProduct(product) {
    
      let productTitle = document.getElementById('title');
      productTitle.innerHTML = product.name;
      
      let productPrice = document.getElementById('price');
      productPrice.innerHTML = product.price;
      
      let productDescription = document.getElementById('description');
      productDescription.innerHTML = product.description;
      
      let productItem = document.querySelector('.item__img');
      let productImg = document.createElement('img');
      productImg.setAttribute('src', product.imageUrl);
      productImg.setAttribute('alt', product.altTxt);
      productItem.appendChild(productImg); 
  
      //loop for the color options
      for (let color of product.colors) {  
        const productColor = document.querySelector('#colors');
        const colorOption = document.createElement('option');
        colorOption.setAttribute('value', color);
        productColor.appendChild(colorOption);
        colorOption.innerHTML = color;
          
        }
    }
    displaySingleProduct(product);
    
    //why is there an error in this loop? i need to store the value of the product in a variable, figure out how to.
    for (let item of product) {
        displaySingleProduct(item);
      }
  })
//------------end of fetch
    //STEP03 - displaySingleProduct()
    //populate the item details in this area from the API to show in the product page.
  
  //milestore7 death of me
   // The product ID
  console.log(productId);
   
    //user input - whatever color and quantity the user picked.global access
  let colorChoice = document.getElementById('colors');
  let qtyChoice = document.getElementById('quantity');

    //add to cart button - the actual add to cart button
  const addToCartButton = document.getElementById('addToCart');
  addToCartButton.addEventListener('click', () => {
     addToCart();
  }); 
    /* the button will trigger the following actions inside the function. //reference used: webdev simplified logic
       1. creates a variable that holds the value of the user input[color and qty].
       2. if the input is wrong it will trigger an alert so that user will input right amount.
       3. else - if correct data is inputed by the user the function will place the data inside an object called item. 
       4. when the item is created it will be stored in the localstorage.
       */
  
    // the issue that i'm having is that the cart array does not get re-used it keeps creating a new array.
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function addToCart() {

    //user input data
    let userPickColor = colorChoice.value; //since this element is an input, the input value is the uder input data I needed. 
    let userPickQty = qtyChoice.value;
    
    let itemToAdd = { 
      itemProductId: productId,
      itemColor: userPickColor,
      itemQty: userPickQty,  
    }
    
    // logic behind user missing inputs.
    if (!itemToAdd.itemColor || !itemToAdd.itemQty )  {
      alert('you forgot something')
    } else {
      // console.log(itemToAdd);
      cart.push(itemToAdd);
      cartStatus();
    }; // this adds any of the item i picked in particular product id into the cart
    // console.log(cart);
    // console.log(cart[2].itemColor);
    // console.log(cart[1].itemQty);
    // console.log(cart[0].itemProductId);
    // console.log(cart.length);
    
    cartStatus = () => {
      if (cart != 0 ) {
        for (let eachItem of cart) {
          // console.log(itemInCart);
          if (eachItem.itemProductId == itemToAdd.itemProductId   &&  eachItem.itemColor == itemToAdd.itemColor) {
            eachItem.itemQty ++; //i know this works because i can see the qty counter go up. 
            break;
          } else {
            console.log('your logic is not working');
            console.log(cart);
          }
        }
        // console.log('cart is not e to zero', ' and you got ', cart.length, ' in your cart.');
      } 
      // return;
      // else {
      //   console.log('cart is equal to zero');
      // }
    } 
    cartStatus();

  }
  addToCart();

  // const saveToCart =  window.localStorage.setItem('cart', JSON.stringify(cart));
  
    //  {
    //   if (itemInCart.itemProductId == itemToAdd.itemProductId && itemInCart.itemColor == itemToAdd.itemColor) {
    //     itemInCart.itemQty ++;
    //     console.log('loopyyyy');
    //     break;
    //   } else {
    //     console.log(itemToAdd);
    //   }
    // }

  

    