<template>
  <button
    v-if="!href"
    :class="classNames">
    <AppLoadingSvg v-if="isLoading"/>
    <slot/>
  </button>
  <nuxt-link
    v-else :to="href" :class="classNames">
    <slot/>
    <AppLoadingSvg v-if="isLoading "/>
  </nuxt-link>
</template>

<script>
    import AppLoadingSvg from "./AppLoadingSvg";
    export default {
      components: {AppLoadingSvg},
      props:{
          href:{
            type:String,
            default:''
          },
          type:{
            type:String,
            default: 'default'
          },
          isSizeLarge:{
            type:Boolean,
            default:false
          },
          isLoading:{
            type:Boolean,
            default:false
          }
        },
      computed:{
          classNames(){
            return{
              'btn':true,
              'btn-default':this.type  === 'default',
              'btn-category':this.type === 'category',
              'btn-primary':this.type  === 'primary',
              'btn-size-large':this.isSizeLarge,
            }
          }
      }
    }
</script>

<style>
  @import url('@/assets/css/button.css');
</style>
