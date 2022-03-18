// Request data from API
fetch ('http://localhost:3000/api/products')
  .then ((data) => { // data is returned as json format
    return data.json();  
  }) .then ((products) => { // products contains all the data from the API
    console.log(products);
  
    for(let product of products) {
      // console.log(product);
      createCard(product);
    }

    function createCard(product) { 
  
    //create <a> element 
    const productSection = document.querySelector ('#items');
    const productCardLink = document.createElement ('a');
    productCardLink.setAttribute( 'href', './product.html?id=' + product._id );
    items.appendChild(productCardLink);

    //create <article> element
    const productCard = document.createElement ('article');
    productCardLink.appendChild(productCard);

    //create <img>
      const productImg = document.createElement('img');
      productImg.setAttribute('src', product.imageUrl);
      productCard.appendChild(productImg);
    //create <h3>
      const productName = document.createElement('h3');
      productName.classList.add('productName');
      productCard.appendChild(productName).innerHTML = product.name;
    //create <p>
      const productDescription = document.createElement('p');
      productDescription.classList.add('productDescription');
      productCard.appendChild(productDescription).innerHTML = product.description;
    }
    createCard();

  // }) .catch((error) => { console.log(error);
  })

  // URLSearchParams

    let url = window.location.href;
    let newURL = new URL('http://localhost:3000/api/products');
    let id = newURL.searchParams.get('id');
    let price = newURL.searchParams.get('price');

//milestone4 *references*


//url params video : https://www.youtube.com/watch?v=RIBiQ5GNYWo&list=PLbDntKp6_n0cPCD8onXAHpq8ACmDBHcl3&index=5
/* to get the current page of the url(object)
let productUrl = new URL(window.location.href); //give the url of the current page
*/
/* what does window.location.href do
a property that will tell you the current URL location of the browser. 
Changing the value of the property will redirect the page.
*/

//pseudo code for Todo #2 on mentor demo
// create a function displaySingleProduct(id)
//retrieve the product ID
//create url variable
//create an insstance of xmlHTTP?? - need to check
//call the get api ()
// retrieve the response if successful
//update the HTML DOM of single-product page
//with the response
//remember to use JSON.parse()

/*  let url = window.location.href;
    let newURL = new URL('http://localhost:3000/api/products');
    let id = newURL.searchParams.get('id');
    let price = newURL.searchParams.get('price');
*/
  