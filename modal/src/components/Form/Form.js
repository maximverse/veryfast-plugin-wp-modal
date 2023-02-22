import * as React from "react";

import CardIcon from "../../assets/js_icons/CardIcon";
import ChevronDown from "../../assets/js_icons/ChevronDown";
import FormikInputError from "../FormikInputError";
import newCheckout from "./Form.module.css";

export default function Form(props) {
  const {
    name,
    email,
    phone,
    newCard,
    card,
    setNewCard,
    setName,
    setEmail,
    setPhone,
    setCardNum,
    setCardExp,
    setCardCvv,
    cardNum,
    cardExp,
    cardCvv,
    //
    formik,
  } = props;

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const cardRef = React.useRef();

  const renderCardField = () => {
    if (!newCard)
      return (
        <div className={newCheckout.inputHolder}>
          <div className={newCheckout.labelForInput}>
            <label className={newCheckout.Label}>Payment</label>
          </div>
          <div className="inputContainer">
            <CardIcon />

            <input
              placeholder="Card"
              name="Card"
              className="input"
              value={card}
              required
              ref={cardRef}
              onChange={() => {}}
            />
            <ChevronDown onClick={() => setNewCard(!newCard)} />
          </div>
        </div>
      );
    return (
      <div>
        <span>
          <input
            placeholder="Card Number"
            name="cardNum"
            value={cardNum}
            className={newCheckout.inlineNumber}
            required
            onChange={(e) => setCardNum(e.target.value)}
          />
          <input
            placeholder="MM/YY"
            name="cardExp"
            value={cardExp}
            className={newCheckout.inlineExp}
            required
            onChange={(e) => setCardExp(e.target.value)}
          />
          <input
            placeholder="CVV"
            name="cardCvv"
            value={cardCvv}
            className={newCheckout.inlineCvv}
            required
            onChange={(e) => setCardCvv(e.target.value)}
          />
        </span>
        <div
          onClick={() => setNewCard(!newCard)}
          className="ml-[auto] flex justify-end items-center bg-white pb-2"
        >
          {/* <CardIcon /> */}
          <div className="text-xs font-semibold mr-2">use saved card</div>
          <ChevronDown
            style={{
              transform: "rotate(180deg)",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={newCheckout.inputHolder}>
        <div className={newCheckout.labelForInput}>
          <label className={newCheckout.Label}>Name</label>
        </div>
        <div className={"inputContainer"}>
          <div className="w-full">
            <input
              placeholder="Name"
              name="fullName"
              className="input"
              required
              ref={nameRef}
              // onChange={(e) => setName(e.target.value)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            <FormikInputError name="fullName" errors={formik.errors} />
          </div>
          <ChevronDown onClick={() => nameRef.current?.focus()} />
        </div>
      </div>
      <div className={newCheckout.spacing2}></div>
      <div className={newCheckout.inputHolder}>
        <div className={newCheckout.labelForInput}>
          <label className={newCheckout.Label}>Email</label>
        </div>
        <div className="inputContainer">
          <div className="w-full">
            <input
              placeholder="Email"
              name="email"
              className="input"
              required
              ref={emailRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <FormikInputError name="email" errors={formik.errors} />
          </div>
          <ChevronDown onClick={() => emailRef.current?.focus()} />
        </div>
      </div>
      <div className={newCheckout.spacing2}></div>

      <div className={newCheckout.inputHolder}>
        <div className={newCheckout.labelForInput}>
          <label className={newCheckout.Label}>Phone</label>
        </div>
        <div className="inputContainer">
          <div className="w-full">
            <input
              placeholder="Phone"
              name="phoneNo"
              className="input"
              required
              ref={phoneRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNo}
            />
            <FormikInputError name="phoneNo" errors={formik.errors} />
          </div>
          <ChevronDown onClick={() => phoneRef.current?.focus()} />
        </div>
      </div>
      <div className={newCheckout.spacing2}></div>

      {renderCardField()}

      <div className={newCheckout.spacing2}></div>
    </>
  );
}
