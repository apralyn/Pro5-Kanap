document.body.style.background = "blue";

// working fetch
fetch ('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => console.log(data));

//add an element to the dom where you can place just one product[0] in
// i need to locate the parent where i need to add a new element for my productOne (body is the parent element)
const body = document.querySelector('body'); //this is locating the parent
// create a new div to the DOM
let newDiv = document.createElement('div');
//add a classname to newDiv called productOne
newDiv.classList.add('parentDiv');
//give it parentDiv as an ID so I know this is the parent div.
newDiv.setAttribute('id', 'allProducts');
//add the newDiv to the parent
body.appendChild(newDiv);


//I want to create a new div(childOne-productOne) inside the parent div(allProduct)

//locate the parent div(allProducts)
const parentDiv = document.getElementById('allProducts');
// create a new child number one in the parent div
let divOne = document.createElement('div')
//add a class name to div number one
divOne.classList.add('divChildOne');
//give it an ID as product one as this would be the area to place the first product
divOne.setAttribute('id','productOne');
//add divChildOne to the parent div in the DOM
allProducts.appendChild(divOne);

//need to figure out how to fetch productOne from API
//watch ANIA KUBOW promise video