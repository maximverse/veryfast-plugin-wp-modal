import React from "react";
import { AppContext } from "../../../context/AppContext";

export default function ShippingMethod(props) {
  const {
    handleDivClick,
    selectedDiv,
    shipping_name,
    shipping_time,
    shipping_price,
    id,
  } = props;

  const selected = selectedDiv?.toString() == id?.toString();

  const appContext = React.useContext(AppContext);

  const renderPrice = () => {
    return (
      <>
        {shipping_price ? (
          <span
            dangerouslySetInnerHTML={{
              __html: appContext?.currencySymbol,
            }}
          />
        ) : undefined}
        {shipping_price}
      </>
    );
  };

  return (
    <>
      <div
        onClick={() => handleDivClick(id)}
        className={`shipping ${selected ? "selected" : ""}`}
        id={id}
      >
        <div className="containerShip">
          <p className="shippingHeader">
            {shipping_name} - {renderPrice()}
          </p>
          <p className="shippingTime">{shipping_time}</p>
        </div>
        <div className="check">
          {selectedDiv === id && (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.00038 18.1953C13.971 18.1953 18.0005 14.1664 18.0005 9.19531C18.0005 4.22419 13.971 0.195312 9.00038 0.195312C4.02974 0.195312 0.000488281 4.22419 0.000488281 9.19531C0.000488281 14.1664 4.02974 18.1953 9.00038 18.1953ZM13.5026 6.91849L7.62223 12.8L4.49876 9.6765L5.75703 8.41905L7.62223 10.275L12.2446 5.66104L13.5026 6.91849Z"
                fill="black"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
