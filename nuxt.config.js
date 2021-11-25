import webpack from 'webpack'

export default {
  server: {
    port: 3004
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en',
      dir:'ltr'
    },
    title: 'ميم',
    titleTemplate: (process.env.APP_NAME ?? 'متجر ميم | تسوق اونلاين في فلسطين') + ' | %s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'ميم . ارخص الاسعار في فلسطين. التوصيل لباب البيت والدفع عند الاستلام'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'ميم . ارخص الاسعار في فلسطين. التوصيل لباب البيت والدفع عند الاستلام'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.PNG'
      },
      {
        rel: 'stylesheet',
        href: '/assets/vendor/font-awesome/css/all.min.css'
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/bootstrap.min.css'
      },
      // {
      //   rel: 'stylesheet',
      //   href: '/assets/css/bootstrap.rtl.min.css'
      // },
      {
        rel: 'stylesheet',
        href: '/assets/css/plugins/owl-carousel/owl.carousel.css'
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/plugins/magnific-popup/magnific-popup.css'
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/style.css'
      },
      // {
      //   rel: 'stylesheet',
      //   href: '/assets/css/style.rtl.css'
      // },
      {
        rel: 'stylesheet',
        href: '/assets/css/theme.css'
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/skin.css'
      },
    ],
    bodyAttrs: {
      'id': 'AppBody',
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    {
      src: '~/plugins/client/bootstrap',
      mode: 'client'
    },
    {
      src: '~/plugins/client/jquery.hoverIntent.min',
      mode: 'client'
    },
    {
      src: '~/plugins/client/jquery.waypoints.min.js',
      mode: 'client'
    },
    {
      src: '~/plugins/client/superfish.min.js',
      mode: 'client'
    },
    {
      src: '~/plugins/client/owl.carousel.min.js',
      mode: 'client'
    },
    {
      src: '~/plugins/client/bootstrap-input-spinner.js',
      mode: 'client'
    },
    {
      src: '~/plugins/client/jquery.magnific-popup.min.js',
      mode: 'client'
    },
    {
      src: '~/plugins/client/superfish.min.js',
      mode: 'client'
    },
    { src: '~/plugins/client/nouislider.min.js', },
    { src: '~/plugins/client/wNumb.js', },
    {
      src: '~/plugins/client/main.js',
      mode: 'client'
    },
    {
      src: '~/plugins/modal.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vuex-persist',
      ssr: false,
      mode: 'client'
    },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/router',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
  ],

  i18n: {
    locales: [
      {
        code: 'er',
        iso: 'er-US',
        file: 'en.js',
        dir: 'lang'
      },
      {
        code: 'ar',
        iso: 'ar-EG',
        file: 'ar.js',
        dir: 'lang'
      },

    ],
    defaultLocale: 'en',
    langDir: 'lang',
    strategy: 'no_prefix'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
      })
    ]

  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_API_URL
  },


  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      user: '/'
    },
    strategies: {
      'laravelPassport': {
        clientSecret: process.env.CLIENT_SECRET,
        provider: 'laravel/passport',
        endpoints: {
          user: { url: '/auth/me',method:"GET" }
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        url: process.env.BASE_API_URL,
        clientId: process.env.CLIENT_ID,
        grantType: 'password',
      },
    }
  }

}
