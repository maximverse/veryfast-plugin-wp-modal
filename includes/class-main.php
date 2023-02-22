<?php
/**
 * The file that defines the core plugin class
 *
 *
 * */

class VeryFast
{
    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     * @var VeryFast_Loader
     */
    protected $loader;

    /**
     * Holds the instance
     *
     * @var object
     * @static
     */
    private static $instance;

    /**
     * callback class instance
     * @var WC_VeryFast_Callback
     */
    private $callbackInstance;

    public function __construct()
    {

        $this->load_dependencies();
        $this->add_admin_hooks();
        $this->add_public_hooks();
        $this->add_html_code();

        self::$instance = $this;

    }

    public static function get_instance()
    {
        if (!isset(self::$instance) && !(self::$instance instanceof VeryFast)) {
            self::$instance->load_dependencies();
            self::$instance->add_admin_hooks();
            self::$instance->add_public_hooks();
        }

        return self::$instance;
    }

    //load dependencies
    private function load_dependencies()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-loader.php';
        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-admin.php';

        /**
         * Classes responsible for VeryFast API on top of WooCommerce API
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-api.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-api-controller.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-public.php';

        /**
         * Html injection related code
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-html-handler.php';

        //include ajax php files
        require_once plugin_dir_path(dirname(__FILE__)) . 'ajax/cart_functions.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'ajax/add_to_cart.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'ajax/get_shipping_methods.php';

        /**
         * class of callback handling
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-callback.php';

        $this->loader = new VeryFast_Loader();
        $this->callbackInstance = new WC_VeryFast_Callback();
    }

    //register admin functionality
    private function add_admin_hooks()
    {
        $plugin_admin = new VeryFast_Admin($this->get_version());

        // $this->loader->add_filter('plugin_action_links_checkout-x/checkout-x.php', $plugin_admin, 'admin_settings_link');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
    }

    // register public hooks
    private function add_public_hooks()
    {
        $plugin_public = new VeryFast_Public($this->get_plugin_name(), $this->get_version());

        // $this->loader->add_action("woocommerce_init", $plugin_public, "page_visit");
        // $this->loader->add_action("woocommerce_add_to_cart", $plugin_public, "add_to_cart");
        $this->loader->add_action("template_redirect", $plugin_public, "redirect_from_checkout");

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
    }

    private function add_html_code()
    {
        new VeryFast_HTML_Handler();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name()
    {
        return WC_VERYFAST_PLUGIN_NAME;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     * @return    string    The version number of the plugin.
     */
    public function get_version()
    {
        return WC_VERYFAST_VERSION;
    }

    /**
     * Get VeryFast settings
     *
     * @return VeryFast settings
     * @since 2.0.3
     * @access public
     *
     */
    public function get_settings()
    {
        $version = '1.0';
        $admin = new VeryFast_Admin($version);
        $settings = $admin->adminSettingsIns->get_admin_settings();
        return $settings;
    }

    /**
     *
     */
    public function get_callback_url()
    {

        $url = $this->callbackInstance->wc_veryfast_get_callback_url();

        return $url;
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run()
    {
        $this->loader->run();
    }

}