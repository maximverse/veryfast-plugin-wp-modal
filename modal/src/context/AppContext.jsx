import * as React from "react";

export const AppContext = React.createContext();

const AppContextFC = (props) => {
  const [cartData, setCartData] = React.useState();
  const [merchantKey, setMerchantKey] = React.useState();
  const [currentScreen, setCurrentScreen] = React.useState("first");
  const [currencySymbol, setCurrencySymbol] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [shippingMethods, setShippingMethods] = React.useState();
  const [formData, setFormData] = React.useState({
    fullName: "John Doe",
    phoneNo: "+373 611 44 210",
    email: "test@test.com",
    cardCvv: "953",
    address: "",
    postalCode: "MD-2000",
    city: "Chisinau",
    state: "Los Santos",
    country: "",
    address1: "5th Ave",
    address2: "110",
    //
    shippingMethod: "",
  });
  const [callbackUrl, setCallbackUrl] = React.useState();
  //spreedly
  const [gatewayTokens, setGatewayTokens] = React.useState();
  const [spreedlyEnvKey, setEnvKey] = React.useState();
  //cached data
  const [cache, setCache] = React.useState();

  return (
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
        //
        setCartData,
        setMerchantKey,
        setCurrencySymbol,
        setCurrency,
        setShippingMethods,
        setCallbackUrl,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextFC;
