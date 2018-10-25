<template>
  <div class="site">
    <site-header />
    <nuxt class="site-center" />
    <site-footer />
  </div>
</template>

<script>
import Header from '@/components/public/header'
import Footer from '@/components/public/footer'

export default {
  components: {
    SiteHeader: Header,
    SiteFooter: Footer
  }
}
</script>


<style lang="scss">
</style>
