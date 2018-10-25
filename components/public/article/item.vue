<template>
  <article class="article">
    <nuxt-link
      to="/"
      class="article-link">
      <h3 class="article-title">我所向往的技术团队</h3>
      <div class="summary">
        <div class="thumb">
          <img
            src="https://static.jooger.me/img/source/20181020/team_1540034403048.webp?x-oss-process=style/watermark">
        </div>
        <p class="description">本篇文章所讲的都只是我所向往的好的技术团队的一些我自己的看法，可能会有些片面，但是这就是我想说和想要的，也希望未来能和这样一个团队，和这个团队里的小伙伴们一起玩耍和工作</p>
      </div>
    </nuxt-link>
    <div class="status">
      <div class="meta">
        <div class="meta-item">
          <i class="iconfont icon-mulu"/>代码
        </div>
      </div>
      <time class="time">
        <i class="iconfont icon-shijian"/>2018-08-30
      </time>
    </div>
  </article>
</template>

<script>
export default {
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
