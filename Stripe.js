// client-side (browser) example using Stripe.js
const stripe = Stripe('pk_test_...'); 

const result = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement, // stripe element
    billing_details: { name: userName, email: userEmail }
  }
});

if (result.error) {
  // show error to customer
} else {
  if (result.paymentIntent.status === 'succeeded') {
    // payment successful
  }
}