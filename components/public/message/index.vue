<template>
  <div class="message">
    <a
      href="javascript:;"
      arget="_blank"
      class="user">
      <img
        src="@/assets/img/logo_s.png"
        class="avatar">
      <span class="name">{{ message.user && message.user.mail }}</span>
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
