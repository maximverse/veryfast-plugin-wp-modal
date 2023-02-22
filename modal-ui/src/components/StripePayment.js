import * as React from 'react';

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, useColorModeValue } from '@chakra-ui/react';

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* <button disabled={!stripe}>Submit</button> */}
      <Button
        bgColor={useColorModeValue('gray.700', 'blue.800')}
        borderRadius="md"
        variant="primary"
        fontWeight={'normal'}
        type="submit"
        mt="2"
      >
        Checkout
      </Button>
    </form>
  );
}

const StripePayment = props => {
  const clientSecret = props?.clientSecret;
  const stripePromise = props?.stripePromise;
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment;
