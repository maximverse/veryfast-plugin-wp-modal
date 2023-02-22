//logic to get cart contents
const getCartContents = async ($) => {
  const data = {
    action: "wc_veryfast_get_cart",
  };

  const res = await $.ajax({
    type: "post",
    url: wc_veryfast_checkout_config.ajax_url,
    data: data,
  });

  return res;
};

jQuery(document).ready(($) => {
  //clicking add to cart should launch modal
  $("#cart-page-veryfast-checkout").on("click", async (e) => {
    e.preventDefault();
    vf_Checkout();
  });
});

/*** */

const vf_Checkout = async () => {
  const cartObj = await getCartContents($);

  if (cartObj.success) {
    Toastify({
      text: "Initializing VeryFast...",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    // start checkout
    setupVeryFast(cartObj);
  }
};

const setupVeryFast = (_cartObj) => {
  const veryFast = new VeryfastMain();
  veryFast.showCheckoutForm({
    cart: _cartObj,
    merchantApiKey,
    currencySymbol: vf_currencySymbol,
    currency: vf_currency,
  });
};
