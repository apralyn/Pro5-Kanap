// Request data from API
fetch ('http://localhost:3000/api/products')
  .then ((data) => { // data is returned as json format
    return data.json();  
  }) .then ((products) => { // products contains all the data from the API
    console.log(products);
  
    for(let product of products) {
      console.log(product);
      createCard(product);
    }

  function createCard(product) { 
  
    //create <a> element 
  const productSection = document.querySelector ('#items');
  const productCardLink = document.createElement ('a');
  productCardLink.setAttribute( 'href', 'item.html?id=' + product._id );
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

  }) .catch((error) => {console.log(error);})