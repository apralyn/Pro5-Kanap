//Milestone 11
//TODO grab the orderId from URL using search params. (check product.js for reference)
 const confirmationUrl = window.location.href;
 const newUrl = new URL(confirmationUrl);
 const orderId = newUrl.searchParams.get("orderId");
 console.log(confirmationUrl, newUrl, orderId);

//TODO line 49 put order ID
document.getElementById("orderId").innerText = orderId;


