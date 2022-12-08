// all products data from API
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    console.log(products);

    //loop to show each of the product cards
    for (let product of products) {
      createCard(product);
    }
  });


function createCard(product) {
  //<a> element
  const productSection = document.querySelector("#items");
  const productCardLink = document.createElement("a");
  productCardLink.setAttribute("href", "./product.html?id=" + product._id);
  items.appendChild(productCardLink);

  //<article> element
  const productCard = document.createElement("article");
  productCardLink.appendChild(productCard);

  //<img> element
  const productImg = document.createElement("img");
  productImg.setAttribute("src", product.imageUrl);
  productCard.appendChild(productImg);

  //<h3> element
  const productName = document.createElement("h3");
  productName.classList.add("productName");
  productCard.appendChild(productName).innerHTML = product.name;

  //<p> element
  const productDescription = document.createElement("p");
  productDescription.classList.add("productDescription");
  productCard.appendChild(productDescription).innerHTML = product.description;
}
