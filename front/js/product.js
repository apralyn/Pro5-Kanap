
// create a function displaySingleProduct(id)
// this function will retrieve the id from url
// and then process the rest api and update the view//insert DOM product.html page

// --------------------- URLSearchParams

//to show the current url of the specific product stored in productUrl variable.
const productUrl = window.location.href;
console.log(productUrl); // current page URL

//what does this specificically do
//I know that the [new URL] is an object
// which means I can access methods inside new URL object specifically the searchparam.
const newProductUrl = new URL(productUrl);
console.log(newProductUrl);

// this productUrlId variable is where I can find the specific product ID's of each item.
const productUrlId = newProductUrl.searchParams.get('id');
console.log(productUrlId);

// I got the rest of the product data from the API using fetch
fetch ("http://localhost:3000/api/products/" + productUrlId)
  .then ((data) => {
    return data.json();
  }).then ((product) => {
    console.log(product);

    //populate the item details in this area from the API to show in the product page.
  function displaySingleProduct(product) {
  
  // //for produc t title
     let productTitle = document.getElementById('title').innerHTML = product.name;
     let productPrice = document.getElementById('price').innerHTML = product.price;
     let productDescription = document.getElementById('description').innerHTML = product.description;
     
     //need to figure out how to display the color selection
     
     //access to the color data from API
     //color loop
      for (let colors of product.colors) {
      const productColor = document.querySelector('#colors');
      const colorOption = document.createElement('option');
      colorOption.setAttribute('value', product.colors);
      productColor.appendChild(colorOption);
      colorOption.innerHTML = product.colors;
        
      }


    

      // // i need to grab the parent element
      const productItem = document.querySelector('.item__img');
        // // i need to create an img element
      const productImg = document.createElement('img');
        // // i need to append the new element to the parent.
      productImg.setAttribute('src', product.imageUrl);
      productImg.setAttribute('alt', product.altTxt);
      productItem.appendChild(productImg);

   }
   displaySingleProduct(product);

   for (let item of product) {
      displaySingleProduct(item);
    }
  })

       // // i need to append the new element to the parent.
  //  productColor.setAttribute('value', product.imageUrl);
  //  productImg.setAttribute('alt', product.altTxt);