<template>
  <div class="message">
    <a
      href="javascript:;"
      arget="_blank"
      class="user">
      <img
        :src="(message.user && message.user.portrait) ? `${IMG_PREFIX}${message.user.portrait}`: require('@/assets/img/defaultAvatar.jpg')"
        class="avatar">
      <span class="name">{{ message.user && (message.user.nickname || message.user.mail) }}</span>
    </a>
    <div
      class="content"
      v-html="message.message" />
    <div class="meta">
      <time class="time">{{ message.create_at | datetime }}</time>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      IMG_PREFIX: ''
    }
  },
  mounted () {
    this.IMG_PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : location.origin
  }
}
</script>


<style lang="scss" scoped>
.message {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  margin-bottom: 16px;
  background-color: hsla(0,0%,100%,0.8);
  box-shadow: 0 0 14px 2px #ebebeb;
  border-radius: 2px;
  .user {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    text-decoration: none;
    .avatar {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
    }
    .name {
      color: #222;
      font-size: 12px;
    }
  }
  .content {
    font-size: 14px;
    line-height: 1.4;
    margin: 12px 0;
    color: rgba(0,0,0,0.85);
    word-break: break-all;
  }
  .meta {
    text-align: right;
    font-size: 12px;
    color: rgba(0,0,0,0.43);
  }
}
</style>
