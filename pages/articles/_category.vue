<template>
  <div class="container page-articleList">
    <div class="row article-wrapper">
      <div class="col-6 offset-3">
        <article-list />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/public/article/list'

export default {
  components: {
    ArticleList
  }
}
</script>

<style lang="scss">
.page-articleList {
  .article-wrapper {
    margin: 16px 0;
  }
}
</style>
