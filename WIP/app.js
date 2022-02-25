document.body.style.background = "#F0DDBC";

// TODO--01 fetch(use async/await) the data from the API
// function this
async function loadData() {
  const response = await fetch ('http://localhost:3000/api/products')
  const data = await response.json()
  showProductsData(data)
}
loadData()

//TODO--02 created parent and child div using the DOM
// can I function this?

//TODO--02.1
//add an element to the dom where you can place just one product[0] in
// locate the parent where i need to add a new element(div) for my productOne (body is the parent element)
const body = document.querySelector('body');
// create a new div to the DOM
let newDiv = document.createElement('div');
//add a class name to newDiv called productOne
newDiv.classList.add('parentDiv');
//give the parentDiv an ID so I know this is the parent div.
newDiv.setAttribute('id', 'allProducts');
//add the newDiv to the parent(body)
body.appendChild(newDiv);

//TODO--02.2
//create new div(childOne-productOne) inside the parent div(allProduct)
//locate the parent div(allProducts)
const parentDiv = document.getElementById('allProducts');
// create child number one inside the parent div
let divOne = document.createElement('div')
//give it a class name
divOne.classList.add('divChildOne');
//give it an ID
divOne.setAttribute('id','productOne');
//add divChildOne to the parent div in the DOM
allProducts.appendChild(divOne);





//TODO--03 Use the data from the API to display in the DOM
// function
function showProductsData(productData){ 
  document.getElementById('allProducts').innerHTML = `
  ${Object.keys(productData).map(function (product) {
    return `
      <div>${product}</div>
   `
  }).join('')}
  `
}
showProductsData()