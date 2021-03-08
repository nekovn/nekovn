<template>
  <div>
    <a-divider />
    <p :style="pStyle">
      Liên lạc
    </p>
    <get-social/>
    <a-divider />
    <div
      :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
    >
      <a-button type="primary" style="marginRight: 8px" @click="handleClose">
        Đóng
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props:{
    pStyle:{type:Object,default: null},
  },
  methods:{
    handleClose(e){
      //kích hoạt 1 event để thay đổi data của nó
      this.$emit('close');
    },
  }
}
</script>
