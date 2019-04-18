<template>
  <div class="bbk h100">
    <el-row class="lb-table-container" v-loading="bbkdataLoading">
      <el-row class="lb-t mb-10">
        <el-col :span="10">
          <el-input
            placeholder="请输入搜索内容：如 单职业/GOM (按回车或点右边搜索按钮)"
            size="medium"
            v-model="search"
            clearable
            ref="searchInput"
            @keyup.enter.native="toSearch"
          >
            <el-button slot="append" @click="toSearch">
              <i class="el-icon-search"></i>
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="5" class="pl20">
          <el-button @click="toSearch('clear')" size="medium">清空搜索</el-button>
        </el-col>
        <el-col :span="2" :offset="7">
          <el-select
            v-model="pagination.pagesize"
            placeholder="请选择"
            size="medium"
            @change="pagesizeChange"
          >
            <el-option
              v-for="item in pagination.topPagesizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="lb-b mb-10">
        <table class="lb-table w100">
          <thead>
            <tr class="lb-t-h">
              <th width="10%" class="pd075">开区网站</th>
              <th>版本名称</th>
              <th width="10%">自助购买</th>
              <th width="10%">版本类型</th>
              <th width="10%">游戏详情</th>
              <th width="10%" v-if="loginStatus">编辑</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of gg" :key="item.gg">
              <td>
                <el-button type="danger">本站公告</el-button>
              </td>
              <td v-html="item.gg" :style="{color:item.color}" class="text-left pl20 pd075"></td>
              <td>
                <el-button type="warning">萝卜版本库</el-button>
              </td>
              <td>
                <el-button class="type-btn">各种类型</el-button>
              </td>
              <td>
                <el-button type="success">版本截图</el-button>
              </td>
              <td v-if="loginStatus">
                <el-button type="primary" @click="addRow">新增数据</el-button>
              </td>
            </tr>
            <tr v-for="(item,i) of resultData" :key="i">
              <template v-if="item.bbkUpdated">
                <td
                  :colspan="loginStatus ? 6 : 5"
                  style="background:linear-gradient(to bottom, #f6f7f9 0%, #ebedf0 100%);"
                  class="pd075"
                >{{item.bbkUpdated}}</td>
              </template>
              <template v-if="!item.bbkUpdated">
                <!-- 演示网站 -->
                <td>
                  <a :href="item.bbkShowWeb" target="_blank">
                    <el-button type="danger">演示网站</el-button>
                  </a>
                </td>
                <!-- 版本名称 -->
                <td class="text-left pl20 pd075">
                  <img src="@/assets/imgs/jp.gif" class="bbkHots" v-if="item.bbkHots==='jp'">
                  <img src="@/assets/imgs/hot.gif" class="bbkHots" v-if="item.bbkHots!=='jp'">
                  &nbsp;
                  <span
                    :style="{color:item.bbkLineHeight,fontWeight:item.bbkFontWeight}"
                  >{{item.bbkName}}</span>
                </td>
                <!-- 自助购买 -->
                <td>
                  <el-row v-if="item.bbkBuyLink.split('|')[0] === 'text'">
                    <a
                      href="http://wpa.qq.com/msgrd?v=3&uin=1094459877&site=xg.com&menu=yes"
                      target="_blank"
                    >
                      <el-button class="lxgl-btn">
                        <svg-icon icon-class="qq" class="lxgl-svg"/>
                        {{item.bbkBuyLink.split('|')[1]}}
                      </el-button>
                    </a>
                  </el-row>
                  <el-row v-if="item.bbkBuyLink.split('|')[0] === 'txt'">
                    <a target="_blank" :href="item.bbkBuyLink.split('|')[2]">
                      <el-button class="mfbb-btn">{{item.bbkBuyLink.split('|')[1]}}</el-button>
                    </a>
                  </el-row>
                  <el-row
                    v-if="item.bbkBuyLink.split('|')[0] !== 'txt' && item.bbkBuyLink.split('|')[0] !== 'text'"
                  >
                    <el-col :xl="12" class="text-center">
                      <a class="gm" :href="item.bbkBuyLink.split('|')[0]" target="_blank">
                        <img src="@/assets/imgs/gm01.gif" alt="gm01" class="w100">
                      </a>
                    </el-col>
                    <el-col :xl="12" class="text-center">
                      <a class="gm" :href="item.bbkBuyLink.split('|')[1]" target="_blank">
                        <img src="@/assets/imgs/gm02.gif" alt="gm02" class="w100">
                      </a>
                    </el-col>
                  </el-row>
                </td>
                <!-- 版本类型 -->
                <td>
                  <el-button class="type-btn">{{ item.bbkType }}</el-button>
                </td>
                <!-- 版本截图 -->
                <td>
                  <a :href="item.bbkScreenshots" target="_blank">
                    <el-button type="success">版本截图</el-button>
                  </a>
                </td>
                <td v-if="loginStatus">
                  <el-row>
                    <el-col :xl="12" style="padding:0.3em 0.5em;">
                      <el-button type="primary" plain class="w100">编辑</el-button>
                    </el-col>
                    <el-col :xl="12" style="padding:0.3em 0.5em">
                      <el-button type="danger" @click="deleteRow(item)" plain class="w100">删除</el-button>
                    </el-col>
                  </el-row>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row class="lb-pages">
        <el-pagination
          @size-change="pagesizeChange"
          @current-change="currentPageChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes="pagination.pagesizes"
          :page-size="pagination.pagesize"
          layout="sizes,next, pager ,prev"
          :total="pagination.total"
          background
        ></el-pagination>
      </el-row>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import { getbbkgg, getbbkdata } from "@/api/bbkApi";
