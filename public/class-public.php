<?php

/**
 * Define logic concerning non-Admin view
 */

class VeryFast_Public
{
    private $public_name;
    private $version;

    public function __construct($plugin_name, $version)
    {

        // $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    public function enqueue_scripts()
    {
        wp_enqueue_script(
            'wc-veryfast-checkout-process',
            plugin_dir_url(VERYFAST_PLUGIN_FILE) . 'assets/js/veryfast.main.js',
            array('jquery'),
            '1.0.3'
        );

        // Send variables to JS file.
        wp_localize_script('wc-veryfast-checkout-process', 'wc_veryfast_checkout_config', array(
            'display_notices_selector' => 'header',
            // 'ajax_url' => \WC_AJAX::get_endpoint(),
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => array(
                'payment' => wp_create_nonce('wc-veryfast-payment-request'),
                'shipping' => wp_create_nonce('wc-veryfast-payment-request-shipping'),
                'update_shipping' => wp_create_nonce('wc-veryfast-update-shipping-method'),
                'create_checkout_btn' => wp_create_nonce('wc-veryfast-create_checkout_btn'),
                'save_details' => wp_create_nonce('wc-veryfast-save_transaction_details'),
            ),
            // Make sure there is always an alternative for redirect url after successfully save woocommerce order
            'default_redirect_url' => wc_get_endpoint_url('order-received', '', wc_get_page_permalink('checkout')),
            // 'is_order_pay_page' => (wc_bolt_is_checkout_page() && !empty($wp->query_vars['order-pay'])) ? '1' : '0',
        ));

        //toast
        wp_register_script('Toastify', 'https://cdn.jsdelivr.net/npm/toastify-js', null, null, true);
        wp_enqueue_script('Toastify');
        //toast styles
        wp_register_style('Toastify_style', 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
        wp_enqueue_style('Toastify_style');

        wp_enqueue_style('VeryFast_Public_css',
            plugin_dir_url(VERYFAST_PLUGIN_FILE) . 'assets/css/public.css');

        //modal
        // wp_enqueue_style('modal-style', plugin_dir_url(VERYFAST_PLUGIN_FILE) . 'modal-ui/build/main.css');
        // wp_enqueue_script('modal-script', plugin_dir_url(VERYFAST_PLUGIN_FILE) . 'modal-ui/build/main.js', array('wp-element'), '1.0.0', true);

        //modal dev mode
        wp_enqueue_script('modal-script', 'http://localhost:3000/main.js', array('wp-element'), '1.0.0', true);

        //bootstrap integration
        wp_enqueue_style('bootstrap_style', 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css');
        // integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
        wp_enqueue_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js');
        wp_enqueue_script('bootstrap_js', 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js');
    }

    /**
     * Empties WooCommerce cart.
     *
     * Available for public.js via wp_localize_script. Called when Plugin API
     * indicates that checkout is already completed.
     */
    public function clear_cart()
    {

        if (!$this->isCartEmpty()) {
            WC()->cart->empty_cart();
        }

        echo json_encode(WC()->cart->get_cart_contents());

        # this method is called via AJAX so it's safe to die here
        wp_die();
    }

    //check if cart is empty
    private function isCartEmpty()
    {
        return WC()->cart->get_cart_contents_count() == 0;
    }

    private function build_checkout_items($cart)
    {
        $items = array();

        foreach ($cart->get_cart() as $key => $cart_item) {
            $items[] = array(
                "product_id" => $cart_item["product_id"],
                "variant_id" => $cart_item["variation_id"],
                "quantity" => $cart_item["quantity"],
                "properties" => $cart_item["variation"],
            );
        }

        return $items;
    }

    public function redirect_from_checkout()
    {
        if (is_checkout()) {
            // echo "<script>alert('Hello there')</script>";
            $complete_url = wp_nonce_url(wc_get_cart_url(), 'veryfast_checkout_redirect');
            wp_redirect($complete_url);
            die;
        }
    }

    public function add_to_cart()
    {}

    public function page_visit()
    {}

    private function api_url($path)
    {
        $base_url = get_option("checkout_x_api_url");
        $v2_url = path_join($base_url, "v2");
        $endpoint_url = path_join($v2_url, $path);

        return $endpoint_url;
    }
}