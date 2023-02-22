<?php
/**
 * Provide a admin area view for the plugin
 *
 */
?>

<div class="wrap general-settings">
    <section class='chkx--admin-section chkx--mb-3'>
        <h1 class='chkx--header'>
            <!-- <img class="chkx--header-logo" src="<?php echo esc_url($this->plugin_url()); ?>/assets/images/app_icon.png"
                alt="app_logo" /> -->
            <span>Checkout with VeryFast</span>
        </h1>
        <p>
            Version <?php wc_veryfast()->get_plugin_name();?>
        </p>
    </section>

    <a class='button button-primary chkx--button-primary-big'
        href="<?php echo esc_url($this->veryfast_merchant_url()); ?>" target="_blank">Open VeryFast</a>


</div>