<template>
  <div class="article-list">
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
  </div>
</template>

<script>
import ListItem from './item'

export default {
  components: {
    ListItem
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
