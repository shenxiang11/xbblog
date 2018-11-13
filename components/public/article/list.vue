<template>
  <div>
    <div class="article-list">
      <list-item
        v-for="item in list"
        :key="item._id"
        :content="item" />
    </div>
  </div>
</template>

<script>
import ListItem from './item'

export default {
  components: {
    ListItem
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>


<style lang="scss">
.article-list {
  padding: 0 16px;
  background-color: #fff;
  box-shadow: 0 0 14px 2px #ebebeb;
  border-radius: 2px;
}
</style>
