import * as React from "react";

import { AppContext } from "../../context/AppContext";
import ShippingMethod from "./ShippingMethod/ShippingMethod";

import _ from "lodash";

export default function Delivery() {
  const handleDivClick = (id) => {
    let formObj = { ...formData };
    formObj["shippingMethod"] = id;
    setFormData(formObj);
  };

  const { shippingMethods, formData, setFormData } =
    React.useContext(AppContext);

  const selectedCountry = formData.country;
  const selectedState = formData.state;
  const postalCode = formData.postalCode;

  const availableShippingZones = React.useMemo(() => {
    let finalResult = [];

    let countryName = selectedCountry;
    let stateName = selectedState;

    //check zones that match country
    const countryMatching = countryName
      ? Object.keys(shippingMethods).filter((key) =>
          shippingMethods[key]["formatted_locations"]?.includes(countryName)
        )
      : [];
    //check zones that match state
    const stateMatching = stateName
      ? Object.keys(shippingMethods).filter((key) =>
          shippingMethods[key]["formatted_locations"]?.includes(stateName)
        )
      : [];
    //check zones that match postalCode
    const postalMatching =
      postalCode?.length > 4
        ? Object.keys(shippingMethods).filter((key) => {
            const formatted_locations =
              shippingMethods[key]["formatted_locations"]?.split(",");
            return formatted_locations.some(
              (location) => location?.trim() == postalCode
            );
          })
        : [];

    //combinedZones to show
    const matchingZones = [
      ...countryMatching,
      ...stateMatching,
      ...postalMatching,
    ];

    finalResult = matchingZones;

    //if none matching, then select zone everywhere
    if (matchingZones.length == 0) {
      finalResult = ["0"];
    }

    return finalResult;
  }, [selectedCountry, selectedState, postalCode]);

  const zonesString = availableShippingZones.join(",");

  React.useEffect(() => {
    setDefaultShipping();
  }, [zonesString]);

  /**
   * set cheapest available shipping option as default
   */
  const setDefaultShipping = () => {
    let methods = [];
    availableShippingZones?.forEach((zone_id) => {
      const zone_data = shippingMethods[zone_id];
      const zone_methods = zone_data["methods"];

      for (let method_id in zone_methods) {
        const method = zone_methods[method_id];
        methods.push({ ...method, shippingMethod: `${zone_id}_${method_id}` });
      }
    });

    const cheapest = methods.reduce((previous, current) => {
      const prevCost = isNaN(previous.cost) ? 0 : parseFloat(previous.cost);
      const currentCost = isNaN(current.cost) ? 0 : parseFloat(current.cost);

      return currentCost < prevCost ? current : previous;
    });

    if (cheapest) {
      handleDivClick(cheapest?.shippingMethod);
    }
  };

  return (
    <>
      {availableShippingZones.map((zone_id) => {
        const zone_data = shippingMethods[zone_id];
        const zone_methods = zone_data["methods"];

        return Object.keys(zone_methods).map((method_id) => {
          const method = zone_methods[method_id];
          return (
            <ShippingMethod
              key={`${zone_id}_${method_id}`}
              id={`${zone_id}_${method_id}`}
              handleDivClick={handleDivClick}
              selectedDiv={formData["shippingMethod"]}
              shipping_name={method["user_title"]}
              shipping_price={method["cost"]}
              shipping_time={"As fast as you say startup founder"}
            />
          );
        });
      })}
    </>
  );
}
