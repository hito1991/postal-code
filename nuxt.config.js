require('dotenv').config();
const { G_M_KEY } = process.env;


export default {
  ssr: false,

  env:{
    G_M_KEY : process.env.G_M_KEY,
  },
  head: {
    title: 'postal-code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~assets/css/common.scss',
  ],
  plugins: [
    { src: '~plugins/vee-validate' },
  ],

  components: true,
  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
  ],
  build: {
    babel: {
      compact: true
    }
  },
  dotenv: {
    path: process.cwd()
  },
  srcDir: 'src'
}
