import * as React from "react";
import { AppContext } from "../../context/AppContext";

import styles from "./cart.module.css";
import Product from "./Product";

export default function Cart(props) {
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

  /**
   * render empty page if no cart data
   */
  if (!cartData) return <div>Cart data not loaded</div>;

  const cartItemsKeys = Object.keys(cartData);

  const renderCartItems = () => {
    return (
      <>
        {cartItemsKeys.map((key, index) => {
          const item = cartData[key];
          return <Product key={key} data={item} />;
        })}
      </>
    );
  };

  return (
    <>
      <div className={styles.blur}></div>
      <div className={styles.container1}>
        <div className="overflow-y-scroll h-full pb-4">
          {renderCartItems()}

          <div className={styles.separator}></div>

          <div id="costs">
            <div className={styles.costsVariables}>
              <div className={styles.variables}>
                Subtotal:
                <span></span>
              </div>
              <div className={styles.pricing}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: currencySymbol,
                  }}
                />
                {totalWithShipping}
              </div>
            </div>
          </div>

          {cartItemsKeys.map((key) => {
            const item = cartData[key];

            return (
              <div key={key} className={styles.costsVariables}>
                <div className="flex items-center justify-between w-full">
                  <div className={styles.subvariable}>
                    x{item?.quantity} {item?.product?.name}
                  </div>
                  <div
                    className={`${styles.pricing} ${styles.sub} ${styles.sub2}`}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item?.currency_symbol,
                      }}
                    />
                    {item?.product?.price * item?.quantity}
                  </div>
                </div>
              </div>
            );
          })}

          <div className={styles.costsVariables2}>
            <div className={styles.variables}>Shipping & handling:</div>
            <div className={styles.pricing}>
              <span
                dangerouslySetInnerHTML={{
                  __html: currencySymbol,
                }}
              />
              {selectedShipping?.cost}
            </div>
          </div>
          {/* <div className={styles.costsVariables2}>
          <div className={styles.variables}>
            Applied coupon: <span> </span>
          </div>
          <div className={styles.pricing}>(-10%) $2.99</div>
        </div> */}
          <div className={styles.costsVariables2}>
            <div className={`${styles.variables} ${styles.total}`}>
              Total: <span> </span>
            </div>
            <div className={`${styles.pricing} ${styles.total}`}>
              <span
                dangerouslySetInnerHTML={{
                  __html: currencySymbol,
                }}
              />
              {totalWithShipping}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
