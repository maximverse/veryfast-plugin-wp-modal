import styles from "./cart.module.css";

export default function Product(props) {
  const data = props?.data;

  return (
    <>
      <div className={styles.productGroup}>
        <div className={styles.productImage}>
          <img className={styles.prodImg} src={require("./img.png")} />
        </div>
        <div className={styles.productDetails}>
          <h5 className={styles.prodName}>{data?.product?.name}</h5>
          <h6 className={styles.specs}>
            Variant: <span className={styles.specsDetails}>Carmel</span>
          </h6>
          <h6 className={styles.specs}>
            Size: <span className={styles.specsDetails}>Large</span>
          </h6>
          <h6 className={styles.specs}>
            Price:{" "}
            <span className={styles.specsDetails}>
              <span
                dangerouslySetInnerHTML={{
                  __html: data?.currency_symbol,
                }}
              />
              {data?.product?.price}
            </span>
          </h6>
          <h6 className={styles.specs}>
            Quantity:{" "}
            <span className={styles.specsDetails}>{data?.quantity}</span>{" "}
            {/* <svg
              className={styles.arrow}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.00037 1.2002L4.60037 4.8002L8.20037 1.2002"
                stroke="#9CA3AF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </h6>
        </div>
      </div>
    </>
  );
}
