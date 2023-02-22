<?php
//

add_action('wp_ajax_wc_veryfast_get_shipping_methods', 'wc_veryfast_get_shipping_methods_ajax');
add_action('wp_ajax_nopriv_wc_veryfast_get_shipping_methods', 'wc_veryfast_get_shipping_methods_ajax');

function wc_veryfast_get_shipping_methods_ajax()
{
    $total_shipping_data = wc_veryfast_get_shipping_methods();
    wp_send_json_success($total_shipping_data);

    wp_die();
}

function wc_veryfast_get_shipping_methods()
{
    $total_shipping_data = [];
    foreach (vfast_get_all_shipping_zones() as $zone) {
        $zone_shipping_methods = $zone->get_shipping_methods();
        $zone_id = $zone->get_id();
        $zone_name = $zone->get_zone_name();
        $zone_locations = $zone->get_zone_locations();
        $formatted_locations = $zone->get_formatted_location(40);

        $zone_data = array(
            'zone_id' => $zone_id,
            'zone_name' => $zone_name,
            'zone_locations' => $zone_locations,
            'formatted_locations' => $formatted_locations,
        );

        foreach ($zone_shipping_methods as $index => $method) {
            //     $method_is_taxable = $method->is_taxable();
            $method_is_enabled = $method->is_enabled();
            $method_instance_id = $method->get_instance_id();
            $method_title = $method->get_method_title(); // e.g. "Flat Rate"
            $method_description = $method->get_method_description();
            $method_user_title = $method->get_title(); // e.g. whatever you renamed "Flat Rate" into
            $method_rate_id = $method->get_rate_id(); // e.g. "flat_rate:18"
            // $method_fee = $method->get_fee();
            $rates = $method->rates;
            $cost = null;
            if (property_exists($method, 'cost')) {
                $cost = $method->cost;
            }

            $zone_method_data = (object) array(
                'method_id' => $method_instance_id,
                'user_title' => $method_user_title,
                'method_title' => $method_title,
                'description' => $method_description,
                'rate_id' => $method_rate_id,
                //         'method_fee' => $method_fee,
                'is_enabled' => $method_is_enabled,
                'cost' => $cost,
                'rates' => $rates,
            );

            $zone_data['methods'][$method_instance_id] = $zone_method_data;
        }

        $total_shipping_data[$zone_id] = $zone_data;

    }

    return $total_shipping_data;
}

function vfast_get_all_shipping_zones()
{
    $data_store = WC_Data_Store::load('shipping-zone');
    $raw_zones = $data_store->get_zones();
    foreach ($raw_zones as $raw_zone) {
        $zones[] = new WC_Shipping_Zone($raw_zone);
    }
    $zones[] = new WC_Shipping_Zone(0); // ADD ZONE "0" MANUALLY
    return $zones;
}