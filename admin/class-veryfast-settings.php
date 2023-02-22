<?php
//

/**
 * Class to handle all inputed merchant settings
 */

class VeryFast_Settings
{

    /**
     * Sandbox mode
     *
     * @since 1.0
     * @var bool
     */
    protected $sandbox_mode = true;

    public function __construct()
    {
/**
 * Register our veryfast_settings_init to the admin_init action hook.
 */
        add_action('admin_init', array($this, 'veryfast_settings_init'));
    }

    /**
     * custom option and settings
     */
    public function veryfast_settings_init()
    {
        // Register a new section in the "veryfast" page.
        add_settings_section(
            'veryfast_section_developers',
            __('VeryFast Settings', 'veryfast'),
            null,
            'veryfast'
        );

        // register_setting('veryfast', 'veryfast_env_checkbox');
        // add_settings_field(
        //     "veryfast-env-checkbox",
        //     __('Sandbox environment', 'veryfast'),
        //     array($this, "checkbox_display_callback"),
        //     "veryfast",
        //     "veryfast_section_developers");

        register_setting('veryfast', 'veryfast_merchant_key');
        add_settings_field(
            "veryfast-merchant-key",
            __('Merchant Api Key', 'veryfast'),
            array($this, "checkbox_display_merchant_key_field"),
            "veryfast",
            "veryfast_section_developers");
    }

    public function get_admin_settings()
    {
        $key_option = get_option('veryfast_merchant_key');
        $settings = array(
            'apiKey' => $key_option,
        );

        return $settings;
    }

    public function checkbox_display_callback()
    {
        $env_option = get_option('veryfast_env_checkbox');

        ?>
<!-- Here we are comparing stored value with 1. Stored value is 1 if user checks the checkbox otherwise empty string. -->
<input type="checkbox" name="veryfast_env_checkbox" value="1" <?php checked(1, $env_option, true);?> />
<?php
}

    public function checkbox_display_merchant_key_field()
    {
        $key_option = get_option('veryfast_merchant_key');
        ?>
<!-- Here we are comparing stored value with 1. Stored value is 1 if user checks the checkbox otherwise empty string. -->
<input type="text" name="veryfast_merchant_key" value="<?php echo $key_option; ?>" />
<?php
}

    /**
     * Top level menu callback function
     */
    public function veryfast_options_page_html()
    {
        // check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        // add error/update messages

        // check if the user have submitted the settings
        // WordPress will add the "settings-updated" $_GET parameter to the url
        if (isset($_GET['settings-updated'])) {
            // add settings saved message with the class of "updated"
            add_settings_error('veryfast_messages', 'veryfast_message', __('Settings Saved', 'veryfast'), 'updated');
        }

        // show error/update messages
        settings_errors('veryfast_messages');
        ?>
<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    <form action="options.php" method="post">
        <?php
// output security fields for the registered setting "veryfast"
        settings_fields('veryfast');
        // output setting sections and their fields
        // (sections are registered for "veryfast", each field is registered to a specific section)
        do_settings_sections('veryfast');
        // output save settings button
        submit_button('Save Settings');
        ?>
    </form>
</div>
<?php
}
}