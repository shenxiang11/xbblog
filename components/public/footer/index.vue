<template>
  <footer class="site-footer">
    <div class="container">
      <p v-if="!$store.state.user">
        <a
          href="javascript:void(0);"
          @click="$store.dispatch('showRegister')">注册</a>
        |
        <a
          href="javascript:void(0);"
          @click="$store.dispatch('showLogin')">登录</a>
      </p>
      <p v-if="$store.state.user">
        用户名
        <nuxt-link :to="`/user/${$store.state.user._id}`">{{ $store.state.user.mail }}</nuxt-link>
        ,
        <a
          href="javascript:void(0)"
          @click="$store.dispatch('logout')">[退出]</a>
      </p>
      <p>Designed by 香饽饽zizizi</p>
      <p>Copyright © 2018. All Rights Reserved.</p>
      <p>沪ICP备17045412号-1</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  computed: {
    ...mapGetters([
      'token'
    ])
  }
}
</script>


<style lang="scss">
.site-footer {
  font-size: 12px;
  text-align: center;
  border-top: 1px solid #eee;
  background-color: #fff;
  a {
    color: #222;
    text-decoration: none;
  }
}
</style>
