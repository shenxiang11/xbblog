<template>
  <div class="site">
    <site-header />
    <nuxt class="site-center" />
    <site-footer />
    <register-pop />
    <login-pop />
  </div>
</template>

<script>
import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import RegisterPop from '@/components/public/register-pop'
import LoginPop from '@/components/public/login-pop'

export default {
  components: {
    SiteHeader: Header,
    SiteFooter: Footer,
    RegisterPop,
    LoginPop
  }
}
</script>


<style lang="scss">
</style>