@Component
export default class Bbk extends Vue {
  log: any;
  // 版本数据loading
  bbkdataLoading: boolean = false;
  // 重置后的数据
  resultData: any = [];
  // 公告
  gg: any = [];
  // 搜索参数
  search: string = "";
  // 数据分页
  pagination: any = {
    topPagesizes: [
      {
        value: 30,
        label: "当前 30条/页"
      },
      {
        value: 50,
        label: "当前 50条/页"
      }
    ],
    pagesizes: [30, 50],
    pagesize: 30,
    currentPage: 1,
    total: 1000
  };
  // 获取数据
  page: any = {
    beg: 0,
    end: this.pagination.pagesize
  };
  // 登陆状态
  get loginStatus() {
    let userInfo;
    if (typeof this.$store.getters.userInfo === "string") {
      userInfo = JSON.parse(this.$store.getters.userInfo);
    } else {
      userInfo = this.$store.getters.userInfo;
    }
    return userInfo.token ? true : false;
    // return true;
  }
  // mounted
  mounted() {
    // 获取版本库公告
    this.getbbkggFn();
    // 获取版本
    this.getbbkdataFn(this.page);
  }
  // 搜索
  toSearch(e: any) {
    let searchInput: any = this.$refs.searchInput;
    searchInput.blur();
  }
  // 新增
  addRow() {}
  // 删除
  deleteRow(item: any) {
    this.resultData.forEach((e: any, i: any) => {
      if (e.uniqueid === item.uniqueid) {
        this.$delete(this.resultData, i);
      }
    });
    this.getbbkdataFn({ beg: 0, end: 30 });
  }
  pagesizeChange(pagesize: any) {
    this.pagination.pagesize = pagesize;
    this.log(this.page);
    this.page.end = this.page.beg + pagesize;
    this.getbbkdataFn(this.page);
  }
  currentPageChange(currentPage: any) {
    this.pagination.currentPage = currentPage;
    let beg = currentPage === 1 ? 0 : currentPage * this.pagination.pagesize;
    this.page = {
      beg: beg,
      end: beg + this.pagination.pagesize
    };
    this.getbbkdataFn(this.page);
  }
  // 获取版本库GG
  async getbbkggFn() {
    this.gg = await getbbkgg();
  }
  // 获取版本库版本
  async getbbkdataFn(page: any) {
    this.bbkdataLoading = true;
    let bbkdata: any = await getbbkdata(page);
    this.bbkdataLoading = false;
    this.pagination.total = bbkdata.total;
    this.resultData = bbkdata.data;
  }
}
</script>

<style lang="scss" scoped>
$bdc: 1px solid #d5d5d5;
.bbk {
  font-size: 14px;
  .lb-table {
    border-top: $bdc;
    border-left: $bdc;
    border-spacing: 0;
    cursor: default;
    th,
    td {
      border-right: $bdc;
      border-bottom: $bdc;
    }
    .lb-t-h {
      background: #ebedf0;
    }
    td {
      text-align: center;
    }
    .type-btn {
      color: #fff;
      background-color: #5bc0de;
      border-color: #5bc0de;
      &:hover {
        background: #46b8da;
        outline: 0;
        color: #fff;
      }
      &:active {
        background: #31b0d5;
      }
    }
    .lxgl-btn {
      background: red;
      color: #fff;
      border-color: red;
    }
    .mfbb-btn {
      background: #dd8721;
      color: #fff;
      border-color: #dd8721;
    }
    .pd075 {
      padding: 0.65em 0;
    }
    a.gm {
      display: inline-block;
      img {
        position: relative;
        top: 2px;
      }
    }
    .lxgl-svg {
      position: relative;
      top: -0.9px;
      left: -5px;
    }
    .bbkHots {
      position: relative;
      top: 1px;
    }
  }
  .pl20 {
    padding-left: 20px !important;
  }
}
</style>

