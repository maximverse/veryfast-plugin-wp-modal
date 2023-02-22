<?php //
add_action('wp_ajax_wc_veryfast_get_cart', 'wc_veryfast_get_cart_ajax');
add_action('wp_ajax_nopriv_wc_veryfast_get_cart', 'wc_veryfast_get_cart_ajax');

function wc_veryfast_get_cart_ajax()
{
    $cart_withproduct = wc_veryfast_get_cart();

    if ($cart_withproduct) {
        wp_send_json_success($cart_withproduct);
    }
    wp_die();
}

function wc_veryfast_get_cart()
{
    $cart = WC()->cart;
    if ($cart) {
        $cart_content = $cart->get_cart();
        $cart_content_data = $cart_content;
        $cart_withproduct = [];

        // echo ('cart contents ' . $cart_content);
        foreach ($cart_content_data as $key => $cart_item) {
            $cart_withproduct[$key] = $cart_item;
            $product = $cart_item['data'];
            $cart_withproduct[$key]['product'] = array(
                'name' => $product->get_name(),
                'id' => $product->get_id(),
                'price' => $product->get_price(),
                'regular_price' => $product->get_regular_price(),
                'sale_price' => $product->get_sale_price(),
                'image' => $product->get_image(),
                'image_url' => wp_get_attachment_url($product->get_image_id()),
                'variations' => $product->get_children(),
                'attributes' => $product->get_attributes(),
            );
            $cart_withproduct[$key]['currency_symbol'] = get_woocommerce_currency_symbol(get_woocommerce_currency());
        }

        return $cart_withproduct;
    }
}
