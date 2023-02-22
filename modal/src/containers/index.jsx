import * as React from "react";

import classes from "../newCheckout.module.css";

import Form from "../components/Form/Form";
import ShipTo from "../components/ShipTo/ShipTo";
import Delivery from "../components/Delivery/Delivery";
// import FormikInputError from "../components/FormikInputError";
//
import { useFormik } from "formik";
import * as Yup from "yup";

import { AppContext } from "../context/AppContext";

const MainForm = (props) => {
  // modal
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => setShowModal(true);

  const [paymentError, setPaymentError] = React.useState(false);

  // card related
  const [card, setCard] = React.useState("    1001");
  const [cardNum, setCardNum] = React.useState("4242 4242 4242 4242");
  const [cardExp, setCardExp] = React.useState("02/23");
  const [cardCvv, setCardCvv] = React.useState("953");

  //
  const [newCard, setNewCard] = React.useState(false);

  const { formData, setFormData } = React.useContext(AppContext);

  let initialValues = {
    fullName: "",
    phoneNo: "",
    email: "",
    cardCvv: "",
  };

  //if form data is already in context, then populate
  if (formData) {
    for (let key in initialValues) {
      initialValues[key] = formData[key];
    }
  }

  const formValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      //create new obj to avoid overwriting context
      let formObj = { ...formData };
      for (let key in values) {
        formObj[key] = values[key];
      }
      setFormData(formObj);

      console.log("submitting");
    },
    enableReinitialize: true,
    validationSchema: formValidationSchema,
  });

  return (
    <div>
      <div className={classes.spacing}></div>
      <Form
        formik={formik}
        newCard={newCard}
        card={card}
        setNewCard={setNewCard}
        setCardNum={setCardNum}
        setCardExp={setCardExp}
        setCardCvv={setCardCvv}
        cardNum={cardNum}
        cardExp={cardExp}
        cardCvv={cardCvv}
      />

      <ShipTo
        handleOpen={handleOpen}
        handleClose={handleClose}
        showModal={showModal}
      />

      <div className={classes.spacing}></div>
      <Delivery />
      <div className={classes.checkoutSpacing}></div>
      <div className={classes.checkout}>
        <div className={classes.checkoutContainer}>
          <div className={classes.footerSpan}>
            {paymentError ? (
              <p className={classes.paymentError}>
                Sorry, your payment was declined. <br />
                Please try a different card or contact your bank.
              </p>
            ) : (
              <>
                By clicking the button below you agree to our Terms, Privacy
                Policy and Cookie Policy
              </>
            )}
          </div>

          <div
            onClick={formik.handleSubmit}
            className={`${classes.checkoutBtn} ${classes.button}`}
          >
            <span className={classes.checkoutTextContainer}>
              <p className={classes.payText}>Place order</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
