const merchantApiKey = '<?=$apiKey;?>';
const vf_cart_content = <?=$cart_content?>;
const vf_shipping_methods = <?=$shipping_methods?>;
const vf_currencySymbol = '<?=get_woocommerce_currency_symbol(get_woocommerce_currency());?>';
const vf_currency = '<?=get_woocommerce_currency();?>';
const vf_callback_url = '<?=$vf_callback_url?>';

var cartObjState = {
data: vf_cart_content
}

var cartPageUpdated = false

/***
*/

//logic to get cart contents
const getCartContents = async () => {
$ = jQuery;
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

$('.woocommerce').on("submit",async () => {
//do not use page cached cart data if page has been updated via ajax
cartPageUpdated = true
})


//clicking add to cart should launch modal
$('body').on("click","#cart-page-veryfast-checkout", async (e) => {
e.preventDefault();

vf_Checkout()
});
});

/*** */

const vf_Checkout = async () => {
$ = jQuery;
let cartObj = cartObjState


if(cartPageUpdated){
const res = await getCartContents();
if(res.success){
cartObj = res
}
}

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

const setupVeryFast = (_cartObj) => {
const veryFast = new VeryfastMain();
veryFast.showCheckoutForm({
cart: _cartObj,
merchantApiKey,
currencySymbol: vf_currencySymbol,
currency: vf_currency,
shipping_methods: vf_shipping_methods,
callback_url: vf_callback_url
});
};