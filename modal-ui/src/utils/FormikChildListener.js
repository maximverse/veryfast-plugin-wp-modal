import { useFormikContext } from 'formik';
import * as React from 'react';

const FormikChildListener = props => {
  const context = useFormikContext();
  const { values } = context;

  React.useEffect(() => {
    props.onValueChange(values, context);
  }, [values]);
  return <div />;
};

export default FormikChildListener;
