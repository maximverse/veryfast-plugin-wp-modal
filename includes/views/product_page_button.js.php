const veryFast_Product = <?= $product; ?>;
const merchantApiKey = '<?= $apiKey; ?>';
const vf_shipping_methods = <?= $shipping_methods ?>;
const vf_currencySymbol = '<?= get_woocommerce_currency_symbol(get_woocommerce_currency()); ?>';
const vf_currency = '<?= get_woocommerce_currency(); ?>';
const vf_callback_url = "<?= $vf_callback_url ?>";

var wc_product_is_purchasable = <?= $wc_product_is_purchasable; ?>;


/***
*/

//logic to add product to cart

const addToCart = async ($) => {
const data = {
action: 'wc_veryfast_ajax_add_to_cart',
product_id: veryFast_Product['id'],
product_sku: '',
quantity: 1,
variation_id: '',
};

return $.ajax({
type: 'post',
url: wc_veryfast_checkout_config.ajax_url,
data: data,
})
}

//logic to get cart contents
const getCartContents = async ($) => {
const data = {
action:'wc_veryfast_get_cart'
}
console.log("wc_veryfast_checkout_config",wc_veryfast_checkout_config);
const res = await $.ajax({
type: 'post',
url: wc_veryfast_checkout_config.ajax_url,
data: data,
})

return res
}

jQuery(document).ready(($) => {
//clicking proceed should launch veryFast checkout
$("#product-page-veryfast-checkout").on("click", async (e) => {
e.preventDefault();
$("#confirmCheckoutModal").modal();
});

//clicking add to cart should launch modal
$("#veryFast_proceed").on("click", async (e) => {
e.preventDefault();

$("#confirmCheckoutModal").modal('hide')

const addToCartRes = await addToCart($);
console.log("addToCartRes",addToCartRes);

if (!addToCartRes.cart_hash) {
Toastify({
text: "Error while adding to cart, aborting...",
className: "info",
style: {
backgroundColor: "#fff",
color: "red",
},
}).showToast();
}

const cartObj = await getCartContents($);
console.log("cartObj",cartObj);

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
});
});


/*** */


const setupVeryFast = (_cartObj) => {
const veryFast = new VeryfastMain();
const configData = {
cart:_cartObj,
merchantApiKey,
currencySymbol: vf_currencySymbol,
currency: vf_currency,
shipping_methods: vf_shipping_methods,
callback_url: vf_callback_url
};
console.log("configData",configData);
veryFast.showCheckoutForm(configData)
}