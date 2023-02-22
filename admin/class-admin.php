<?php
/**
 * The admin-specific functionality of the plugin.
 *
 *
 */
class VeryFast_Admin
{
    private $version;

    /**
     * @var VeryFast_Settings
     */
    public $adminSettingsIns;

    const VERYFAST_WEBSITE_URL = "https://test.com";
    const BASE64_APP_ICON = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvbkA8L3RpdGxlPgogICAgPGcgaWQ9Imljb24iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0yNS42MjUsMjQgQzI2LjAxNzg1NzEsMjQgMjYuMzQ1MjM4MSwyMy44NjY2NjY3IDI2LjYwNzE0MjksMjMuNiBDMjYuODY5MDQ3NiwyMy4zMzMzMzMzIDI3LDIzIDI3LDIyLjYgTDI3LDIyLjYgTDI3LDkuNCBDMjcsOSAyNi44NjkwNDc2LDguNjY2NjY2NjcgMjYuNjA3MTQyOSw4LjQgQzI2LjM0NTIzODEsOC4xMzMzMzMzMyAyNi4wMTc4NTcxLDggMjUuNjI1LDggTDI1LjYyNSw4IEw2LjM3NSw4IEM1Ljk4MjE0Mjg2LDggNS42NTQ3NjE5LDguMTMzMzMzMzMgNS4zOTI4NTcxNCw4LjQgQzUuMTMwOTUyMzgsOC42NjY2NjY2NyA1LDkgNSw5LjQgTDUsOS40IEw1LDIyLjYgQzUsMjMgNS4xMzA5NTIzOCwyMy4zMzMzMzMzIDUuMzkyODU3MTQsMjMuNiBDNS42NTQ3NjE5LDIzLjg2NjY2NjcgNS45ODIxNDI4NiwyNCA2LjM3NSwyNCBMNi4zNzUsMjQgTDI1LjYyNSwyNCBaIE0yNS4zMzQ5MzY1LDEzLjI4NTg5ODQgTDYuMzM0OTM2NDksMTMuMjg1ODk4NCBMNi4zMzQ5MzY0OSwxMC43ODU4OTg0IEM2LjQwMDkwODcxLDkuNzg1ODk4MzggNi42MTUzMTg0Myw5LjI4NTg5ODM4IDYuOTc4MTY1NjYsOS4yODU4OTgzOCBMMjQuOTQzMTc5Nyw5LjI5NDcxNDExIEMyNS4yNzY3NzYxLDkuNDczMTI0MzcgMjUuMjY4OTY0Myw5Ljc4NTg5ODM4IDI1LjMzNDkzNjUsMTAuNzg1ODk4NCBMMjUuMzM0OTM2NSwxMy4yODU4OTg0IFogTTI0LjY1NTgwODksMjIuMzQ4MDc2MiBMNi45NDIyNjcyNywyMi4zNDgwNzYyIEM2LjU3OTQyMDA1LDIyLjM0ODA3NjIgNi4zNjUwMTAzMywyMi4xNjA1NzYyIDYuMjk5MDM4MTEsMjEuNzg1NTc2MiBMNi4yOTkwMzgxMSwyMS43ODU1NzYyIEw2LjI5OTAzODExLDE2LjM0ODA3NjIgTDI1LjI5OTAzODEsMTYuMzQ4MDc2MiBMMjUuMjk5MDM4MSwyMS43ODU1NzYyIEMyNS4yMzMwNjU5LDIyLjE2MDU3NjIgMjUuMDE4NjU2MiwyMi4zNDgwNzYyIDI0LjY1NTgwODksMjIuMzQ4MDc2MiBMMjQuNjU1ODA4OSwyMi4zNDgwNzYyIFogTTE3LjI2Nzk0OTIsMTkuMDY5NTQyMyBMMTcuMjY3OTQ5MiwxNy44NTg2NjA5IEw3LjI2Nzk0OTE5LDE3Ljg1ODY2MDkgTDcuMjY3OTQ5MTksMTkuMDY5NTQyMyBMMTcuMjY3OTQ5MiwxOS4wNjk1NDIzIFogTTI0LjI0NTE5MDUsMjAuODE2OTg3MyBMMjQuMjQ1MTkwNSwxNy44MTY5ODczIEwyMS4yNDUxOTA1LDE3LjgxNjk4NzMgTDIxLjI0NTE5MDUsMjAuODE2OTg3MyBMMjQuMjQ1MTkwNSwyMC44MTY5ODczIFogTTExLjkwMTkyMzgsMjEuMTY3NjE4NSBMMTEuOTAxOTIzOCwxOS45NTY3MzcyIEw3LjkwMTkyMzc5LDE5Ljk1NjczNzIgTDcuOTAxOTIzNzksMjEuMTY3NjE4NSBMMTEuOTAxOTIzOCwyMS4xNjc2MTg1IFoiIGlkPSLvhJkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCAxNi4wMDAwMDApIHJvdGF0ZSgzMzAuMDAwMDAwKSB0cmFuc2xhdGUoLTE2LjAwMDAwMCwgLTE2LjAwMDAwMCkgIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==";

    public function __construct($version)
    {
        $this->version = $version;

        add_action('admin_menu', array($this, 'add_menu'), 50);

        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-veryfast-settings.php';

        //initialize admin settings
        $this->adminSettingsIns = new VeryFast_Settings();
    }

    public function enqueue_styles()
    {
        wp_enqueue_style('veryfast-admin', plugin_dir_url(VERYFAST_PLUGIN_FILE) . 'assets/css/admin.css', array(), $this->version, 'all');
    }

    public function add_menu()
    {
        add_menu_page(
            'veryfast',
            'VeryFast Setup',
            'manage_options',
            'veryfast-settings',
            null,
            self::BASE64_APP_ICON,
            59
        );

        add_submenu_page(
            'veryfast-settings',
            'VeryFast settings',
            'General',
            'manage_options',
            'veryfast-settings',
            array($this, 'general_menu_page')
        );
    }

    public function general_menu_page()
    {

        require_once 'partials/settings-page-header.php';
        $this->adminSettingsIns->veryfast_options_page_html();
    }

    public function veryfast_merchant_url($additional_path = "")
    {

        return esc_url(self::VERYFAST_WEBSITE_URL);
    }

    public function plugin_url()
    {
        return untrailingslashit(plugins_url('/', CHKX_PLUGIN_FILE));
    }
}