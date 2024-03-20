// This is your test publishable API key.
const stripe = Stripe("pk_test_51OwCkZ1kA2SSqpYgmVTW1IvsQALqS5hGMPdu9a4d8fWUAtjOA1pfkyfrKnPdTIkGrEylRDcjSY6auUcENve1d3vv000xIyQbk6");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
  const response = await fetch("/create-checkout-session", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}