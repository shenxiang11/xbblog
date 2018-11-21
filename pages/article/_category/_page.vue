<template>
  <div class="container page-articleList">
    <el-row
      :gutter="20"
      class="article-wrapper">
      <el-col
        :span="12"
        :offset="6">
        <article-list
          :list="list"
          :pagination="pagination" />
        <div class="pagination-wrapper">
          <el-pagination
            :total="pagination.total"
            :current-page="pagination.currentPage"
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleList from '@/components/public/article/list'

export default {
  async asyncData ({ app, params, error }) {
    const res = await app.$axios.$get('/api/article/list/client', {
      params: {
        currentPage: params.page,
        category: params.category
      }
    })

    return {
      list: res.result.list,
      pagination: res.result.pagination
    }
  },
  components: {
    ArticleList
  },
  data () {
    return {
      list: [],
      pagination: {}
    }
  },
  methods: {
    handlePageChange (page) {
      this.$router.push(`/article/${this.$route.params.category}/${page}`)
    }
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
