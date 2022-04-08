<template>
  <el-row>
    <el-col :span="16">
      <div></div>
    </el-col>
    <el-col :span="8">
      <div class="login-box">
        <el-form :model="loginForm" :rules="rules" ref="loginForm"
                 label-width="80px">
          <el-form-item label="用户名" prop="username" style="width: 320px;">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 320px;">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 320px;">
            <el-input v-model="loginForm.code"
                      style="width: 110px; float: left"
                      maxlength="5"></el-input>
            <el-image :src="captchaImg" class="captchaImg"
                      @click="getCaptcha"></el-image>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录
            </el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

</template>

<script>

import qs from 'qs'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'root',
        password: 'root',
        code: '',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur'}
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {

            console.log(res)

            const jwt = res.headers['authorization']

            this.$store.commit('SET_TOKEN', jwt)
            this.$router.push("/index")
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {

        console.log("/captcha")
        console.log(res)

        this.loginForm.token = res.data.data.key
        this.captchaImg = res.data.data.captchaImg
        this.loginForm.code = ''
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  /*text-align: center;*/
  justify-content: center;
  background-image: url("../assets/login_background.jpg");;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.login-box {
  position: absolute;
  background-color: #fff;
  padding: 45px 40px 20px 30px;
  border-radius: 15px;
  top: 50%;
  margin-top: -150px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>
