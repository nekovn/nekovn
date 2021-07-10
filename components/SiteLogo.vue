<template>
  <div class="logo-wrapper">
    <div
      :class="{
        'logo-inner': true,
      }"
    >
      <img src="/logo-frames/neko-logo.png"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SiteLogo',
  data() {
    return {
      frames: 5,
      currentFrame: 1,
      blinking: true
    }
  },
  mounted() {
    setInterval(() => {
      const rand = Math.ceil(Math.random() * 10)
      this.blinking = rand % 2
    }, 1000)
  }
}
</script>
<style lang="scss">
@keyframes logoBlink {
  100% {
    transform: translateY(-360px);
  }
}
.logo-wrapper {
  position: relative;
  height: 50px;
  overflow: hidden;
  width: 200px;
  .logo-inner {
    position: absolute;
    img {
          display: block;
          height: 110px;
          margin-top: -35px;
          max-height: none;
    }
  }
}
@media screen and (max-width: 575px) {
  .logo-wrapper {
    width: 100px;
  }
}


</style>
