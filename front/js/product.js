// create a function displaySingleProduct(id)
// this function will retrieve the id from url
// and then process the rest api and update the view//insert DOM product.html page

// URLSearchParams
let productUrl = window.location.href;
console.log(productUrl); // current page URL

let newProductUrl = new URL(productUrl);
console.log(newProductUrl);

let productUrlId = newProductUrl.searchParams.get('id');
console.log(productUrlId);

//fetch
fetch("http://localhost:3000/api/products/")
    .then ((data) => { // data is returned as json format
      return data.json();  
  }).then ((products) => { // products contains all the data from the API
    console.log(products);

//looping each products
    for(let product of products) {
      // console.log(product);
      displaySingleProduct(product);
  }
  //function to display each products (DOM)  
function displaySingleProduct(id) {
  
  //for product image   
     let productImg = document.createElement('img');
     document.querySelector('.item__img').appendChild(productImg);
     productImg.setAttribute('src' + products.imageUrl, 'alt' + products.altTxt)
 
  //for product title
     let productTitle = document.getElementById('title').innerHTML = products.name;
     let productPrice = document.getElementById('price').innerHTML = products.price;
     let productDescription = document.getElementById('description').innerHTML = products.description;
     let productColors = document.getElementById('color').innerHTML = products.colors;

   }
   displaySingleProduct(id);
  
}


