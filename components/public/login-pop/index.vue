<template>
  <el-dialog
    :visible.sync="loginPopup"
    :before-close="handleClose"
    title="登录">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width	="100px">
      <el-form-item
        label="邮箱"
        prop="mail">
        <el-input
          v-model="form.mail" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password">
        <el-input
          v-model="form.password"
          type="password" />
      </el-form-item>
    </el-form>
    <div
      slot="footer">
      <el-button @click="$store.dispatch('showRegister')">无账号,去注册</el-button>
      <el-button
        type="primary"
        @click="login">登录</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  data () {
    return {
      form: {
        mail: '',
        password: '',
      },
      rules: {
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginPopup'
    ])
  },
  methods: {
    handleClose (done) {
      this.$store.commit(types.SET_LOGINPOPUP, false)
    },
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('login', this.form)
            .catch(err => {
              this.$message.error(err.response ? err.response.data : err.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
