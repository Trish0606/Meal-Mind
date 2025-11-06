// Initialize Stripe with your publishable key
const stripe = Stripe(pk_test_51SQJhTIo2XN3JEm9ASC0GAgQOdP46epjzhVLN5RIUp2PXkFmTQxtXvJVhAgtVFGUlRcSwnd4gKEZzWKAqW2CNuFT00lkAR6XaL);

// Find the checkout button
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", function () {
  fetch("/api/create-checkout-session.js", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((session) => {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
