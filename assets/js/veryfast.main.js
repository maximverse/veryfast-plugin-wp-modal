/**
 * Main class file to initiate modal and forms
 * @constructor
 */

var bolt_checkout_form;

//initiialize onload
// jQuery(document).ready(($) => {
//   VeryfastMain.initialize();
// });

class VeryfastMain {
  constructor() {}

  static initialize = () => {
    //append form code to html DOM

    // If the current page has checkout form.
    if (bolt_checkout_form && jQuery(bolt_checkout_form).length > 0) {
    }
  };

  showCheckoutForm = (payload) => {
    window.openVeryFastModal(payload);
  };
}

/****
 *
 * MISCELLENOUS
 */

const veryfast_get_shipping_methods = async () => {
  const data = {
    action: "wc_veryfast_get_shipping_methods",
  };

  const res = await jQuery
    .ajax({
      type: "post",
      url: wc_veryfast_checkout_config.ajax_url,
      data: data,
    })
    .then((res) => res)
    .catch((err) => err);

  console.log("shipping methods res ", res);
};

/**
 * Display all notices sent by WooCommerce via an ajax call
 *
 * @param data  the response sent back from WooCommerce
 */
function display_notices(data) {
  var $header = jQuery(wc_veryfast_checkout_config.display_notices_selector)
    .length
    ? jQuery(wc_veryfast_checkout_config.display_notices_selector)
    : jQuery(".entry-summary");
  if (!$header.length) {
    $header = jQuery("body");
  }
  // Remove notices from all sources
  jQuery(".woocommerce-error").remove();

  // Add new errors returned by this event
  if (data.messages) {
    $header.prepend(
      '<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-updateOrderReview">' +
        data.messages +
        "</div>"
    );
  } else {
    $header.prepend(data);
  }

  // Scroll to top
  jQuery("html, body").animate(
    {
      scrollTop: $header.offset().top - 100,
    },
    1000
  );
}

// Get ajax endpoint URL.
function veryfast_get_ajax_url(endpoint) {
  return wc_veryfast_checkout_config.ajax_url.toString();
  // .replace("%%wc_endpoint%%", "wc_veryfast_" + endpoint);
}

function get_ajax_url(endpoint) {
  return bolt_get_ajax_url(endpoint);
}

function veryfast_record_frontend_error(text, data) {
  if (data === undefined) data = {};
  data.text = text;
  data.href = document.location.href;
  if (typeof bolt_cart !== "undefined") {
    data.cart = bolt_cart;
  }

  jQuery.ajax({
    type: "POST",
    url: bolt_get_ajax_url("record_frontend_error"),
    data: data,
  });
}
