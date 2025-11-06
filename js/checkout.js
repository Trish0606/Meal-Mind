// Initialize Stripe with your publishable key
const stripe = Stripe("pk_test_51SQJhTIo2XN3JEm9ASC0GAgQOdP46epjzhVLN5RIUp2PXkFmTQxtXvJVhAgtVFGUlRcSwnd4gKEZzWKAqW2CNuFT00lkAR6XaL"); // <-- REPLACE with your actual key

// Get the checkout button by its ID
const checkoutButton = document.getElementById("checkout-button");

// Add click event listener
checkoutButton.addEventListener("click", function () {
  // Call backend API to create checkout session
  fetch("/api/create-checkout-session.js", {
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
        // Display any error from Stripe
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Checkout failed. Please try again.");
    });
});
