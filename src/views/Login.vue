<template>
  <el-row :gutter="20">
    <el-col :span="9" :offset="7">
      <div class="grid-content bg-purple">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <h2 class="welcome unSelect">欢迎使用考勤管理系统</h2>
          <el-form-item label="用户名" prop="username" class="unSelect" style="width:380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="unSelect" style="width:380px">
            <el-input v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!--          <el-form-item label="验证码" prop="check" class="unSelect" style="width:380px">-->
          <!--            <el-input v-model="loginForm.check" style="width:170px;float: left"></el-input>-->
          <!--            <el-image src="" class="checkImg"></el-image>-->
          <!--          </el-form-item>-->
          <el-form-item style="width:380px">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        // check: '',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        // check: [
        //   {required: true, message: '请输入验证码', trigger: 'blur'},
        //   {min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur'}
        // ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8888/user/login', this.loginForm).then(res => {
            this.loginForm.token = res.data.data.token;
            this.$store.commit('SET_TOKEN', this.loginForm.token)
            this.$router.push("/")
          })
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.welcome {
  width: 450px;
  text-align: center;
  color: dimgray;
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
}

.unSelect {
  user-select: none;
}

.el-row {
  /*width:800px;*/
  display: flex;
  align-items: center;
}

.checkImg {
  float: left;
  margin-left: 10px;
  border-radius: 4px;
}
</style>
