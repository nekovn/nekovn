import SiteConfig from '~/config/_siteConfig'

export default ({ $axios,app,env }, inject) => {
  const api = $axios.create({});
  const wpApi = $axios.create({});
  const wpApiContact = $axios.create({});

  api.setBaseURL(env.baseUrl+'/wp/v2');
  wpApi.setBaseURL(env.baseUrl);
  wpApiContact.setBaseURL(env.baseUrl+'/contact-form-7/v1');

  inject('api',api);// đổi lại tên mới hay vì gọi $axios thì giờ gọi là $api
  inject('wpApi',wpApi);
  inject('wpApiContact',wpApiContact);// đổi lại tên mới hay vì gọi $axios thì giờ gọi là $api
  inject('siteConfig', SiteConfig)


}
