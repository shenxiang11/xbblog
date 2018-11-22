<template>
  <div class="user-page">
    <el-row
      :gutter="20">
      <el-col
        :span="12"
        :offset="6">
        <div
          v-loading="loading"
          class="form">
          <div style="text-align:center;margin-bottom: 16px;">
            <el-upload
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/">
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar">
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <el-form
            :model="form"
            label-position="right"
            label-width="80px">
            <el-form-item label="邮箱">
              <el-input
                v-model="form.mail"
                disabled />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="网址">
              <el-input v-model="form.website" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit">更新</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const IMG_PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : location.origin

export default {
  data () {
    return {
      loading: true,
      imageUrl: '',
      form: {
        mail: '',
        nickname: '',
        website: '',
        portrait: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    this.initForm()
  },
  methods: {
    initForm () {
      setTimeout(() => {
        this.form.mail = this.user.mail
        this.form.nickname = this.user.nickname
        this.form.website = this.user.website
        this.imageUrl = IMG_PREFIX + this.user.portrait
        this.loading = false
      }, 1000)
    },
    onSubmit () {
      this.$store.dispatch('updateUserinfo', {
        _id: this.user._id,
        nickname: this.form.nickname,
        website: this.form.website,
        portrait: this.form.portrait
      })
        .then(() => {
          this.$message.success('更新成功')
        })
        .catch(err => {
          this.$message.error(err.response ? err.response.data : err.message)
        })
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }
      this.imageUrl = URL.createObjectURL(file)
      this.form.portrait = file
    }
  }
}
</script>


<style lang="scss">
.user-page {
  margin: 16px 0;
  overflow: hidden;
  .form {
    background-color: hsla(0,0%,100%,0.8);
    box-shadow: 0 0 14px 2px #ebebeb;
    border-radius: 2px;
    padding: 16px;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #222;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      object-fit: cover;
    }
  }
}
</style>
