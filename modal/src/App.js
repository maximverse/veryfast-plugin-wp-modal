import React, { useRef, useState } from "react";
import classes from "./newCheckout.module.css";

import "./styles.css";

// BODY COMPONENTS
import Header from "./components/Header/Header.js";
import MainForm from "./containers";
import { AppContext } from "./context/AppContext";
//

import { dummyPayload } from "./assets/mock";
import { Transition } from "@headlessui/react";

import Select from "react-select";

export default function App() {
  // payment
  const [showModal, setShowModal] = React.useState(false);

  const appContext = React.useContext(AppContext);

  const {
    setCartData,
    setMerchantKey,
    setCurrencySymbol,
    setCurrency,
    setShippingMethods,
    setCallbackUrl,
  } = appContext;

  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted) return;
    setupModal();
  }, []);

  window["openVeryFastModal"] = (payload) => {
    setupModal(payload);
  };

  const setupModal = (payload) => {
    mounted.current = true;

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

    setShowModal(true);
  };

  return (
    <Transition
      show={showModal}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes.App}>
        <div className={classes.screen}>
          <div className={classes.bg}>
            <Header />
            <MainForm />
          </div>
        </div>
      </div>
    </Transition>
  );
}
