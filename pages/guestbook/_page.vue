<template>
  <div class="guestbook">
    <el-row
      :gutter="20">
      <el-col
        :span="18"
        :offset="3">
        <div class="main">
          <div class="welcome">Stay Hungry, Stay Foolish</div>
          <button
            class="button"
            @click="showDialog">我要留言</button>
          <div class="count">已有{{ pagination.total }}条留言</div>
        </div>
        <div class="messages">
          <message
            v-for="item in list"
            :key="item._id"
            :message="item"/>
        </div>
        <div class="pagination-wrapper">
          <el-pagination
            :page-size="pagination.pageSize"
            :total="pagination.total"
            :current-page="pagination.currentPage"
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogPopup"
      title="留言">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width	="100px">
        <el-form-item
          label="留言"
          prop="message">
          <el-input
            v-model="form.message"
            type="textarea" />
        </el-form-item>
      </el-form>
      <div
        slot="footer">
        <el-button
          type="primary"
          @click="submit">留言</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import message from '@/components/public/message'
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ app, params, error }) {
    const res = await app.$axios.$get('/api/guestbook/list', {
      params: {
        pageSize: 50,
        currentPage: params.page
      }
    })

    return {
      list: res.result.list,
      pagination: res.result.pagination
    }
  },
  components: {
    message
  },
  data () {
    return {
      dialogPopup: false,
      form: {
        message: ''
      },
      rules: {
        message: [
          { required: true, message: '说点什么吧', trigger: 'blur' }
        ]
      },
      list: [],
      pagination: {}
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    showDialog () {
      if (!this.token) {
        this.$store.dispatch('showLogin')
        return
      }
      this.dialogPopup = true
    },
    submit () {
      this.$refs.form.validate(validate => {
        if (validate) {
          this.$store.dispatch('guestbook', this.form.message)
            .then(res => {
              this.dialogPopup = false
              if (this.pagination.pageSize > this.list.length) {
                this.list.push(res.result)
              }
              this.pagination.total += 1
              this.$message.success('留言成功')
            })
            .catch(err => {
              this.$message.error(err.response ? err.response.data : err.message)
            })
        }
      })
    },
    handlePageChange (page) {
      this.$router.push(`/guestbook/${page}`)
    }
  }
}
</script>


<style lang="scss">
.guestbook {
  overflow: hidden;
  margin: 16px 0;
  .main {
    margin: 48px 0;
    text-align: center;
    .welcome {
      width: 600px;
      color: rgba(0, 0, 0, 0.65);
      max-width: calc(100% - 64px);
      line-height: 1.8;
      margin: 0 auto;
      font-size: 24px;
      text-shadow: 0 5px 20px hsla(0,0%,100%,0.2);
    }
    .button {
      display: inline-block;
      margin: 36px 0 16px;
      padding: 6px 32px;
      border-radius: 2px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
      background: linear-gradient(135deg,#f21368,#e80505);
      color: #fff;
      border: none;
      box-shadow: 0 4px 8px rgba(232,5,5,.3);
      transition: all .3s ease;
      &:hover {
        box-shadow: 0 4px 25px rgba(232,5,5,.4);
      }
    }
    .count {
      font-size: 14px;
      color: rgba(0,0,0,0.43);
    }
  }
  .messages {
    column-count: 3;
    column-gap: 20px;
    break-inside: avoid;
  }
}
</style>
