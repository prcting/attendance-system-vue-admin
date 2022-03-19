<template>
  <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="Index">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-submenu default-active="Index" :index="menu.name" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>
      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>

export default {
  name: "SideMenu",
  data() {
  },
  computed: {
    menuList() {
      return this.$store.state.menus.menuList
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-menu {
  height: 100%;
}
</style>
