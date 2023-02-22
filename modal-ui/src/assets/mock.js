export const dummyPayload = {
  cart: {
    data: {
      '6512bd43d9caa6e02c990b0a82652dca': {
        key: '6512bd43d9caa6e02c990b0a82652dca',
        product_id: 11,
        variation_id: 0,
        variation: [],
        quantity: 643,
        data_hash: 'b5c1d5ca8bae6d4896cf1807cdf763f0',
        line_tax_data: {
          subtotal: [],
          total: [],
        },
        line_subtotal: 19290,
        line_subtotal_tax: 0,
        line_total: 19290,
        line_tax: 0,
        data: {},
        product: {
          name: 'Product 1',
          id: 11,
          price: '30',
          regular_price: '30',
          sale_price: '',
          image:
            '<img width="450" height="450" src="http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-450x450.webp" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async" loading="lazy" srcset="http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-450x450.webp 450w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-100x100.webp 100w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-600x598.webp 600w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-300x300.webp 300w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/49-150x150.webp 150w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/49.webp 716w" sizes="(max-width: 450px) 100vw, 450px" />',
          image_url:
            'http://localhost:8888/wordpress/wp-content/uploads/2023/01/49.webp',
          variations: [],
          attributes: [],
        },
        currency_symbol: '&#8358;',
      },
      c74d97b01eae257e44aa9d5bade97baf: {
        key: 'c74d97b01eae257e44aa9d5bade97baf',
        product_id: 16,
        variation_id: 0,
        variation: [],
        quantity: 12,
        data_hash: 'b5c1d5ca8bae6d4896cf1807cdf763f0',
        line_tax_data: {
          subtotal: [],
          total: [],
        },
        line_subtotal: 1200,
        line_subtotal_tax: 0,
        line_total: 1200,
        line_tax: 0,
        data: {},
        product: {
          name: 'Product 2',
          id: 16,
          price: '100',
          regular_price: '100',
          sale_price: '',
          image:
            '<img width="450" height="450" src="http://localhost:8888/wordpress/wp-content/uploads/2023/01/99-450x450.webp" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async" loading="lazy" srcset="http://localhost:8888/wordpress/wp-content/uploads/2023/01/99-450x450.webp 450w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/99-100x100.webp 100w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/99-300x300.webp 300w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/99-150x150.webp 150w, http://localhost:8888/wordpress/wp-content/uploads/2023/01/99.webp 716w" sizes="(max-width: 450px) 100vw, 450px" />',
          image_url:
            'http://localhost:8888/wordpress/wp-content/uploads/2023/01/99.webp',
          variations: [],
          attributes: [],
        },
        currency_symbol: '&#8358;',
      },
    },
  },
  merchantApiKey: '0716cf66-af05-4faa-b506-79e9e60fefa4',
  currencySymbol: '&#8358;',
  currency: 'NGN',
  callback_url: 'http://localhost:8888/wordpress/wc-api/wc_veryfast_callback',
  shipping_methods: {
    0: {
      zone_id: 0,
      zone_name: 'Locations not covered by your other zones',
      zone_locations: [],
      formatted_locations: 'Everywhere',
      methods: {
        4: {
          method_id: 4,
          user_title: 'DHL shipping',
          method_title: 'Flat rate',
          description: '<p>Lets you charge a fixed rate for shipping.</p>\n',
          rate_id: 'flat_rate:4',
          is_enabled: true,
          cost: '2500',
          rates: [],
        },
        5: {
          method_id: 5,
          user_title: 'FEDEX international',
          method_title: 'Flat rate',
          description: '<p>Lets you charge a fixed rate for shipping.</p>\n',
          rate_id: 'flat_rate:5',
          is_enabled: true,
          cost: '2000',
          rates: [],
        },
      },
    },
    1: {
      zone_id: 1,
      zone_name: 'Nigeria',
      zone_locations: [
        {
          code: 'NG',
          type: 'country',
        },
      ],
      formatted_locations: 'Nigeria',
      methods: {
        1: {
          method_id: 1,
          user_title: 'Free shipping',
          method_title: 'Free shipping',
          description:
            '<p>Free shipping is a special method which can be triggered with coupons and minimum spends.</p>\n',
          rate_id: 'free_shipping:1',
          is_enabled: true,
          cost: null,
          rates: [],
        },
        2: {
          method_id: 2,
          user_title: 'Local pickup',
          method_title: 'Local pickup',
          description:
            '<p>Allow customers to pick up orders themselves. By default, when using local pickup store base taxes will apply regardless of customer address.</p>\n',
          rate_id: 'local_pickup:2',
          is_enabled: true,
          cost: '250',
          rates: [],
        },
        3: {
          method_id: 3,
          user_title: 'Express waybill',
          method_title: 'Flat rate',
          description: '<p>Lets you charge a fixed rate for shipping.</p>\n',
          rate_id: 'flat_rate:3',
          is_enabled: true,
          cost: '1000',
          rates: [],
        },
      },
    },
    2: {
      zone_id: 2,
      zone_name: 'TestLocal',
      zone_locations: [
        {
          code: 'NG:NA',
          type: 'state',
        },
        {
          code: '351110',
          type: 'postcode',
        },
        {
          code: '360101',
          type: 'postcode',
        },
      ],
      formatted_locations: 'Nasarawa, 351110, 360101',
      methods: {
        6: {
          method_id: 6,
          user_title: 'Flat rate',
          method_title: 'Flat rate',
          description: '<p>Lets you charge a fixed rate for shipping.</p>\n',
          rate_id: 'flat_rate:6',
          is_enabled: true,
          cost: '130',
          rates: [],
        },
      },
    },
  },
};
