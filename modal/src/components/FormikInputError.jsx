import * as React from "react";

import { useFormikContext } from "formik";

const FormikInputError = (props) => {
  // const context = useFormikContext();
  const errors = props?.errors;
  const name = props?.name;

  if (!name || !errors?.[name]) return;

  return <div className="text-xs text-center text-red-500">{errors[name]}</div>;
};

export default FormikInputError;
