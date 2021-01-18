<template>
  <resource-grid
    v-bind="$props"
    :resource="resource"
    :theme="$siteConfig.categories.theme || $siteConfig.cards.theme || null"
  >
    <template v-slot:default="{ item }">
      <category-card
        :title="item.title"
        :link="item.slug ? `/categories/${item.slug}` : ''"
        :image="item.image"
      />
    </template>
  </resource-grid>
</template>

<script>
import CategoryCard from '~/components/cards/CategoryCard'
export default {
  name: 'CategoriesGrid',
  components: { CategoryCard },
  props: {
    perRow: { type: Number, default: 3 },
    resource: { required: true },
  }
}
</script>
