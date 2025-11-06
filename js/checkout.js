// 1️⃣ Initialize Stripe with your actual publishable key
const stripe = Stripe(pk_test_51SQJhTIo2XN3JEm9ASC0GAgQOdP46epjzhVLN5RIUp2PXkFmTQxtXvJVhAgtVFGUlRcSwnd4gKEZzWKAqW2CNuFT00lkAR6XaL); // <-- REPLACE with your key

// 2️⃣ Grab the checkout button from the page
const checkoutButton = document.getElementById("checkout-button");

// 3️⃣ Add click event to trigger checkout
checkoutButton.addEventListener("click", async () => {
  try {
    // Call your backend to create a checkout session
    const response = await fetch("/api/create-checkout-session.js", {
      method: "POST",
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Show any error to the user
      alert(result.error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Checkout failed. Please try again.");
  }
});
