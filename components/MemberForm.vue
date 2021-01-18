<template>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <figure class="image is-1by1 ">
        <opti-image
          :src="getAvatar.src"
          :srcset="getAvatar.srcset"
        />
      </figure>
    <div class="message-userDetails">
      <template v-if="getRolesAuthor === 'Contributor'">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="11465" data-xf-init="member-tooltip" id="js-XFUniqueId24"><span :title="getNickName" class="username--style5 username--staff username--moderator username--admin">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBannerSuperModerator message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>{{getRolesAuthor}}</strong><span class="userBanner-after"></span></div>
      </template>
      <template v-if="getRolesAuthor === 'Administrator'">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span :title="getNickName"class="username--style24">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBanner userBanner--lightGreen message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>{{getRolesAuthor}}</strong><span class="userBanner-after"></span></div>
        <div class="userBanner blue message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Super Moderator</strong><span class="userBanner-after"></span></div>
        <div class="userBanner userBanner--staff message-userBanner" dir="auto" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Staff member</strong><span class="userBanner-after"></span></div>
      </template>
      <template v-if="getRolesAuthor === 'Author'">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="5832" data-xf-init="member-tooltip" id="js-XFUniqueId4"><span :title="getNickName" class="username--style22">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBanner userBanner--skyBlue message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>{{getRolesAuthor}}</strong><span class="userBanner-after"></span></div>
        <div class="userBanner userBanner userBanner--lightGreen message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Moderator</strong><span class="userBanner-after"></span></div>
      </template>
      <template v-if="getRolesAuthor === 'Editor'">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="49554" data-xf-init="member-tooltip" id="js-XFUniqueId19"><span :title="getNickName" class="username--style23">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBannerService message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>{{getRolesAuthor}}</strong><span class="userBanner-after"></span></div>
        <div class="userBanner userBanner userBanner--lightGreen message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Moderator</strong><span class="userBanner-after"></span></div>
        <div class="userBanner userBanner--staff message-userBanner" dir="auto" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Staff member</strong><span class="userBanner-after"></span></div>
      </template>
      <template  v-if="getRolesAuthor === 'Subscriber' && getVip === 0 ">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="91838" data-xf-init="member-tooltip" id="js-XFUniqueId10"><span :title="getNickName" class="username--style4 username--staff username--moderator username--admin">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBannerModerator message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span>
        <strong v-if="getPercent500">Member</strong><span class="userBanner-after"></span></div>
        <div v-if="getPercent1000" class="userBanner userBannerPro message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="thunderbolt" /></span><strong> Pro Member </strong><span class="userBanner-after"> <a-icon type="star" /></span></div>
        <div v-if="getPercent1000" class="userBanner userBannerPro message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="thunderbolt" /></span><strong> Pro Member </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /></span></div>
        <div v-if="getPercent1500" class="userBanner userBannerSupperPro message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="trophy" /></span><strong> SuperPro Member </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></span></div>
        <div v-if="getPercent2000" class="userBanner userBannerSupperPro message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="trophy" /></span><strong> SuperPro Member </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></span></div>
        <div v-if="getPercent2500" class="userBanner userBannerHero message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="sketch" /></span><strong> Hero </strong><span class="userBanner-after"></span> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></div>
        <div v-if="getPercent3000" class="userBanner userBannerHero message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="sketch" /></span><strong> Hero </strong><span class="userBanner-after"></span> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></div>
        <div v-if="getPercent3500" class="userBanner userBannerSupperHero message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="crown" /></span><strong> Super Hero </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></span></div>
        <div v-if="getPercent4000" class="userBanner userBannerLegend message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="fire" /></span><strong> Legend </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></span></div>
        <div v-if="getPercent5000" class="userBanner userBannerLegend message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="fire" /></span><strong> Super Legend </strong><span class="userBanner-after"> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /> <a-icon type="star" /></span> <a-icon type="star" /></div>

      </template>
      <template v-if="getRolesAuthor === 'Subscriber' && getVip === 1 ">
        <h4 class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="54289" data-xf-init="member-tooltip" id="js-XFUniqueId4"><span :title="getNickName" class="username--style7">{{getNickName}}</span></nuxt-link></h4>
        <h4 v-if="getDes" class="message-name"><nuxt-link :to="authorLink" class="username " dir="auto" itemprop="name" data-user-id="15053" data-xf-init="member-tooltip" id="js-XFUniqueId6"><span title="descriptions">{{getDes}}</span></nuxt-link></h4>
        <div class="userBanner userBannerVip message-userBanner" itemprop="jobTitle"><span class="userBanner-before"></span><strong>Vip</strong><span class="userBanner-after"></span></div>
        <div class="userBanner userBannerModeratorIdol message-userBanner" itemprop="jobTitle"><span class="userBanner-before"><a-icon type="star" /></span><strong> Member Idol</strong><span class="userBanner-after"></span></div>
      </template>
    </div>
    <div class="message-userExtras">
      <dl class="pairs pairs--justified">
        <dt>Joined</dt>
        <dd>{{ getDateRegistered }}</dd>
      </dl>
      <dl class="pairs pairs--justified">
        <dt>Posts</dt>
        <dd>{{ getTotalPost }}</dd>
      </dl>
      <dl class="pairs pairs--justified">
        <dt>Comments</dt>
        <dd>{{ getTotalCm }}</dd>
      </dl>
      <dl class="pairs pairs--justified">
        <dt>Views</dt>
        <dd>{{ getTotalView }}</dd>
      </dl>
      <dl v-if="getPercent500" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('500,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice500"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{ formatPrice }}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          500,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent500}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent1000" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('1,000,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice1000"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          1,000,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent1000}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent1500" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('1,500,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice1500"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          1,500,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent1500}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent2000" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('2,000,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice2000"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          2,000,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent2000}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent2500" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('2,500,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice2500"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          2,500,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent2500}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent3000" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('3,000,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice3000"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          3,000,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent3000}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent3500" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('3,500,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice3500"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          3,500,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent3500}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent4000" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('4,000,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice4000"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          4,000,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent4000}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent4500" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('4,500,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice4500"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          4,500,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent4500}"></div>
        </div>
      </div>
      </dl>
      <dl v-if="getPercent5000" class="pairs pairs--justified" data-field="credit_bar"><div class="credit-bar" :title="getTitleMoney('5,000,000')">
        <img src="data:image/png;base64,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" style="cursor: pointer;">
        <a v-if="!showPrice5000"  href="#" class="fauxBlockLink-blockLink u-concealed">
          {{formatPrice}}
        </a>
        <a v-else href="#" class="fauxBlockLink-blockLink u-concealed">
          5,000,000
        </a>
        <div class="credit-progress">
          <div class="credit-progress-bar red" :style="{width:getPercent5000}"></div>
        </div>
      </div>
      </dl>
    </div>
    <div class="content"v-if="getFacebookLink">
      <p>
        <strong>
          Gửi tin nhắn cho tôi
        </strong>
      </p>
      <a  :href="getFacebookLink" target="_blank">
        <a-icon type="twitter" style="color: #0da1a1;font-size: 20px"/>
      </a>
    </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "member-form",
  props: {
    getNickName  : {type: String, default: ''},
    getDateRegistered: {type: String, default: ''},
    getMoney     : {type: Number, default: 0},
    getTotalCm   : {type: Number, default: 0},
    getTotalView : {type: Number, default: 0},
    getTotalPost : {type: Number, default: 0},
    getVip       : {type: Number, default: 0},
    getRolesAuthor: {type : String, default: ''},
    authorLink: {type : String, default: ''},
    getFacebookLink: {type : String, default: ''},
    getDes: {type : String, default: ''},
    getAvatar: {type : Object, default: null}
  },
  data(){
    return {
      showPrice500:false,
      showPrice1000:false,
      showPrice1500:false,
      showPrice2000:false,
      showPrice2500:false,
      showPrice3000:false,
      showPrice3500:false,
      showPrice4000:false,
      showPrice4500:false,
      showPrice5000:false,
    }
  },
  methods:{
    getTitleMoney(price){
      return `Max: ${price} ₫`
    },
  },
  computed:{
    formatPrice(){
      const number = this.getMoney;
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
    },
    getPercent500(){
      //width: 100%
      const moneyRoot   =  0;
      const money       =  this.getMoney;
      const lastMoney   =  500000;
      const firstMoney  =  0;
      if(money >= firstMoney && money<=lastMoney){
        return (money/lastMoney)*100+'%';
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice500 = true;
        return "100%";
      }
      return  false;
    },
    getPercent1000(){
      const moneyRoot   =  500000;
      const money       =  this.getMoney;
      const lastMoney   =  1000000;
      const firstMoney  =  500000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice1000 = true;
        return "100%";
      }
      return  false;
    },
    getPercent1500(){
      const moneyRoot   =  1000000;
      const money       =  this.getMoney;
      const lastMoney   =  1500000;
      const firstMoney  =  1000000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice1500 = true;
        return "100%";
      }
      return  false;
    },
    getPercent2000(){
      const moneyRoot   =  1500000;
      const money       =  this.getMoney;
      const lastMoney   =  2000000;
      const firstMoney  =  1500000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice2000 = true;
        return "100%";
      }
      return  false;
    },
    getPercent2500(){
      const moneyRoot   =  2000000;
      const money       =  this.getMoney;
      const lastMoney   =  2500000;
      const firstMoney  =  2000000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice2500 = true;
        return "100%";
      }
      return  false;
    },
    getPercent3000(){
      const moneyRoot   =  2500000;
      const money       =  this.getMoney;
      const lastMoney   =  3000000;
      const firstMoney  =  2500000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice3000 = true;
        return "100%";
      }
      return  false;
    },
    getPercent3500(){
      const moneyRoot   =  3000000;
      const money       =  this.getMoney;
      const lastMoney   =  3500000;
      const firstMoney  =  3000000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice3500 = true;
        return "100%";
      }
      return  false;
    },
    getPercent4000(){
      const moneyRoot   =  3500000;
      const money       =  this.getMoney;
      const lastMoney   =  4000000;
      const firstMoney  =  3500000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice4000 = true;
        return "100%";
      }
      return  false;
    },
    getPercent4500(){
      const moneyRoot   =  4000000;
      const money       =  this.getMoney;
      const lastMoney   =  4500000;
      const firstMoney  =  4000000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice4500 = true;
        return "100%";
      }
      return  false;
    },
    getPercent5000(){
      const moneyRoot   =  4500000;
      const money       =  this.getMoney;
      const lastMoney   =  5000000;
      const firstMoney  =  4500000;
      if(money >= firstMoney && money<=lastMoney){
        var moneyMinus = (money-moneyRoot);
        var result     = ((moneyMinus*(lastMoney/500000))/lastMoney)*100;
        if(!result){
          return parseInt(0)+'%';
        }else {
          return result+'%';
        }
      }
      if(money >=lastMoney){
        this.showPrice5000 = true;
        return "100%";
      }
      return  false;
    },

  },
}
</script>

<style scoped>
@import '~/assets/css/meber.css';
</style>
