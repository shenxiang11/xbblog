<template>
  <div class="page-about">
    <div class="portraiture">
      <img
        class="bg-img"
        src="@/assets/img/me.jpeg"
        alt="香饽饽zizizi">
      <div class="front-info">
        <img
          class="protrait"
          src="@/assets/img/me.jpeg"
          alt="香饽饽zizizi">
        <h3 class="my-name">香饽饽zizizi</h3>
      </div>
    </div>
    <div class="container">
      <el-row
        :gutter="20"
        class="about-me">
        <el-col
          :span="12"
          :offset="6">
          <blockquote><p>个人简介</p></blockquote>
          <p>名字：香饽饽zizizi</p>
          <p>籍贯：上海市 - 闵行区</p>
          <p>生日：1993-12-10</p>
          <p>喜好：Code.徐慧.Fitness</p>
          <p>学历：本科</p>
          <p>专业：软件工程</p>
          <blockquote><p>联系方式</p></blockquote>
          <p>邮箱：863461783@qq.com</p>
          <p>QQ：863461783</p>
          <p>微信：xiangge54288</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.page-about {
  background-color: #fff;
  padding-bottom: 32px;
  .portraiture {
    position: relative;
    z-index: 1;
    height: 300px;
    overflow: hidden;
    .bg-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(5px);
    }
    .front-info {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: hsla(0,0%,96%,.6);
      .protrait {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #e6e6e6;
      }
      .my-name {
        font-size: 36px;
        background: linear-gradient(270deg,#c4987a 33%,#ffd5bf 73%);
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .about-me {
    padding: 30px 0;
    background-color: #fff;
    blockquote {
      margin: 0;
      padding: 0 .9375rem;
      border-left: .25rem solid #ddd;
      color: #777;
    }
    p {
      font-size: 16px;
    }
  }
}
</style>
