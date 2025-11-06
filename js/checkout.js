// Initialize Stripe with your publishable key
const stripe = Stripe("pk_test_51SQJhTIo2XN3JEm9ASC0GAgQOdP46epjzhVLN5RIUp2PXkFmTQxtXvJVhAgtVFGUlRcSwnd4gKEZzWKAqW2CNuFT00lkAR6XaL"); // <-- keep quotes!

// Grab the checkout button
const checkoutButton = document.getElementById("checkout-button");

// Add click event listener
checkoutButton.addEventListener("click", function () {
  // Corrected: remove the .js from the API path
  fetch("/api/create-checkout-session", {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      // Redirect to Stripe Checkout
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
           if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Checkout failed. Please try again.");
    });
});


