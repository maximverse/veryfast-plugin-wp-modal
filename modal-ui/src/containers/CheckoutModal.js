import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  useDisclosure,
  Fade,
  Slide,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';

import CheckoutStep2 from '../components/CheckoutStep2';
import Checkout from '../components/Checkout';

import * as React from 'react';

import { AppContext } from '../AppContext';
import useExternalScripts from '../hooks/useExternalScripts';

import axios from 'axios';

function CheckoutModal(props) {
  const { isOpen, onOpen, onClose } = props;

  const Spreedly = window['Spreedly'];
  const toast = useToast();
  const appContext = React.useContext(AppContext);
  const {
    setCurrentScreen,
    currentScreen,
    merchantKey,
    setCache,
    setEnvKey,
    setFormData,
    shippingMethods,
  } = appContext;

  useExternalScripts({
    url: 'https://core.spreedly.com/iframe/iframe-v1.min.js',
  });

  React.useEffect(() => {
    if (merchantKey) {
      getGatewayData();
      getCustomerData();
    }
  }, [merchantKey]);

  const getGatewayData = async () => {
    const url = 'http://localhost:5000/public/payment/get-gateway';
    const data = {
      key: merchantKey,
      type: 'stripe',
    };
    const res = await axios.post(url, data);
    if (res?.data) {
      // setGatewayTokens(res?.data?.gateway);
      setEnvKey(res?.data?.spreedlyEnvKey);
    }
    if (res?.error) {
      toast({
        title: 'Error retrieving payment gateway',
        status: 'error',
        isClosable: true,
      });
    }
  };

  /**
   * @description
   * a function to check if customer has any stored data in browser and server
   */
  const getCustomerData = async () => {
    const localCustomerData = JSON.parse(
      localStorage.getItem('vf_customer_data')
    );

    const customerEmail = localCustomerData?.email;

    const url = 'http://localhost:5000/public/customer/get';
    const data = {
      key: merchantKey,
      email: customerEmail,
    };
    const res = await axios.post(url, data);
    if (res?.data) {
      // console.log('res data ', res?.data);
      const customer = res?.data?.customer;

      //make shipping method string
      const shippingMethod = generateShippingMethodString(
        customer?.metadata?.shipping
      );

      const formCache = {
        fullName: `${customer?.firstName} ${customer?.lastName}`,
        phoneNo: customer?.phone,
        email: customer?.email,
        address: customer?.address,
        postalCode: customer?.metadata?.postalCode,
        city: customer?.metadata?.city,
        state: customer?.state,
        country: customer?.country,
        shippingMethod: shippingMethod,
      };
      setCache({
        form: formCache,
        paymentMethod: customer?.paymentMethod,
        last4: customer?.last4,
        cardType: customer?.cardType,
      });

      setFormData(formCache);

      console.log('form cache ', {
        form: formCache,
        paymentMethod: customer?.paymentMethod,
        last4: customer?.last4,
        cardType: customer?.cardType,
      });

      //change screen to payment screen
      // setCurrentScreen('second');
    }
    if (res?.error) {
      toast({
        title: 'Error retrieving cached information',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const generateShippingMethodString = methodObj => {
    if (!methodObj) return;
    let stringVal = '';

    //method id is unique therefore can be used to search for the zone
    const method_id = methodObj?.method_id;

    for (let zone_id in shippingMethods) {
      let zone = shippingMethods[zone_id];

      for (let loop_method_id in zone['methods']) {
        if (loop_method_id == method_id) {
          stringVal = `${zone_id}_${method_id}`;
          return stringVal;
        }
      }
    }
  };

  const screens = {
    first: {
      component: <Checkout />,
    },
    second: {
      component: <CheckoutStep2 />,
    },
  };

  const renderCurrentScreen = () => {
    return screens[currentScreen].component;
  };

  return (
    <>
      <Modal
        // isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text fontWeight="bold">
              {currentScreen == 'first' && 'Your Order'}
              {currentScreen == 'second' && 'Payment'}
            </Text>
          </ModalHeader>
          {currentScreen == 'first' && <ModalCloseButton />}
          <ModalBody pb={6}>
            <Fade in={true}>{renderCurrentScreen()}</Fade>
          </ModalBody>

          <ModalFooter>
            {currentScreen == 'first' && (
              <Stack>
                <Center>
                  <Button
                    onClick={onClose}
                    fontSize={'sm'}
                    fontWeight="500"
                    variant="link"
                  >
                    Exit checkout
                  </Button>
                </Center>
              </Stack>
            )}
            {currentScreen == 'second' && (
              <Button onClick={() => setCurrentScreen('first')}>Go back</Button>
            )}
            {/* <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CheckoutModal;
