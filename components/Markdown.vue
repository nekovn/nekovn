<template>
  <div class="content content" v-html="markdown">
  </div>
</template>
<script>
export default {
  name: 'Markdown',
  props: {
    markdown: { type: String, required: true }
  },
}
</script>

<style>
.content p {
  font-size: 19px;
}
</style>
