import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { AppContext } from '../AppContext';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as csc from 'country-state-city';
import FormikChildListener from '../utils/FormikChildListener';

import _ from 'lodash';

const Checkout = () => {
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedState, setSelectedState] = React.useState();
  const [postalCode, setPostal] = React.useState();
  //
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);

  const formContext = React.useRef();

  const {
    setCurrentScreen,
    shippingMethods,
    currencySymbol,
    formData,
    setFormData,
  } = React.useContext(AppContext);

  React.useEffect(() => {
    //set nigeria initially
    const countries = csc.Country.getAllCountries();
    setCountries(countries);
    let nigeria = countries.find(country => country.isoCode == 'NGA');
    if (nigeria) setSelectedCountry(nigeria);
  }, []);

  React.useEffect(() => {
    if (selectedCountry) {
      const _states = csc.State.getStatesOfCountry(selectedCountry?.isoCode);
      setStates(_states);
    }
  }, [selectedCountry]);

  const availableShippingZones = React.useMemo(() => {
    let finalResult = [];

    let countryName =
      selectedCountry?.name || formContext.current?.values.country;
    let stateName = selectedState || formContext.current?.values.state;

    //check zones that match country
    const countryMatching = countryName
      ? Object.keys(shippingMethods).filter(key =>
          shippingMethods[key]['formatted_locations']?.includes(countryName)
        )
      : [];
    //check zones that match state
    const stateMatching = stateName
      ? Object.keys(shippingMethods).filter(key =>
          shippingMethods[key]['formatted_locations']?.includes(stateName)
        )
      : [];
    //check zones that match postalCode
    const postalMatching =
      postalCode?.length > 4
        ? Object.keys(shippingMethods).filter(key => {
            const formatted_locations =
              shippingMethods[key]['formatted_locations']?.split(',');
            return formatted_locations.some(
              location => location?.trim() == postalCode
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
      finalResult = ['0'];
    }

    return finalResult;
  }, [selectedCountry, selectedState, postalCode]);

  const zonesString = availableShippingZones.join(',');

  React.useEffect(() => {
    //if available shipping zones change
    //then reset shipping radio buttons
    if (formContext.current) {
      if (formContext.current.touched.shippingMethod) {
        formContext.current.setFieldValue('shippingMethod', '');
      }
    }
  }, [zonesString]);

  //custom listener
  // needed in order to update available shipping methods
  const onValueChange = (values, context) => {
    formContext.current = context;

    if (values.country !== selectedCountry) {
      let countryObj = countries.find(
        country => country.name == values.country
      );
      setSelectedCountry(countryObj);
    }

    if (values.state !== selectedState) {
      setSelectedState(values.state);
    }

    if (values.postalCode !== postalCode) {
      setPostal(values.postalCode);
    }
  };

  let initialValues = {
    fullName: '',
    phoneNo: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    shippingMethod: '',
    //replace with data from previous save
    ...(formData && { ...formData }),
  };

  const formValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    phoneNo: Yup.string().required('Phone No is required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    shippingMethod: Yup.string().required('Shipping is required'),
  });

  const colorModeGrey = useColorModeValue('gray.700', 'blue.800');

  const nextStep = () => {
    setCurrentScreen('second');
  };

  const renderContactFields = ({ errors, touched }) => {
    return (
      <>
        <FormControl>
          <FormLabel
            fontWeight="semibold"
            // color={useColorModeValue('black', 'black')}
          >
            Contact
          </FormLabel>
          <HStack spacing="2">
            <FormControl
              isInvalid={!!errors.fullName && touched.fullName}
              id="name"
              maxW="48"
            >
              {/* <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>
                Zip Code
              </FormLabel> */}
              <Field
                as={Input}
                name="fullName"
                placeholder="First & last name"
                // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
              />
              <FormErrorMessage name="fullName">
                {errors.fullName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phoneNo && touched.phoneNo}>
              {/* <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>
                Phone number
              </FormLabel> */}
              <Field
                as={Input}
                name="phoneNo"
                placeholder="Phone number"
                // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
              />
              <FormErrorMessage>{errors.phoneNo}</FormErrorMessage>
            </FormControl>
          </HStack>
        </FormControl>

        <FormControl isInvalid={!!errors.email && touched.email}>
          {/* <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>
                Phone number
              </FormLabel> */}
          <Field
            as={Input}
            name="email"
            placeholder="Email"
            // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          />
          <FormErrorMessage name="email">{errors.email}</FormErrorMessage>
        </FormControl>
      </>
    );
  };

  const renderDeliveryFields = ({ errors, touched, setFieldValue }) => {
    return (
      <>
        <FormLabel
          fontWeight="semibold"
          // color={useColorModeValue('black', 'black')}
        >
          Delivery
        </FormLabel>
        <HStack spacing="2">
          <FormControl isInvalid={!!errors.address && touched.address}>
            <Field
              as={Textarea}
              name="address"
              placeholder="Address"
              // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack spacing="2">
          <FormControl isInvalid={!!errors.city && touched.city} maxW="48">
            <Field
              as={Input}
              name="city"
              placeholder="City"
              // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            />
            <FormErrorMessage>{errors.city}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.postalCode && touched.postalCode}>
            <Field
              as={Input}
              name="postalCode"
              placeholder="Postal Code"
              inputMode="numeric"
              onChange={e => {
                const { value } = e.target;
                //only numerals allowed
                const newVal = value.replace(/\D+/g, '');
                setFieldValue('postalCode', newVal);
              }}
              // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            />
            <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack spacing="2">
          <FormControl
            isInvalid={!!errors.country && touched.country}
            id="country"
          >
            <Field as={Select} placeholder="Country" name="country">
              {countries.map(country => {
                return (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </Field>
          </FormControl>
          <FormControl isInvalid={!!errors.state && touched.state}>
            <Field
              as={Select}
              name="state"
              placeholder="State/City"
              // focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            >
              {states.map(state => {
                return (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                );
              })}
            </Field>
          </FormControl>
        </HStack>
      </>
    );
  };

  const renderShippingMethods = ({ errors, touched }) => {
    return (
      <div>
        <FormLabel
          fontWeight="semibold"
          // color={useColorModeValue('black', 'black')}
        >
          Shipping Method
        </FormLabel>
        <HStack spacing="2">
          <FormControl
            isInvalid={!!errors.shippingMethod && touched.shippingMethod}
          >
            <Field name="shippingMethod">
              {({ field, form }) => {
                const { onChange, ...rest } = field;
                return (
                  <RadioGroup {...rest}>
                    <Stack>
                      {availableShippingZones.map(zone_id => {
                        const zone_data = shippingMethods[zone_id];
                        const zone_methods = zone_data['methods'];

                        return Object.keys(zone_methods).map(method_id => {
                          const method = zone_methods[method_id];
                          return (
                            <HStack justify="space-between">
                              <Radio
                                width="30%"
                                onChange={onChange}
                                value={`${zone_id}_${method_id}`}
                              >
                                {' '}
                                <Text ml={1} fontWeight={'semibold'}>
                                  {method['user_title']}
                                </Text>
                              </Radio>

                              <div>
                                <Text fontWeight={'semibold'}>
                                  {' '}
                                  {method['cost'] ? (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: currencySymbol,
                                      }}
                                    />
                                  ) : undefined}
                                  {method['cost']}
                                </Text>
                                <Text
                                  fontSize="sm"
                                  dangerouslySetInnerHTML={{
                                    __html: method['description'],
                                  }}
                                />
                              </div>
                            </HStack>
                          );
                        });
                      })}
                    </Stack>
                  </RadioGroup>
                );
              }}
            </Field>
            <FormErrorMessage>{errors.shippingMethod}</FormErrorMessage>
          </FormControl>
        </HStack>
      </div>
    );
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={values => {
          nextStep();
          setFormData(values);
        }}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => {
          return (
            <Form>
              <Stack spacing={{ base: '2', md: '3' }}>
                {renderContactFields({ errors, touched })}
                <HStack>
                  <Divider mt={2} mb={2} />
                </HStack>
                {renderDeliveryFields({ errors, touched, setFieldValue })}
                <HStack>
                  <Divider mt={2} mb={2} />
                </HStack>

                {renderShippingMethods({ errors, touched, setFieldValue })}

                <HStack>
                  <Divider mt={2} mb={2} />
                </HStack>

                <Button
                  // onClick={}
                  bgColor={colorModeGrey}
                  borderRadius="md"
                  variant="primary"
                  fontWeight={'normal'}
                  type="submit"
                >
                  Go to payment
                </Button>
                <FormikChildListener onValueChange={onValueChange} />
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Checkout;
