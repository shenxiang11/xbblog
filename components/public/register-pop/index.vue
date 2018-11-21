<template>
  <el-dialog
    :visible.sync="registerPopup"
    :before-close="handleClose"
    title="注册">
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
          v-model="form.mail">
          <el-button
            slot="append"
            :disabled="isCaptchaSend"
            @click="getCaptcha">{{ isCaptchaSend ? '已发送' : '发送验证码' }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="captcha">
        <el-input
          v-model="form.captcha" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password">
        <el-input
          v-model="form.password"
          type="password" />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="repassword">
        <el-input
          v-model="form.repassword"
          type="password" />
      </el-form-item>
    </el-form>
    <div
      slot="footer">
      <el-button @click="$store.dispatch('showLogin')">已注册,去登录</el-button>
      <el-button
        type="primary"
        @click="register">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.repassword !== '') {
          this.$refs.form.validateField('repassword')
        }
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      isCaptchaSend: false,
      form: {
        mail: '',
        captcha: '',
        password: '',
        repassword: ''
      },
      rules: {
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        repassword: [
          { required: true, validator: validateRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'registerPopup'
    ])
  },
  methods: {
    handleClose (done) {
      this.$store.commit(types.SET_REGISTERPOPUP, false)
    },
    getCaptcha () {
      this.$refs.form.validateField('mail', err => {
        if (err) {
          this.$message.error(err)
          return
        }
        this.$store.dispatch('getCaptcha', this.form.mail)
          .then(res => {
            this.$message.success('验证码发送成功')
            this.isCaptchaSend = true
          })
          .catch(err => {
            this.$message.error(err.response ? err.response.data : err.message)
          })
      })
    },
    register () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('regieter', this.form)
            .then(res => {
              this.$store.commit(types.SET_REGISTERPOPUP, false)
              this.$store.commit(types.SET_LOGINPOPUP, true)
            })
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
