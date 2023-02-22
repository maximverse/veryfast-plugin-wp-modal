<?php
/**
 * The file that defines the callback class
 * needed for handling webhook calls to this plugin
 *
 * */

class WC_VeryFast_Callback
{
    public function __construct()
    {
        // webhook setup
        add_action('woocommerce_api_' . strtolower(get_class($this)), array($this, 'payment_callback'));
    }

    /**
     * Webhook
     * callback function
     */
    public function payment_callback()
    {
        $raw_post = file_get_contents('php://input');

        $decoded = json_decode($raw_post);

        $storedApiKey = wc_veryfast()->get_settings()['apiKey'];

        //stored key must match incoming key
        $callback_apikey = $decoded->apiKey;
        if ($callback_apikey != $storedApiKey) {
            $data = array(
                'message' => 'Unauthorized',
                'status' => 401,
                'error' => array($storedApiKey, $decoded),
            );

            wp_send_json($data, 401);
            wp_die();
        }

        $shipping_method = $decoded->shipping;
        $products = $decoded->products;
        $billing_details = $decoded->billingDetails;

        //create order
        $order = wc_create_order();

        //add products
        foreach ($products as $product) {
            $order->add_product(wc_get_product($product->id), $product->quantity);
            /**
             * TODO
             * add logic for variation products
             */
        }

        // create shipping object
        $shipping = new WC_Order_Item_Shipping();
        $shipping->set_method_title($shipping_method->user_title);
        if (!is_null($shipping_method->cost)) {
            $shipping->set_total($shipping_method->cost);
        }
        $shipping->set_method_id($shipping_method->rate_id);

        //add shipping to order
        $order->add_item($shipping);

        //set address
        $address = array(
            'first_name' => $billing_details->firstName,
            'last_name' => $billing_details->lastName,
            'company' => '',
            'email' => $billing_details->email,
            'phone' => $billing_details->phone,
            'address_1' => $billing_details->address,
            'address_2' => '',
            'city' => '',
            'state' => $billing_details->state,
            'postcode' => '',
            'country' => $billing_details->country,
        );

        //
        $order->set_address($address, 'billing');
        $order->set_address($address, 'shipping');

        // set payment method
        $order->set_payment_method('stripe');
        $order->set_payment_method_title('VeryFast credit/debit card payment');

        //set status
        $order->set_status('wc-completed');

        // calculate and save
        $order->calculate_totals();
        $order->save();

        $response = array(
            "order" => $order,
        );

        wp_send_json($response);
        wp_die();
    }

    public function wc_veryfast_get_callback_url()
    {
        $callback_url = get_site_url() . "/" . "wc-api/" . strtolower(get_class($this));

        return $callback_url;
    }
}