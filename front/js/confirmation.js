//Milestone 11
//TODO grab ID from URL using search params. (check product.js for reference)
const url = window.location.href;
const newUrl = new URL(url);
const grabId = newUrl.searchParams.get("id");
console.log(url, newUrl, grabId);
//TODO line 49 put order ID
const hello = (document.getElementById("orderID").innerText = grabId);
console.log(hello);
