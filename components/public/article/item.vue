<template>
  <article class="article">
    <nuxt-link
      :to="`/article/detail/${content._id}`"
      class="article-link">
      <h3 class="article-title">{{ content.title }}</h3>
      <div class="summary">
        <div
          v-if="content.thumb"
          class="thumb">
          <img
            :src="content.thumb">
        </div>
        <p class="description">{{ content.description }}</p>
      </div>
    </nuxt-link>
    <div class="status">
      <div class="meta">
        <div class="meta-item">
          <i class="iconfont icon-mulu"/>{{ content.category | category }}
        </div>
      </div>
      <time class="time">
        <i class="iconfont icon-shijian"/>{{ content.create_at | time }}
      </time>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>


<style lang="scss">
.article {
  &:not(:last-of-type) {
    border-bottom: 1px dashed #e6e6e6;
  }
  .article-link {
    display: block;
    overflow: hidden;
    text-decoration: none;
    .article-title {
      font-size: 16px;
      color: rgba(0,0,0,0.65);
      transition: all .3s ease;
    }
    &:hover > .article-title {
      transform: translateX(5px);
      text-decoration: underline;
    }
    .summary {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
      margin-bottom: 16px;
      .thumb {
        flex: 0 0 150px;
        position: relative;
        width: 150px;
        max-height: 90px;
        margin-right: 16px;
        font-size: 0;
        overflow: hidden;
        border: 4px solid #e6e6e6;
        img {
          width: 100%;
          height: auto;
          min-width: 0;
          min-height: 0;
          border-radius: 2px;
          object-fit: cover;
          transition: transform .3s cubic-bezier(.215,.61,.355,1);
          &:hover {
            transform: scale(1.1) rotate(2deg);
          }
        }
      }
      .description {
        font-size: 14px;
        flex: 1 0;
        margin: 0;
        text-align: justify;
        color: rgba(0,0,0,0.43);
        display: -webkit-box;
        line-height: 1.4;
        overflow: hidden;
        -webkit-line-clamp: 4;
      }
    }
  }
  .status {
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: rgba(0,0,0,0.43);
    .meta {
      flex: 1 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      .meta-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        margin-right: 12px;
        .iconfont {
          margin-right: 12px;
        }
      }
    }
    .time {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      margin-right: 12px;
      .iconfont {
        margin-right: 12px;
      }
    }
  }
}
</style>
