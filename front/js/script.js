// Fetch the data from API
fetch ('http://localhost:3000/api/products')

// once the data is received [data is returned as a json format]
  .then ((data) => {
    return data.json();

// I can use use the data of the products to get inserted into the DOM   
  }) .then ((products) => { //name of the array data is called products
    console.log(products); // This will display the product data  in Array into the console
    
    // Place code here to insert the data into the DOM //
    
    // Step 1.2:  Use loop to createElement all product items.
                  // Figure out how the for of loop works
                  // How do you want the loop to work?
                  // I want the count through the whole array. I want to move and show all these objects
                  //counting with an index to address every element in the array. In order of the array. do something to every element. no counter needed
                  // for products is a name that represents every element in the array


    // for(let allProducts of products) {
    //   console.log(allProducts);
    // }
    
    
    /* html reference
    <section class="items" id="items"> 
      <a href="./product.html?id=42">
          <article>
            <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">Kanap name1</h3>
            <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
          </article>
      </a>
    </section>
    */

    // Create the cards

    // <section> is the parent element - capture as reference to where you want to place the product cards
    //grab the parent
    const parentElement = document.getElementById ('items') // parent of productCard element.
    
    // i want to create a link in the parent.
    //create the child element
    const productCardLink = document.createElement ('a');//need the correct input
    // added id in a
    //optional add id to the child
    productCardLink.setAttribute('id','card-one');
     //append the a in parent
     //append child element to the parent
     items.appendChild(productCardLink);

    //inside A need to create an Article
    //grab the parent
    const parentA = document.getElementById('card-one');
    //create the child
    const productCard = document.createElement ('article');
    //append to the parent
    parentA.appendChild(productCard);



    
    
    // const productImg = document.createElement ('img'); //need correct input
    // const productName = document.createElement('h3');
    // const productDescription = document.createElement('p');

   
    
    a.appendChild(productCard);
    a.appendChild(productImg);
    a.appendChild(productName);
    a.appendChild(productDescription);









    // const prodName = document.getElementById('product-name');
    // prodName.innerHTML = products[0].name;


  }) .catch((error) => {
    console.log(error);
  })