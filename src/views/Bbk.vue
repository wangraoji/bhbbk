<template>
  <div class="bbk h100">
    <el-row class="lb-table-container" v-loading="bbkdataLoading">
      <el-row class="lb-t mb-10" v-if="!isCXTJ">
        <el-col :span="10">
          <el-input
            placeholder="输入关键词搜索版本 例（单职业、迷失、微变、合击、火龙、中变等）"
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
        <el-col :span="5">
          &nbsp;&nbsp;
          <el-button @click="isCXTJ = true" size="medium">切换成条件搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="lb-t mb-10" v-if="isCXTJ">
        <el-row class="lb-t-t">
          <el-row class="bdb">
            <el-col :xl="2">
              <el-button
                type="text"
                class="text-btn"
                size="medium"
                style="color:#606266!important"
              >引擎类型：</el-button>
            </el-col>
            <el-col :xl="22">
              <el-checkbox
                v-model="item.isActive"
                v-for="item of cxtjData.engineType"
                :key="item.text"
              >{{ item.text }}</el-checkbox>
            </el-col>
          </el-row>
          <el-row class="bdb mb-10">
            <el-col :xl="2">
              <el-button
                type="text"
                class="text-btn"
                size="medium"
                style="color:#606266!important"
              >版本类型：</el-button>
            </el-col>
            <el-col :xl="22">
              <el-checkbox
                v-model="item.isActive"
                v-for="item of cxtjData.bbType"
                :key="item.text"
              >{{ item.text }}</el-checkbox>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="lb-t-b text-center">
          <el-button @click="toSearch('cxtj')" size="small">搜索</el-button>
          <el-button @click="isCXTJ = false" size="small">切换成关键词搜索</el-button>
        </el-row>
      </el-row>
      <el-row class="lb-b mb-10">
        <table class="lb-table w100">
          <thead>
            <tr class="lb-t-h">
              <th width="10%" class="pd075">开区网站</th>
              <th>版本名称</th>
              <th width="8%">版本类型</th>
              <th width="8%">游戏详情</th>
              <th width="12%">自助购买</th>
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
                <el-button class="type-btn">各种类型</el-button>
              </td>
              <td>
                <el-button type="success">版本截图</el-button>
              </td>
              <td>
                <el-button type="warning">萝卜版本库</el-button>
              </td>
              <td v-if="loginStatus">
                <el-button type="primary" @click="addRow">新增数据</el-button>
              </td>
            </tr>
            <tr v-for="(item,i) of resultData" :key="i">
              <template v-if="item.bbkUpdated">
                <th
                  :colspan="loginStatus ? 6 : 5"
                  style="background:linear-gradient(to bottom, #f6f7f9 0%, #ebedf0 100%);"
                  class="pd075 highlight"
                >
                  {{item.bbkUpdated}}&nbsp;&nbsp;&nbsp;版本更新 技术/客服&nbsp;
                  联系&nbsp;
                  <svg-icon icon-class="qq"/>：(1094459877)
                </th>
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
                <!-- 自助购买 -->
                <td style="padding: 0px 10px;">
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
          @current-change="currentPageChange"
          :current-page.sync="pagination.currentPage"
          :page-size="pagination.pagesize"
          layout="next, pager ,prev"
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
import { getbbkcxtj, getbbkgg, getbbkdata, searchbb } from "@/api/bbkApi";
@Component
export default class Bbk extends Vue {
  log: any;
  // 版本数据loading
  bbkdataLoading: boolean = false;
  // 是否为条件查询
  isCXTJ: boolean = false;
  cxtjData: any = [];

  // 重置后的数据
  resultData: any = [];
  // 公告
  gg: any = [];
  // 搜索参数
  search: string = "";
  // 数据分页
  pagination: any = {
    pagesize: 100,
    currentPage: 1,
    total: 1000
  };
  // 获取数据 ---  db => 分页切换取默认数据库，查询取查询的
  page: any = {
    beg: 0,
    end: this.pagination.pagesize,
    db: "default"
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
    // 获取版本库部分数据
    this.getbbkApiFn();
    // 获取版本
    this.getbbkdataFn(this.page);
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
  // 查询
  toSearch(e: any) {
    // 查询条件查询
    if (e === "cxtj") {
      let param: any = {};
      _.forIn(this.cxtjData, (v: any, k: any) => {
        param[k] = [];
        v.forEach((e: any) => {
          if (e.isActive) {
            param[k].push(e.text);
          }
        });
      });
      if (param.engineType.length > 0 || param.bbType.length) {
        this.bbkdataLoading = true;
        this.page.db = "cxdb";
        this.page.tj = param;
        this.toSearchFn(this.page);
      }
    }
    // 关键词查询
    else {
      let searchInput: any = this.$refs.searchInput;
      searchInput.blur();
      let param = this.search.replace(/\s+/g, "");
      if (param !== "") {
        this.bbkdataLoading = true;
        this.page.db = "cxdb";
        this.page.text = param;
        this.toSearchFn(this.page);
      }
    }
  }
  async toSearchFn(page: any) {
    let bbkdata: any = await searchbb(page);
    this.bbkdataLoading = false;
    this.pagination.total = bbkdata.total;
    this.resultData = bbkdata.data;
    if (this.resultData.length < 1) {
      this.resultData.push({
        bbkUpdated: "没有查询到相关数据，请重新查询或者刷新网站"
      });
    }
  }
  // 分页切换
  currentPageChange(currentPage: any) {
    this.pagination.currentPage = currentPage;
    let beg = (currentPage - 1) * this.pagination.pagesize;
    this.page.beg = beg;
    this.page.end = beg + this.pagination.pagesize;
    // this.log(this.page);
    this.getbbkdataFn(this.page);
  }
  // 获取版本库部分数据
  async getbbkApiFn() {
    this.gg = await getbbkgg();
    this.cxtjData = await getbbkcxtj();
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
  .bdb {
    border-bottom: $bdc;
  }
}
</style>

