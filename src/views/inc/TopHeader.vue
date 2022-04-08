<template>
  <div>
    <strong class="unSelect">考勤管理系统</strong>
    <div class="header-avatar">
      <el-avatar size="medium"
                 :src="userInfo.avatar"></el-avatar>
      <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.username }}<i
                class="el-icon-arrow-down el-icon--right"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userCenter">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/userInfo").then(res => {
        this.userInfo = res.data.data
      })
    },
    logout() {
      const token = localStorage.getItem("token");
      this.$axios.get('logout', {
        headers: {
          Authorization: `${token}`,
          Accept: 'application/json'
        }
      }).then(res => {
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>
.header-avatar {
  float: right;
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

a {
  text-decoration: none;
}
</style>
