import {
  Image,
  Box,
  Stack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
  RadioGroup,
  Radio,
  Input,
  useToast,
  Spinner,
} from '@chakra-ui/react';

import * as React from 'react';

import { AppContext } from '../AppContext';

import SpreedlyForm from './SpreedlyForm';

import axios from 'axios';

const CheckoutStep2 = () => {
  const {
    cartData,
    currencySymbol,
    formData,
    shippingMethods,
    merchantKey,
    gatewayTokens,
    currency,
    spreedlyEnvKey,
    callbackUrl,
    cache,
  } = React.useContext(AppContext);

  const [paymentLoading, setPaymentLoading] = React.useState(false);
  const [useCachedCard, setUseCacheCard] = React.useState(false);

  const toast = useToast();

  const Spreedly = window['Spreedly'];

  const selectedShipping = React.useMemo(() => {
    const shipping = formData?.shippingMethod.split('_');
    //
    if (shipping?.length < 1) return;

    const zone_id = shipping[0];
    const method_id = shipping[1];

    const selectedZone = shippingMethods[zone_id];
    let selectedMethod = selectedZone?.['methods'][method_id];
    if (isNaN(parseFloat(selectedMethod?.['cost']))) {
      selectedMethod = {
        ...selectedMethod,
        cost: 0,
      };
    }
    return selectedMethod;
  }, [formData]);

  const totalPrice = React.useMemo(() => {
    const cartItemsKeys = Object.keys(cartData);
    const line_subtotal = cartItemsKeys.map(key => {
      const item = cartData[key];
      return item.line_subtotal;
    });

    const sum = line_subtotal.reduce((a, v) => a + v, 0);
    return sum;
  }, [cartData]);

  const totalWithShipping =
    parseFloat(totalPrice) + parseFloat(selectedShipping?.cost);

  const colorModeGrey = useColorModeValue('gray.900', 'gray.900');

  const spreedlyInited = React.useRef(false);

  React.useEffect(() => {
    if (spreedlyInited.current) return;
    //initialize spreedly only if env key has been retrieved from server
    if (spreedlyEnvKey) {
      initSpreedly();

      spreedlyInited.current = true;
    }
  }, [gatewayTokens]);

  React.useState(() => {
    //
    if (cache) {
      setUseCacheCard(true);
    }
  }, [cache]);

  const initSpreedly = () => {
    Spreedly.init(spreedlyEnvKey, {
      numberEl: 'spreedly-number',
      cvvEl: 'spreedly-cvv',
    });

    //attach error listener
    Spreedly.on('errors', function (errors) {
      for (let i = 0; i < errors.length; i++) {
        let error = errors[i];
        toast({
          title: error?.message,
          status: 'error',
          isClosable: true,
        });
      }
    });

    //listen for successful payment method tokenization
    Spreedly.on('paymentMethod', function (token, pmData) {
      chargePayment(token);
    });

    //listen for successful cache
    Spreedly.on('recacheReady', function (event) {
      console.log('event recache ', event);
    });
  };

  const chargePayment = async token => {
    setPaymentLoading(true);
    const fullName = formData.fullName;
    const names = fullName?.split(' ');

    let products = [];

    for (let key in cartData) {
      const item = cartData[key];

      products.push({
        id: item?.product_id,
        name: item?.product?.name,
        quantity: item?.quantity,
        variation_id: item?.variation_id,
        line_total: item?.line_total,
      });
    }

    const url = 'http://localhost:5000/public/payment/charge-payment';
    const data = {
      key: merchantKey,
      currency: currency,
      amount: totalWithShipping,
      payment_method: token,
      billing_details: {
        firstName: names[0],
        lastName: names.length > 1 ? names[1] : '',
        email: formData.email,
        country: formData.country,
        state: formData.state,
        address: formData.address,
        phone: formData.phoneNo,
        postalCode: formData?.postalCode,
        city: formData?.city,
      },
      callbackUrl: callbackUrl,
      products: products,
      shipping: selectedShipping,
    };

    const res = await axios.post(url, data);
    if (res?.data) {
      console.log('Payment Charged successfully ', res?.data);
      toast({
        title: 'Payment successful',
        status: 'success',
        isClosable: true,
      });

      //store customer email in localStorage for future reference
      const customerData = JSON.stringify({
        email: formData?.email,
      });

      localStorage.setItem('vf_customer_data', customerData);
    }

    if (res?.error) {
      toast({
        title: 'Error charging payment',
        status: 'error',
        isClosable: true,
      });
    }

    setPaymentLoading(false);
  };

  const submitPayment = ({ values }) => {
    const { month, year } = values;
    const fullName = formData.fullName;

    const requiredFields = {
      month,
      year,
      full_name: fullName,
    };

    Spreedly.tokenizeCreditCard(requiredFields);
  };

  const renderCartItems = () => {
    if (!cartData) return;
    const cartItemsKeys = Object.keys(cartData);
    return (
      <div>
        {cartItemsKeys.map(key => {
          const item = cartData[key];
          return (
            <HStack key={key} mb="2">
              <Image
                borderRadius="md"
                boxSize="96px"
                src={item?.product?.image_url}
                alt="Dan Abramov"
              />
              <Stack pl="3" ml="3">
                <Text fontWeight="bold">{item?.product?.name}</Text>
                {/* <Text mt="4" fontSize="sm" color="muted">
                  Variant:{' '}
                  <Text fontWeight={'semibold'} color={colorModeGrey} as="span">
                    Caramel
                  </Text>
                </Text> */}
                <Text fontSize="sm" color="muted">
                  Price:{' '}
                  <Text fontWeight={'semibold'} color={colorModeGrey} as="span">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item?.currency_symbol,
                      }}
                    />
                    {item?.product?.price}
                  </Text>
                </Text>
                <Text fontSize="sm" color="muted">
                  Quantity:{' '}
                  <Text fontWeight={'semibold'} color={colorModeGrey} as="span">
                    {item?.quantity}
                  </Text>
                </Text>
                <Text fontSize="sm" color="muted">
                  SubTotal:{' '}
                  <Text fontWeight={'semibold'} color={colorModeGrey} as="span">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item?.currency_symbol,
                      }}
                    />
                    {item?.line_subtotal}
                  </Text>
                </Text>
              </Stack>
            </HStack>
          );
        })}
      </div>
    );
  };

  const renderBillingDetails = () => {
    return (
      <Stack id="shipping">
        <Text mt="1" fontSize="sm" fontWeight="bold">
          Delivery address
        </Text>
        <Stack>
          <Text fontSize="sm" color="muted">
            {formData?.address}
          </Text>
          <Text fontSize="sm" color="muted">
            {formData?.state}
          </Text>
          <Text fontSize="sm" color="muted">
            {formData?.country}
          </Text>
        </Stack>
      </Stack>
    );
  };

  const renderPaymentMethods = () => {
    return (
      <Stack id="payment">
        <Text mt="1" fontSize="sm" fontWeight="bold">
          Payment method
        </Text>

        <RadioGroup>
          <HStack direction="row">
            {/* <Button variant="secondary">
              <Radio width="48" colorScheme="gray" value="1">
                Apple Pay
              </Radio>
            </Button> */}
            <Button variant="secondary">
              <Radio defaultChecked width="60" colorScheme="gray">
                <Text>Stripe Payment gateway</Text>
              </Radio>
            </Button>
          </HStack>
        </RadioGroup>
      </Stack>
    );
  };

  return (
    <Box>
      <Stack spacing={{ base: '2', md: '3' }}>
        <Text fontWeight="bold" fontSize="sm">
          {' '}
          Your order{' '}
        </Text>
        {renderCartItems()}
        <Divider />

        <Stack id="subtotal">
          <HStack mt="1" justify="space-between">
            <Text fontSize="sm" color="muted">
              Subtotal:{' '}
            </Text>
            <Text
              fontSize="sm"
              fontWeight={'regular'}
              color={useColorModeValue('black', 'black')}
              as="span"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: currencySymbol,
                }}
              />
              {totalPrice}
            </Text>
          </HStack>
          <HStack mt="4" justify="space-between">
            <Text fontSize="sm" color="muted">
              Shipping & handling:{' '}
            </Text>
            <Text
              fontSize="sm"
              fontWeight={'regular'}
              color={useColorModeValue('black', 'black')}
              as="span"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: currencySymbol,
                }}
              />
              {selectedShipping?.cost}
            </Text>
          </HStack>
          <HStack mt="4" justify="space-between">
            <Text color={colorModeGrey} fontWeight={'bold'} fontSize="sm">
              Total:{' '}
            </Text>
            <Text
              fontSize="sm"
              fontWeight={'bold'}
              color={useColorModeValue('gray.900', 'gray.900')}
              as="span"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: currencySymbol,
                }}
              />
              {totalWithShipping}
            </Text>
          </HStack>
        </Stack>

        <Divider />

        {renderBillingDetails()}

        <Divider />

        {renderPaymentMethods()}

        <Divider />
        {paymentLoading && <Spinner alignSelf={'center'} size="md" />}
        <SpreedlyForm hide={useCachedCard} submitPaymentForm={submitPayment} />

        {useCachedCard ? (
          <HStack spacing={'20px'}>
            <Button
              colorScheme="teal"
              size="sm"
              id="submit-button"
              type="submit"
              onClick={() => {
                chargePayment(cache?.paymentMethod);
              }}
            >
              Pay with card ending in {cache?.last4}
            </Button>
            <Button
              // colorScheme="teal"
              size="sm"
              id="submit-button"
              type="submit"
              onClick={() => setUseCacheCard(false)}
            >
              Enter new card
            </Button>
          </HStack>
        ) : undefined}
      </Stack>
    </Box>
  );
};

export default CheckoutStep2;
