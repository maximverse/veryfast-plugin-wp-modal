import ShipToModal from "../ShipToModal";
import newCheckout from "./ShipTo.module.css";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { AppContext } from "../../context/AppContext";

export default function ShippingNotFilled({
  handleOpen,
  handleClose,
  showModal,
}) {
  const context = useContext(FormContext);

  const appContext = useContext(AppContext);

  const { formData } = appContext;

  return (
    <>
      <div className={newCheckout.inputHolder}>
        <div className={newCheckout.labelForInput}>
          <label className={newCheckout.Label}>Ship To</label>
        </div>
        <div className="inputContainer">
          <div className="addressesContainer">
            <div className="address1">{formData.address1}</div>

            <div className="address2">
              {formData?.address2 && <>{formData.address2},</>} {formData.city},{" "}
              {formData.state === formData.city ? "" : formData.state + ", "}
              {formData.postalCode}
            </div>
          </div>

          <svg
            onClick={() => handleOpen()}
            style={{}}
            className="inputArrow"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0535 2.38778L13.3827 0.695313L7.89304 6.25627L2.40338 0.695313L0.732611 2.38778L7.89304 9.6412L15.0535 2.38778Z"
              fill="#686B6F"
            />
          </svg>
        </div>
      </div>

      <ShipToModal handleClose={handleClose} showModal={showModal} />
    </>
  );
}
