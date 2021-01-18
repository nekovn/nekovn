import siteConfig from './_siteConfig'

export const modules = [
  // Doc: https://axios.nuxtjs.org/usage
  '@nuxtjs/axios',
  '@nuxtjs/style-resources',
  'nuxt-fontawesome',
  'vue-social-sharing/nuxt',
  '@nuxtjs/dotenv'
]
if (siteConfig.googleAnalytics.on && siteConfig.googleAnalytics.id) {
  modules.push('@nuxtjs/google-gtag')
}

export const modulesSettings = {
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faTimes', 'faSearch', 'faEnvelope', 'faUser', 'faBriefcase']
      }
    ]
  },
  styleResources: {
    scss: ['./assets/scss/_vars.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  'google-gtag': {
    id: siteConfig.googleAnalytics.id
  }
}
