<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * defines all code for handling the plugin buttons and form display
 */

class VeryFast_HTML_Handler
{

    public function __construct()
    {
        $this->load_dependencies();
        $this->add_hooks();
    }

    //load dependencies
    private function load_dependencies()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-loader.php';
    }

    private function add_hooks()
    {
        //remove default checkout
        remove_action('woocommerce_proceed_to_checkout', 'woocommerce_button_proceed_to_checkout', 20);

        $priority = 22;

        add_action('woocommerce_before_add_to_cart_button', array($this, 'show_veryfast_button_on_product_page'), 10);
        add_action('woocommerce_proceed_to_checkout', array($this, 'button_on_cart_page'), $priority);
        add_action('woocommerce_widget_shopping_cart_buttons', array($this, 'button_on_minicart'), $priority);
        add_action('wp_body_open', array($this, 'veryfast_append_modal_selector'), 1);

    }

    /**
     *
     * Show VeryFast button on product page
     */
    public function show_veryfast_button_on_product_page()
    {
        global $product;
        $product_id = $product->get_id();

        $shipping_methods = wc_veryfast_get_shipping_methods();

        //to prevent from updating the global product object, just to create another WC product object by same id.
        $dummy_product = wc_get_product($product_id);

        if ($dummy_product->is_type('simple')) {
            $wc_product_is_purchasable = "true";
        } else {
            $wc_product_is_purchasable = "false";

            //TODO Add grouped product support
            if ($dummy_product->is_type('variable')) {
                $dummy_product = $this->get_variation_product($dummy_product);
            }
        }

        $parent_name = $dummy_product->get_name();
        $reference = $dummy_product->get_id();
        $price = $dummy_product->get_price();
        $name = $dummy_product->get_name();

        $params = apply_filters('wc_veryfast_filter_product_page_button_js_params', array(
            'product' => $dummy_product,
            'reference' => $reference,
            'price' => $price,
            'name' => $name,
            'parent_name' => $parent_name,
            'wc_product_is_purchasable' => $wc_product_is_purchasable,
            'currency' => get_woocommerce_currency(),
            'apiKey' => wc_veryfast()->get_settings()['apiKey'],
            'shipping_methods' => json_encode($shipping_methods),
            'vf_callback_url' => wc_veryfast()->get_callback_url(),
        ));

        echo '<button class="veryfast-button" id="product-page-veryfast-checkout">Checkout VeryFast</button><br/>';

        $modal_html = <<<MOD
        <div class="modal fade" id="confirmCheckoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmCheckoutLabel">CONFIRM CHECkout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Proceeding will automatically add this product to cart
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="veryFast_proceed" class="btn btn-primary">Proceed</button>
            </div>
            </div>
        </div>
        </div>
        MOD;
        echo $modal_html;
        echo '<script>';
        echo $this->render('product_page_button.js.php', $params);
        echo '</script>';
    }

    /**
     * Show the button on cart page.
     *
     * @since 1.0
     */
    public function button_on_cart_page()
    {
        $shipping_methods = (object) wc_veryfast_get_shipping_methods();
        $cart_content = wc_veryfast_get_cart();
        if ($cart_content) {
            $cart_content = (object) $cart_content;
        }

        $params = array(
            'currency' => get_woocommerce_currency(),
            'apiKey' => wc_veryfast()->get_settings()['apiKey'],
            'cart_content' => json_encode($cart_content),
            'shipping_methods' => json_encode($shipping_methods),
            'vf_callback_url' => wc_veryfast()->get_callback_url(),
        );

        echo '<button class="veryfast-button" id="cart-page-veryfast-checkout">Checkout VeryFast</button><br/>';

        echo '<script>';
        echo $this->render('cart_page_button.js.php', $params);
        echo '</script>';

        //check if user was redirected back from checkout url
        // if true display checkout modal straightaway
        if (isset($_GET['_wpnonce'])) {
            $verify = wp_verify_nonce($_GET['_wpnonce'], 'veryfast_checkout_redirect');
            if ($verify == 1) {
                echo "<script>vf_Checkout()</script>";
            }
        }
    }

    /**
     * Show button on minicart widget of woocommerce.
     *
     * @since 1.1
     */
    public function button_on_minicart()
    {

    }

    public function veryfast_append_modal_selector()
    {
        echo "<div id='veryFast_Container'></div>";
    }

    /**
     * Get variation of variable product.
     *
     * @since  2.4.0
     * @access private
     */
    private function get_variation_product($variable_product)
    {
        $attributes = $variable_product->get_default_attributes();
        if (!$attributes) {
            $available_variations = $variable_product->get_available_variations();
            $attributes = $available_variations[0]['attributes'];
        }
        if ($attributes) {
            $data_store = \WC_Data_Store::load('product');
            $variation_id = $data_store->find_matching_product_variation($variable_product, $attributes);
            if ($variation_id) {
                $variation_product = wc_get_product($variation_id);
            }
        }

        return isset($variation_product) ? $variation_product : $variable_product;
    }

    /** */
    public function render($template_name, array $parameters = array(), $render_output = false)
    {
        foreach ($parameters as $name_render => $value_render) {
            ${$name_render} = $value_render;
        }
        $template_path = apply_filters(
            'veryfast_template_path',
            plugin_dir_path(dirname(__FILE__)) . "/includes/views/" . $template_name,
            $template_name);
        ob_start();

        include $template_path;
        $output = ob_get_contents();
        ob_end_clean();

        if ($render_output) {
            echo $output;
        } else {
            return $output;
        }
    }
}