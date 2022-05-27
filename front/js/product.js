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
    // for (let item of product) {
    //     displaySingleProduct(item);
    //   }
  })
//------------end of fetch
    //STEP03 - displaySingleProduct()
    //populate the item details in this area from the API to show in the product page.
  
  //milestore7 death of me
   // The product ID
  console.log(productId);
   
    //user input - whatever color and quantity the user picked.global access
  

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  

    //add to cart button click event
  const addToCartButton = document.getElementById('addToCart');
  addToCartButton.addEventListener('click', function() {   
  
  let colorChoice = document.getElementById('colors');
  let qtyChoice = document.getElementById('quantity');
  let colorValue = colorChoice.value;
  let qtyValue = qtyChoice.value;

  const itemToAdd = {
      id: productId,
      color: colorValue,
      qty: qtyValue,
    }
    console.log(itemToAdd);
  
    
  let isCartEmpty = cart == 0;
  if (isCartEmpty) {
    //add to cart 
      cart.push(itemToAdd); 
    //save to cart
      window.localStorage.setItem('cart',JSON.stringify(cart));
      console.log(cart);
    } // if cart is not empty update the item qty in cart 
  else {
    let foundExactItem = false; // boolean flad
    for (let i = 0; i < cart.length; i++) {
      const sameExactItem = cart[i].id === itemToAdd.id && cart[i].color === itemToAdd.color;
      if (sameExactItem){ 
        foundExactItem = true;
        cart[i].qty++;// update and add from user input qty.
        window.localStorage.setItem('cart',JSON.stringify(cart));
      } 
    }
    //if i didnt find the same exact item
    //push item to add to cart
    if(!foundExactItem) {
      cart.push(itemToAdd);
      window.localStorage.setItem('cart',JSON.stringify(cart));
    }
    
  }
  
  }); 
  