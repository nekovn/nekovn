<template>
  <div>
    <h1 style="text-align: center">メニュー</h1>
    <a-row>
      <a-col :span="24">
        <div>
          <link-card/>
        </div>
      </a-col>
    </a-row>
    <drawer-contact :style="pStyle" @close="handleClose"/>
  </div>
</template>

<script>
export default {
  name: "drawer-sub-menu",
  layout: 'admin',
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
  },
}
</script>
