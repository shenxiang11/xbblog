<template>
  <div class="container page-articleDetail">
    <el-row
      :gutter="20">
      <el-col
        :span="12"
        :offset="6">
        <div class="article-detail">
          <div class="article">
            <h2 class="title">{{ article.title }}</h2>
            <div class="meta">
              <div class="meta-item category">
                <i class="iconfont icon-mulu"/>{{ article.category | category }}
              </div>
              <div class="meta-item pvs">
                {{ article.view }}次阅读
              </div>
            </div>
            <div
              v-if="article.thumb"
              class="thumb">
              <img
                :src="article.thumb"
                alt="">
            </div>
            <p
              v-if="article.description"
              class="description">{{ article.description }}</p>
            <div
              class="markdown-body"
              v-html="article.content" />
            <div class="article-info">
              <div class="created-at">发布时间：{{ article.create_at | datetime }}</div>
              <div class="updated-at">更新时间：{{ article.update_at | datetime }}</div>
              <div class="copyright">版权声明：自由转载-署名-非商业性使用<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a
                  href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                  target="_blank">CC BY-NC 3.0 CN</a>
              </div>
            </div>
            <div
              v-if="article.tag.length"
              class="tags">
              <span
                v-for="tag in article.tag"
                :key="tag._id"
                class="tag">{{ tag.name }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  async asyncData ({ app, params, error }) {
    const res = await app.$axios.$get(`/api/article/client/${params.id}`)

    res && (res.result.content = marked(res.result.content))

    const { result } = await app.$axios.$get(`/api/wechat/params?url=${encodeURIComponent(location.href)}`)

    return {
      article: res.result,
      wechatparams: result
    }
  },
  data () {
    return {
      article: {}
    }
  },
  head () {
    return {
      title: this.article.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.article.tag.map(tag => tag.name).join(',') },
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  mounted () {
    this.initWxShare()
    this.article.style && this.runStyle()
    this.article.script && this.runScript()
  },
  destroyed () {
    window.__dynamicScriptClear__ && window.__dynamicScriptClear__()
    document.getElementById('DynamicStyle') && document.getElementById('DynamicStyle').remove()
    document.getElementById('DynamicScript') && document.getElementById('DynamicScript').remove()
  },
  methods: {
    initWxShare () {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wechatparams.appId, // 必填，公众号的唯一标识
        timestamp: this.wechatparams.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.wechatparams.nonceStr, // 必填，生成签名的随机串
        signature: this.wechatparams.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      })

      wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
        wx.updateTimelineShareData({
          title: '自定义分享标题', // 分享标题
          link: 'https://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://raw.githubusercontent.com/shenxiang11/staticStore/master/Carter.jpeg', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      })
    },
    runStyle () {
      const style = document.createElement('style')
      style.innerHTML = this.article.style
      style.id = 'DynamicStyle'
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    runScript () {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = this.article.script
      script.id = 'DynamicScript'
      document.getElementsByTagName('body')[0].appendChild(script)
    }
  }
}
</script>

<style lang="scss">
.page-articleDetail {
  .article-detail {
    margin: 16px 0;
    padding: 16px;
    overflow: hidden;
    position: relative;
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    .article {
      padding-top: 16px;
      line-height: 1.4;
      .title {
        margin: 16px 0;
        font-size: 20px;
        text-align: center;
        color: rgba(0,0,0,0.65);
      }
      .meta {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        margin: 12px 0 16px;
        color: rgba(0,0,0,0.43);
        font-size: 12px;
        .meta-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: nowrap;
          position: relative;
          margin-right: 12px;
          &:not(:first-of-type):before {
            content: "";
            display: block;
            width: 2px;
            height: 2px;
            box-sizing: border-box;
            margin-right: 4px;
            border: 1px solid rgba(0,0,0,0.43);
            border-radius: 1px;
          }
          .iconfont {
            margin-right: 8px;
          }
          &.category {
            color: rgba(0,0,0,0.65);
          }
        }
      }
      .thumb {
        width: 100%;
        img {
          box-sizing: border-box;
          width: 100%;
          margin-bottom: 16px;
          border: 6px solid #e6e6e6;
        }
      }
      .description {
        font-size: 16px;
        color: rgba(0,0,0,0.85);
        font-weight: 300;
      }
      .markdown-body {
        font-size: 16px;
        font-weight: 300;
        color: rgba(0,0,0,0.85);
        user-select: text;
      }
      .article-info {
        font-size: 14px;
        margin-top: 8px;
        padding: 8px;
        line-height: 2;
        background-color: #f2f2f2;
        border-left: 4px solid rgba(48,46,49,0.2);
        font-weight: 300;
        a {
          color: rgba(0,0,0,0.65);
        }
      }
      .tags {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed #e6e6e6;
        text-align: center;
        .tag {
          display: inline-block;
          margin: 0 8px 8px 0;
          padding: 4px 8px;
          border: 1px solid #e6e6e6;
          font-size: 12px;
          border-radius: 4px;
          transition: all .3s ease;
        }
      }
    }
  }
}

