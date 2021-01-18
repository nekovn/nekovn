<template>
  <div>
    <h1 style="text-align: center">{{title}}</h1>
    <a-row>
      <a-col :span="24">
        <div v-html="content"></div>
      </a-col>
    </a-row>
    <drawer-contact :style="pStyle" @close="handleClose"/>
  </div>
</template>

<script>
export default {
  name: "drawer",
  layout: 'admin',
  props:{
    title    : {type: String, default: ''},
    content  : {type: String, default: ''},
  },
  data(){
    return {
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
    }
  },
  methods:{
    handleClose(e){
      //kích hoạt 1 event để thay đổi data của nó
      this.$emit('close');
    },
  }
}
</script>
