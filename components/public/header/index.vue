<template>
  <header class="site-header">
    <div class="container">
      <nuxt-link to="/">
        <img
          class="site-logo"
          src="@/assets/img/logo.png"
          alt="">
      </nuxt-link>
      <ul class="nav">
        <!-- <li class="nav-item">
          <nuxt-link to="/">首页</nuxt-link>
        </li> -->
        <li class="nav-item list">
          <nuxt-link to="/">博客</nuxt-link>
          <dl>
            <dd><nuxt-link to="/article/code">代码</nuxt-link></dd>
            <dd><nuxt-link to="/article/think">思考</nuxt-link></dd>
            <dd><nuxt-link to="/article/fitness">健身</nuxt-link></dd>
          </dl>
        </li>
        <li class="nav-item">
          <nuxt-link to="/about">关于我</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/guestbook">留言板</nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
}
</script>


<style lang="scss">
.site-header {
  .container {
    height: 100%;
    .site-logo {
      height: 30px;
      margin-top: 5px;
    }
    .nav {
      padding: 0;
      margin: 0;
      height: 40px;
      line-height: 40px;
      float: right;
      .nav-item {
        font-size: 12px;
        list-style: none;
        float: left;
        width: 78px;
        box-sizing: border-box;
        text-align: center;
        a {
          color: #999;
          text-decoration: none;
          &:hover {
            color: #222;
          }
        }
        &.list:hover {
          border: 1px solid #E5E5E5;
          border-top: none;
          >dl {
            display: block;
            margin: 0;
            padding: 0;
          }
        }
        dl {
          background: hsla(0,0%,100%,.95);
          display: none;
          z-index: 999;
          dd {
            line-height: 35px;
            margin: 0;
            padding: 0;
            &:hover {
              color: #31BBAC;
            }
          }
        }
      }
    }
  }
}
</style>
