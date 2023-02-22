import cartClosedStyles from "./checkoutStyles.module.css";

export default function Closed() {
  return (
    <svg
      className={cartClosedStyles.arrow}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00037 1.2002L4.60037 4.8002L8.20037 1.2002"
        stroke="black"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
