<template>
  <div class="menu-hamburger">
    <a-button style="height: 30px;padding: 0 7px" @click="showDrawer">
      <a-icon type="menu" />
    </a-button>
    <a-drawer placement="right" :closable="false" :visible="visible" @close="onClose">
      <drawer-sub-menu @close="onClose"/>
    </a-drawer>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
}
</script>
<style scoped>
.menu-hamburger{
  display: none;

}
@media screen and (max-width: 575px) {
  .menu-hamburger {
    display: block;
    font-size: 20px;
    margin-left: 6px;
    margin-top: 16px;
  }
}
@media all and (device-width: 414px) and (device-height: 736px) and (orientation:portrait) {
  .menu-hamburger {
    display: block;
    margin-left: 30px;
  }
}
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .menu-hamburger {
    display: block;
    font-size: 20px;
    margin-left: 40px;
    margin-top: 16px;
  }
}
@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
  .menu-hamburger {
    display: none;

  }
}
</style>
