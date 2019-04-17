<template>
  <div class="lb-header">
    <div class="lb-container h100">
      <a href="/">
        <img src="@/assets/imgs/logo.png" alt="log" class="lb-logo fl">
      </a>
      <ul class="lb-nav fl h100">
        <li v-for="(nav,i) of navData" :key="i" class="h100 fl" @click="toggleNav(nav)">
          <a
            class="navli w100 h100"
            target="_blank"
            :href="nav.url"
            :class="{active:nav.active}"
            v-if="!nav.children"
          >{{ nav.text }}</a>
          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            v-if="nav.children"
            popper-class="lb-header-popover"
          >
            <ul>
              <li v-for="(tag,i1) of nav.children" :key="i1">
                <a :href="tag.url" target="_blank" class="text-center linkA h100 w100">{{tag.text}}</a>
              </li>
            </ul>
            <a slot="reference" class="navli w100 h100" :class="{active:nav.active}">{{ nav.text }}</a>
          </el-popover>
        </li>
        <li class="h100 fr" v-if="!user.token">
          <a class="navli w100 h100" @click="adminModalShow = true">后台管理</a>
        </li>
        <li class="h100 fr" v-if="user.token">
          <a class="navli w100 h100" @click="outLogin">{{user.userName}}</a>
        </li>
      </ul>
    </div>
    <el-dialog
      title="管理账号登陆"
      :visible.sync="adminModalShow"
      width="15%"
      :close-on-click-modal="false"
      v-loading="loginLoading"
    >
      <el-row>登陆账号</el-row>
      <el-row class="mb-10">
        <el-input v-model="user.name" placeholder="请输入账号"></el-input>
      </el-row>
      <el-row>登陆密码</el-row>
      <el-row class="mb-10">
        <el-input
          v-model="user.pwd"
          placeholder="请输入密码"
          show-password
          @keyup.enter.native="onLogin"
        ></el-input>
      </el-row>
      <el-row>
        <el-checkbox v-model="user.relog">记住登陆?</el-checkbox>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adminModalShow = false">取 消</el-button>
        <el-button type="primary" @click="onLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import _ from "lodash";
import { getNavData, logIn } from "@/api";
let utils = require("utility");
@Component
export default class Header extends Vue {
  log: any;
  $confirm: any;
  // 导航数据
  navData: any = [];
  // 用户登陆弹出框
  adminModalShow: boolean = false;
  // 如果已存在就不需要录入
  userInfo: any = localStorage.getItem("user");
  // 用户录入
  user: any = JSON.parse(this.userInfo) || { relog: false };
  // 登陆loading
  loginLoading: boolean = false;
  mounted() {
    this.getNavDataFn();
  }

  // 获取导航数据
  async getNavDataFn() {
    let navData: any = await getNavData();
    navData.forEach((e: any, i: any) => {
      e.active = false;
      if (e.to === this.$route.path) {
        e.active = true;
      }
    });
    this.navData = _.cloneDeep(navData);
  }
  // 导航切换
  toggleNav(nav: any) {
    if (nav.url || nav.children) {
      return false;
    }
    this.navData.forEach((e: any) => {
      e.active = false;
    });
    nav.active = true;
    if (nav.to) {
      this.$router.push({
        path: nav.to
      });
    }
  }
  // 管理用户登陆
  async onLogin() {
    this.loginLoading = true;
    let data: any = await logIn({
      name: this.user.name,
      pwd: utils.md5(utils.md5("%$^^#$@%" + this.user.pwd))
    });
    this.loginLoading = false;
    if (data.isOk) {
      let tempUser: any = {};
      tempUser.userName = this.user.name;
      tempUser.token = data.token;
      if (this.user.relog) {
        localStorage.setItem("user", JSON.stringify(tempUser));
      } else {
        localStorage.removeItem("user");
      }
      this.$store.commit("setUser", tempUser);
      this.user = tempUser;
      this.adminModalShow = false;
      alert(data.msg);
    } else {
      alert(data.msg);
    }
  }
  // 退出登陆
  outLogin() {
    this.$confirm("是否退出登陆？")
      .then((_: any) => {
        localStorage.removeItem("user");
        this.$store.commit("removeUser");
        this.user = { relog: false };
      })
      .catch((_: any) => {});
  }
}
</script>
<style lang="scss" scoped>
.lb-header {
  user-select: none;
  height: 48px;
  background: #0593d3;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-top: 0;
  cursor: default;
  .lb-logo {
    width: 200px;
    height: 48px;
  }
  .lb-nav {
    width: calc(100% - 200px);
    li {
      a.navli {
        display: inline-block;
        line-height: 48px;
        font-size: 14px;
        padding: 0 15px;
        &.active {
          background-color: #0482ba;
        }
        &:hover {
          background-color: #0482ba;
        }
        transition: background-color 1s;
      }
    }
  }
}
</style>

