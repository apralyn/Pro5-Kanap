// create a function displaySingleProduct(id)
// this function will retrieve the id from url
// and then process the rest api and update the view of single-product.html page

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
