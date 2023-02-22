<?php

/**
 *
 * * @wordpress-plugin
 * Plugin Name:       VERY FAST
 * Plugin URI:        https://www.veryfast.com
 * Description:       Very fast desc
 * Version:           1.0.0
 * Author:            Very Fast
 * Requires at least: 4.0
 */

/**
 * Define global variables start
 */
if (!defined('VERYFAST_PLUGIN_FILE')) {
    define('VERYFAST_PLUGIN_FILE', __FILE__);
}
if (!defined('VERYFAST_PLUGIN_DIR')) {
    define('VERYFAST_PLUGIN_DIR', plugin_dir_path(__FILE__));
}
if (!defined('VERYFAST_PLUGIN_DIR_INCLUDE')) {
    define('VERYFAST_PLUGIN_DIR_INCLUDE', VERYFAST_PLUGIN_DIR . 'includes');
}
if (!defined('VERYFAST_PLUGIN_DIR_VIEW')) {
    define('VERYFAST_PLUGIN_DIR_VIEW', VERYFAST_PLUGIN_DIR_INCLUDE . '/view');
}

// plugin version variable
if (!defined('WC_VERYFAST_VERSION')) {
    $plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);
    define('WC_VERYFAST_VERSION', $plugin_data['Version']);
}

/**
 * defines plugin name constant, used when ensuring that auto-update is enabled
 * for the plugin
 */
if (!defined('WC_VERYFAST_PLUGIN_NAME')) {
    define('WC_VERYFAST_PLUGIN_NAME', 'VeryFast');
}
/**
 * Global Variables end
 */

function woocommere_dependence_notice()
{
    echo '<div class="error"><p><strong>' . __("<strong>VeryFast Checkout</strong> requires <a href='https://wordpress.org/plugins/woocommerce/' target='_blank'><strong>WooCommerce</strong></a> in order to work.   <a href='" . get_admin_url(null, 'plugins.php') . "'><strong>Plugins page >></strong></a>", 'bolt-checkout-woocommerce') . '</strong></p></div>';
}

// Check if woocommerce is installed or not.
if (!in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
//     // Deactive plugin if woocommerce is not activated.
    //     $key = array_search((array) VERYFAST_PLUGIN_FILE, $active_plugins);
    //     unset($active_plugins[$key]);
    //     update_option('active_plugins', $active_plugins);
    // deactivate_plugins(plugin_basename(__FILE__));
    add_action('admin_notices', 'woocommere_dependence_notice');
}

/**
 * Main instance of VeryFast Checkout.
 *
 * Returns the main instance of VeryFast Checkout to prevent the need to use globals.
 *
 * @return VeryFast
 * @since  1.3.2
 */
function wc_veryfast()
{
    return VeryFast::get_instance();
}

/**
 * Execute plugin
 */
function run_VeryFast()
{
    require plugin_dir_path(__FILE__) . 'includes/class-main.php';

    $plugin = new VeryFast();
    $plugin->run();
}

// //run plugin when all plugins have loaded
add_action('plugins_loaded', 'run_VeryFast');