import React, { useState } from "react";
import { useContext } from "react";
import styled from "@emotion/styled";
import "./component.css";

import { FormContext } from "../../context/FormContext";
import { AppContext } from "../../context/AppContext";

import { useFormik } from "formik";
import * as Yup from "yup";
import * as csc from "country-state-city";

import FormikInputError from "../FormikInputError";

// import Select from "react-select";

const ModalContent = ({ handleClose }) => {
  //
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);

  const { formData, setFormData } = React.useContext(AppContext);

  let initialValues = {
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  };

  //if form data is already in context, then populate
  if (formData) {
    for (let key in initialValues) {
      initialValues[key] = formData[key];
    }
  }

  const formValidationSchema = Yup.object().shape({
    address1: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      //create new obj to avoid overwriting context
      let formObj = { ...formData };
      for (let key in values) {
        formObj[key] = values[key];
      }

      //reset shipping methods
      //
      // formObj["shippingMethod"] = "";

      setFormData(formObj);
      handleClose();
    },
    enableReinitialize: true,
    validationSchema: formValidationSchema,
  });

  //build country array for dropdown
  React.useEffect(() => {
    //set nigeria initially
    let countries = csc.Country.getAllCountries();

    setCountries(countries);
  }, []);

  //reset states if country is changed
  React.useEffect(() => {
    let countryName = formik.values.country;
    if (countryName?.trim() == "" || !countryName) {
      countryName = formData?.country;
    }

    let countries = csc.Country.getAllCountries();
    let countryObj = countries.find((country) => country.name == countryName);

    if (countryObj) {
      const _states = csc.State.getStatesOfCountry(countryObj?.isoCode);
      setStates(_states);
    }
  }, [formik.values.country]);

  let addressWrapClasses = "containerHolder";
  if (formik.values.address1.length > 12) {
    addressWrapClasses = "";
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <ModalHeader>
          <Content>
            {/* <FeaturedIcon /> */}
            <Text>Update your shipping details</Text>
            <TextAndSupportingText>
              <div className={addressWrapClasses}>
                <div>
                  <label className="font-bold text-xs my-1">Address 1</label>
                  <Input
                    name="address1"
                    placeholder="Address"
                    className="input"
                    // required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address1}
                  />
                  <FormikInputError errors={formik.errors} name="address1" />
                  <Spacing />
                </div>
                <div>
                  <label className="font-bold text-xs my-1">Address 2</label>
                  <Input
                    placeholder="Address 2"
                    name="address2"
                    className="inputRight"
                    // required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address2}
                  />
                  <Spacing />
                </div>
              </div>

              <div className="containerHolder">
                <div>
                  <label className="font-bold text-xs my-1">Zip Code</label>
                  <Input
                    placeholder="Postal code"
                    // name="Postal code"
                    name="postalCode"
                    className="input"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                  />
                  <FormikInputError errors={formik.errors} name="postalCode" />
                  <Spacing />
                </div>
                <div>
                  <label className="font-bold text-xs my-1">City</label>
                  <Input
                    placeholder="City"
                    name="city"
                    className="inputRight"
                    // required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                  <FormikInputError errors={formik.errors} name="city" />
                  <Spacing />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="min-w-[30%]">
                  <label className="font-bold text-xs my-1">Country</label>
                  <select
                    name="country"
                    className="w-full h-[45px]"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.country}
                  >
                    {countries?.map((country) => {
                      return (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                  <FormikInputError errors={formik.errors} name="country" />
                  <Spacing />
                </div>
                <div className="min-w-[30%]">
                  <label className="font-bold text-xs my-1">State</label>
                  <select
                    name="state"
                    className="w-full h-[45px]"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  >
                    {states?.map((state) => {
                      return (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                  <FormikInputError errors={formik.errors} name="state" />
                  <Spacing />
                </div>
              </div>

              {/* <SupportingText>hello</SupportingText> */}
            </TextAndSupportingText>
          </Content>
        </ModalHeader>
        <ModalActions>
          <Content1>
            <Button onClick={handleClose}>
              <Text1>Cancel</Text1>
            </Button>
            <Button1 type="submit">
              <Text2>Confirm</Text2>
            </Button1>
          </Content1>
        </ModalActions>
      </Container>
    </form>
  );
};

const Spacing = styled.div`
  /* margin-top: -11px; */
  height: 2px;
  width: 95%;
  align-self: center;
  background-color: #f0f2fa;
`;

const Input = styled.input`
  padding: 20px 20px 20px 16px;
  border: 0;
  /* border: 1px solid #333; */
  color: #444;
  font-size: 16px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  width: 100%;
  height: 16px;
  flex-direction: column;
  transition: 0.3s all;

  &:hover {
    border: 0;
    margin: 0;
    outline: none;
  }
  &:focus {
    outline: none;
    border: 0;

    color: #333;
  }
  &:active {
    outline: none;
    border: 0;

    color: #333;
  }

  &:focus {
    outline: none;
    border: 0;

    color: #333;
  }

  &:placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #959595;
    opacity: 1; /* Firefox */
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 319px;
  height: 30vh;
  align-self: center;
  justify-self: center;
  height: fit-content;
  border-radius: 12px;
  background: #fefefe;
  box-shadow: 0px 20px 24px -4px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  background: #fff;
`;

const ModalActions = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  padding-top: 32px;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 16px;
  padding-top: 24px;
  padding-right: 24px;
  padding-left: 24px;
  background: #fff;
`;

const ButtonCloseX = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 340px;
  top: 16px;
  padding: 10px;
  border-radius: 8px;
`;

const Content1 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 12px;
  padding-right: 24px;
  padding-bottom: 24px;
  padding-left: 24px;
`;

const TextAndSupportingText = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 4px;
`;

const Button = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  position: relative;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  background: #fefefe;
  border-width: 1px;
  border-color: #d0d5dd;
  border-style: solid;
  box-shadow: 0px 1px 2px 0 rgba(16, 24, 40, 0.05);
  transition: all 0.2s;

  &:hover {
    background: #d0d5dd;
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Button1 = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  position: relative;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  background: #01010f;
  border-width: 1px;
  border-color: #01010f;
  border-style: solid;
  box-shadow: 0px 1px 2px 0 rgba(16, 24, 40, 0.05);

  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Text = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  align-self: stretch;
  font-family: Inter;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
  font-weight: 600;
  text-align: left;
  color: #101828;
`;

const SupportingText = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  align-self: stretch;
  font-family: Inter;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: left;
  color: #475467;
`;

const Text1 = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  font-weight: 600;
  text-align: left;
  color: #344054;
`;

const Text2 = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  font-weight: 600;
  text-align: left;
  color: #fff;
`;

export default ModalContent;