// copy
.markdown-body{font-size:16px;font-weight:300;color:rgba(0,0,0,0.85);;font-family:Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{font-weight:700;margin:1em 0;color:#000}.markdown-body hr{height:.05em;border:0;color:#e6e6e6;background-color:#e6e6e6;}.markdown-body blockquote{margin:1em 0;border-left:4px solid #e6e6e6;padding:0 1em;color:rgba(0,0,0,0.43)}.markdown-body pre{position:relative;font-size:inherit;padding:16px;overflow:auto;line-height:1.45;background-color:#f2f2f2;border-radius:2px}.markdown-body code{padding:.2em .4em;margin:0;font-size:85%;background-color:#ebebeb;border-radius:3px;font-family:monospace;font-weight:400;color:#f56a00}.markdown-body code.language-bash:after,.markdown-body code.language-c:after,.markdown-body code.language-cpp:after,.markdown-body code.language-cs:after,.markdown-body code.language-css:after,.markdown-body code.language-go:after,.markdown-body code.language-html:after,.markdown-body code.language-java:after,.markdown-body code.language-javascript:after,.markdown-body code.language-js:after,.markdown-body code.language-jsx:after,.markdown-body code.language-py:after,.markdown-body code.language-rb:after,.markdown-body code.language-swift:after,.markdown-body code.language-ts:after,.markdown-body code.language-typescript:after{position:absolute;top:0;right:0;display:block;text-align:right;font-size:80%;font-family:monospace;padding:0 10px;height:24px;line-height:24px;color:rgba(0,0,0,0.43);background-color:#e6e6e6;border-bottom-left-radius:2px}.markdown-body code.language-cpp:after{content:"C++"}.markdown-body code.language-java:after{content:"Java"}.markdown-body code.language-c:after{content:"C"}.markdown-body code.language-cs:after{content:"C#"}.markdown-body code.language-html:after{content:"Html"}.markdown-body code.language-css:after{content:"Css"}.markdown-body code.language-javascript:after,.markdown-body code.language-js:after{content:"JavaScript"}.markdown-body code.language-ts:after,.markdown-body code.language-typescript:after{content:"TavaScript"}.markdown-body code.language-jsx:after{content:"Jsx"}.markdown-body code.language-bash:after{content:"Bash"}.markdown-body code.language-py:after{content:"Python"}.markdown-body code.language-rb:after{content:"Ruby"}.markdown-body code.language-swift:after{content:"Swift"}.markdown-body code.language-go:after{content:"Go"}.markdown-body pre>code{border:0;margin:0;padding:0;background-color:#f2f2f2;font-size:85%;color:rgba(0,0,0,0.65)}.markdown-body a,.markdown-body a:visited{padding-bottom:4px;color:rgba(0,0,0,0.65);background-color:inherit;text-decoration:none;font-weight:700}.markdown-body a:hover,.markdown-body a:visited:hover{text-decoration:underline}.markdown-body img{max-width:100%;}.markdown-body img.image-view{border:6px solid #e6e6e6}.markdown-body .image-wrapper{text-align:center}.markdown-body .image-alt{text-align:center;color:rgba(0,0,0,0.43);font-size:80%}.markdown-body div,.markdown-body p{line-height:1.7em}.markdown-body ol,.markdown-body ul{padding-left:2em;list-style:disc}.markdown-body ol li,.markdown-body ul li{line-height:1.8}.markdown-body table{display:block;width:100%;overflow:hidden;border-spacing:0;border-collapse:collapse}.markdown-body table tr{background-color:#000;border-top:1px solid #e6e6e6}.markdown-body table tr:nth-child(2n){background-color:#f6f8fa}.markdown-body table td,.markdown-body table th{padding:6px 13px;border:1px solid #dfe2e5}.markdown-body table th{font-weight:600}.markdown-body blockquote,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{margin-top:0;margin-bottom:.72em}.markdown-body .hljs{display:block;overflow-x:auto;padding:.5em;color:rgba(0,0,0,0.65)}.markdown-body .hljs .comment,.markdown-body .hljs .quote{color:rgba(0,0,0,0.43);font-style:italic}.markdown-body .hljs .doctag,.markdown-body .hljs .formula,.markdown-body .hljs .keyword{color:#a626a4}.markdown-body .hljs .deletion,.markdown-body .hljs .name,.markdown-body .hljs .section,.markdown-body .hljs .selector-tag,.markdown-body .hljs .subst{color:#e45649}.markdown-body .hljs .literal{color:#0184bb}.markdown-body .hljs .addition,.markdown-body .hljs .attribute,.markdown-body .hljs .meta-string,.markdown-body .hljs .regexp,.markdown-body .hljs .string{color:#50a14f}.markdown-body .hljs .built_in,.markdown-body .hljs .class .title{color:#c18401}.markdown-body .hljs .attr,.markdown-body .hljs .number,.markdown-body .hljs .selector-attr,.markdown-body .hljs .selector-class,.markdown-body .hljs .selector-pseudo,.markdown-body .hljs .template-variable,.markdown-body .hljs .type,.markdown-body .hljs .variable{color:#986801}.markdown-body .hljs .bullet,.markdown-body .hljs .link,.markdown-body .hljs .meta,.markdown-body .hljs .selector-id,.markdown-body .hljs .symbol,.markdown-body .hljs .title{color:#4078f2}.markdown-body .hljs .emphasis{font-style:italic}.markdown-body .hljs .strong{font-weight:700}.markdown-body .hljs .link{text-decoration:underline}.keyword{color:#f56a00}.no-data{margin:16px 0;text-align:center}.indicator{text-align:center;font-size:12px}.indicator p{margin:0;color:rgba(0,0,0,0.43)}.indicator .loadmore{padding:6px 32px}.app.mobile-layout .indicator button{width:100%}.source.original{color:#302e31;background-color:rgba(48,46,49,0.2)}.source.reprint{color:#f56a00;background-color:rgba(245,106,0,.2)}.source.hybrid{color:#108ee9;background-color:rgba(16,142,233,.2)}.source.translate{color:#00a2ae;background-color:rgba(0,162,174,.2)}

.markdown-body{
  h2 {
    font-size: 18px;
  }
  h3 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
  }
}
</style>


