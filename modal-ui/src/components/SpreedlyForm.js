import * as React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, HStack, Input } from '@chakra-ui/react';
import { AppContext } from '../AppContext';

const SpreedlyForm = props => {
  const submitPaymentForm = props.submitPaymentForm;
  const Spreedly = window.Spreedly;

  const submitBtnRef = React.useRef();
  const formRef = React.useRef();

  const [btnDisabled, setDisabled] = React.useState(true);

  let initialValues = {
    month: '02',
    year: '2025',
  };

  const formValidationSchema = Yup.object().shape({
    month: Yup.string().required('required'),
    year: Yup.string().required('required'),
  });

  React.useEffect(() => {
    Spreedly.on('ready', function () {
      console.log('enabling button ');
      setDisabled(false);
    });
  }, []);

  console.log('disabled ', btnDisabled);

  React.useEffect(() => {
    if (formRef.current) {
      if (props.hide) {
        formRef.current.style.display = 'none';
      } else {
        formRef.current.style.display = 'block';
      }
    }
  }, [props.hide]);

  console.log('submitBtnRef.current ', submitBtnRef);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidationSchema}
      onSubmit={values => {
        submitPaymentForm({ values });
      }}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, values }) => {
        console.log(';errors ', errors);
        return (
          <Form ref={formRef} id="payment-form">
            <input
              type="hidden"
              name="payment_method_token"
              id="payment_method_token"
            />

            <br />

            <label>Credit Card Number</label>
            <div
              id="spreedly-number"
              style={{ width: '225px', height: '35px', border: '2px solid' }}
            ></div>
            <br />

            <label>Expiration Date</label>
            <HStack spacing="9px">
              <FormControl w="auto" isInvalid={!!errors.month && touched.month}>
                <Field
                  as={Input}
                  type="text"
                  id="month"
                  name="month"
                  placeholder="MM"
                  maxLength="2"
                  w="70px"
                />
              </FormControl>
              <div>/</div>
              <FormControl isInvalid={!!errors.year && touched.year}>
                <Field
                  as={Input}
                  type="text"
                  id="year"
                  name="year"
                  maxLength="4"
                  placeholder="YYYY"
                  w="100px"
                />
              </FormControl>
            </HStack>
            <br />

            <label>CVV</label>
            <div
              id="spreedly-cvv"
              style={{ width: '60px', height: '35px', border: '2px solid' }}
            ></div>
            <br />

            <Button
              colorScheme="teal"
              size="sm"
              id="submit-button"
              type="submit"
              disabled={btnDisabled}
            >
              Pay Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SpreedlyForm;
