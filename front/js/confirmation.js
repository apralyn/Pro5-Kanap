const confirmationUrl = window.location.href;
const newUrl = new URL(confirmationUrl);
const orderId = newUrl.searchParams.get("orderId");

//Displaying the order number
document.getElementById("orderId").innerText = orderId;
