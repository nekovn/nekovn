<template>
  <generic-card
    :title="getTitle"
    :image="getImage"
    :link="link"
    :image-dimensions="
      $siteConfig.posts.imageDimensions ||
        $siteConfig.cards.imageDimensions ||
        null
    "
  >
    <span
      v-if="author && $siteConfig.posts.displayAuthor"
      class="author-wrapper"
    >
      <strong>Tác giả:</strong> {{ getAuthor }} |
    </span>
    <span v-if="date" class="date-wrapper">
      <strong>Ngày đăng:</strong> {{ datePretty }}
    </span>
  </generic-card>
</template>

<script>
import GenericCard from './GenericCard'
import {  getFormattedDate } from '~/helpers'
export default {
  components: { GenericCard },
  props: {
    title: {
      type: Object,
      default: null
    },
    image: { type: String, default: '' },
    link: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    author: {
      type: Object,
      default: null
    }
  },
  computed: {
    datePretty() {
      return getFormattedDate(this.date)
    },
    getImage(){
      if(this.image){
        return  this.image;
      }else{
        return '/uploads/800x600.jpg';
      }
    },
    getTitle(){
      if(this.title){
        return this.title.rendered;
      }
    },
    getAuthor(){
      if(this.author){
        return this.author.nickname;
      }
    }
  }
}
</script>
