import * as React from "react";

export const FormContext = React.createContext();

const FormContextFC = (props) => {
  const contextData = [
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      newAddressLine1: "",
    },
  ];

  return (
    <FormContext.Provider value={contextData}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextFC;
