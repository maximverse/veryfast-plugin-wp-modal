import React, { useRef, useState } from "react";
import newCheckout from "./Header.module.css";
import Cart from "../Cart/Cart";
import Closed from "../Cart/Closed";
import Opened from "../Cart/Opened";
import { useSpring, animated } from "react-spring";
import "../../styles.css";
//
import { AppContext } from "../../context/AppContext";

export default function App({ stateChanger, ...rest }) {
  const { cartData, currencySymbol, formData, shippingMethods } =
    React.useContext(AppContext);

  const selectedShipping = React.useMemo(() => {
    const shipping = formData?.shippingMethod.split("_");
    //
    if (shipping?.length < 1) return;

    const zone_id = shipping[0];
    const method_id = shipping[1];

    const selectedZone = shippingMethods[zone_id];
    let selectedMethod = selectedZone?.["methods"][method_id];
    if (isNaN(parseFloat(selectedMethod?.["cost"]))) {
      selectedMethod = {
        ...selectedMethod,
        cost: 0,
      };
    }
    return selectedMethod;
  }, [formData]);

  const totalPrice = React.useMemo(() => {
    const cartItemsKeys = Object.keys(cartData);
    const line_subtotal = cartItemsKeys.map((key) => {
      const item = cartData[key];
      return item.line_subtotal;
    });

    const sum = line_subtotal.reduce((a, v) => a + v, 0);
    return sum;
  }, [cartData]);

  const totalWithShipping =
    parseFloat(totalPrice) + parseFloat(selectedShipping?.cost);

  const [cartOpened, setIsCartOpened] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const handleCart = () => {
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        setIsCartOpened(false);
      }, 200);
    } else {
      setIsVisible(true);
      setIsCartOpened(true);
    }
  };

  const springProps = useSpring({
    height: isVisible ? "auto" : 0,
    opacity: isVisible ? 1 : 0,
  });

  // copy

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCartOpened(false);
    stateChanger("loading");
    setTimeout(() => {
      stateChanger(2);
    }, 2500);
  };

  return (
    <div className={newCheckout.container}>
      {cartOpened ? (
        <animated.div style={springProps}>
          <Cart />
        </animated.div>
      ) : (
        <animated.div style={springProps}>
          <div></div>
        </animated.div>
      )}
      {/* {cartOpened && <Cart />} */}
      <div className={newCheckout.MainContainer}>
        <div className={newCheckout.merchantHeader}>
          {/* {`merchantName ${cartOpened && `blur`}`} */}
          <span
            className={`${newCheckout.merchantName} ${
              cartOpened && newCheckout.blur
            }`}
          >
            Kitchen&More{" "}
            <span className="">
              <svg
                className={newCheckout.checkMark}
                preserveAspectRatio="none"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.4975 4.99521C12.107 4.60468 11.4738 4.60468 11.0833 4.99521L7 9.08579L5.20711 7.29289C4.81658 6.90237 4.18342 6.90237 3.79289 7.29289C3.40237 7.68342 3.40237 8.31658 3.79289 8.70711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L12.4975 6.40942C12.888 6.0189 12.888 5.38573 12.4975 4.99521Z"
                  fill="#3587F7"
                />
              </svg>
            </span>
          </span>

          <div onClick={() => handleCart()} className={newCheckout.cart}>
            <div className={newCheckout.cartContainer}>
              <div className={newCheckout.products}>
                <div className={newCheckout.product1}></div>
                <div className={newCheckout.product2}></div>
              </div>
              <div className={newCheckout.priceAndIcon}>
                <span className={newCheckout.price}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currencySymbol,
                    }}
                  />
                  {totalWithShipping}
                </span>

                {cartOpened ? <Opened /> : <Closed />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
