import SiteConfig from '~/config/_siteConfig'
import https from 'https'

export default ({ $axios,app,env }, inject) => {
  const api = $axios.create({
    httpsAgent : new https.Agent({
      rejectUnauthorized : false
    })
  });
  const wpApi = $axios.create({
    httpsAgent : new https.Agent({
      rejectUnauthorized : false
    })
  });
  const wpApiContact = $axios.create({
    httpsAgent : new https.Agent({
      rejectUnauthorized : false
    })
  });

  api.setBaseURL(env.baseUrl+'/wp/v2');
  wpApi.setBaseURL(env.baseUrl);
  wpApiContact.setBaseURL(env.baseUrl+'/contact-form-7/v1');

  inject('api',api);// đổi lại tên mới hay vì gọi $axios thì giờ gọi là $api
  inject('wpApi',wpApi);
  inject('wpApiContact',wpApiContact);// đổi lại tên mới hay vì gọi $axios thì giờ gọi là $api
  inject('siteConfig', SiteConfig)


}
