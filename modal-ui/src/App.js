import { useDisclosure } from '@chakra-ui/react';

import { AppContext } from './AppContext';

import * as React from 'react';

import { dummyPayload } from './assets/mock';
import CheckoutModal from './containers/CheckoutModal';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //checkout data
  const [cartData, setCartData] = React.useState();
  const [merchantKey, setMerchantKey] = React.useState();
  const [currentScreen, setCurrentScreen] = React.useState('first');
  const [currencySymbol, setCurrencySymbol] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [shippingMethods, setShippingMethods] = React.useState();
  const [formData, setFormData] = React.useState({
    fullName: '',
    phoneNo: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    shippingMethod: '',
  });
  const [callbackUrl, setCallbackUrl] = React.useState();
  //spreedly
  const [gatewayTokens, setGatewayTokens] = React.useState();
  const [spreedlyEnvKey, setEnvKey] = React.useState();
  //cached data
  const [cache, setCache] = React.useState();

  //payment
  const [stripeConfig, setStripeConfig] = React.useState();
  const [clientSecret, setSecret] = React.useState();

  const mounted = React.useRef(false);

  window['openVeryFastModal'] = payload => {
    mounted.current = true;

    // console.log('payload ', payload);

    let cart = payload?.cart?.data;
    let merchantApiKey = payload?.merchantApiKey;
    let currencySymbol = payload?.currencySymbol;
    let currency = payload?.currency;
    let shipping_methods = payload?.shipping_methods;
    let callback_url = payload?.callback_url;

    if (!payload) {
      cart = dummyPayload?.cart.data;
      merchantApiKey = dummyPayload?.merchantApiKey;
      currencySymbol = dummyPayload?.currencySymbol;
      currency = dummyPayload?.currency;
      shipping_methods = dummyPayload?.shipping_methods;
      callback_url = dummyPayload?.callback_url;
    }

    setCartData(cart);
    setMerchantKey(merchantApiKey);
    setCurrencySymbol(currencySymbol);
    setCurrency(currency);
    setShippingMethods(shipping_methods);
    setCallbackUrl(callback_url);

    onOpen();
  };

  return (
    <>
      <AppContext.Provider
        value={{
          cartData,
          shippingMethods,
          //
          setCurrentScreen,
          //
          currency,
          currentScreen,
          merchantKey,
          currencySymbol,
          callbackUrl,
          //
          clientSecret,
          stripeConfig,
          //
          formData,
          setFormData,
          //
          gatewayTokens,
          setGatewayTokens,
          //
          spreedlyEnvKey,
          setEnvKey,
          //
          cache,
          setCache,
        }}
      >
        <CheckoutModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </AppContext.Provider>
    </>
  );
}

export default App;
