import head from './config/head'
import { modules, modulesSettings } from './config/modules'
import plugins from './config/plugins'
import css from './config/css'


export default {
  mode: 'universal',
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Headers of the page
   */
  head: head,
  /*
   ** Global CSS
   */
  css: css,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: plugins,
  /*
   ** Nuxt.js modules
   */
  modules: modules,
  ...modulesSettings,
  /*
   ** Build configuration
   */
  env: {
    baseUrl : process.env.BASE_URL || 'http://learning-nuxtjs.xyz/blogs/wp-json',
  },

  components: true,

}

