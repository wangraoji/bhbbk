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
                v-for="item of cxtjData.bbkEngine"
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
                v-for="item of cxtjData.bbkType"
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
              <template v-if="item.group">
                <th
                  :colspan="loginStatus ? 6 : 5"
                  style="background:linear-gradient(to bottom, #f6f7f9 0%, #ebedf0 100%);"
                  class="pd075 highlight"
                >
                  {{item.group}}&nbsp;&nbsp;&nbsp;版本更新 技术/客服&nbsp;
                  联系&nbsp;
                  <svg-icon icon-class="qq"/>：(1094459877)
                </th>
              </template>
              <template v-if="!item.group">
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
                      <el-button type="primary" plain class="w100" @click="editRow(item)">编辑</el-button>
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
    <el-dialog
      :title="dialogCfg.title"
      :visible.sync="dialogCfg.show"
      width="30%"
      :close-on-click-modal="false"
      v-loading="dialogLoading"
    >
      <!-- 更新日期 + 版本引擎 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">更新日期：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-date-picker
            v-model="dialogCfg.data.bbkUpdated"
            type="date"
            placeholder="选择日期"
            style="width:100%"
            size="small"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">版本引擎：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-select
            v-model="dialogCfg.data.bbkEngine"
            placeholder="选择版本引擎"
            class="w100"
            size="small"
          >
            <el-option v-for="item in actionCfg.bbkEngine" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 演示网站 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">演示网站：</el-button>
        </el-col>
        <el-col :xl="21">
          <el-input
            v-model="dialogCfg.data.bbkShowWeb"
            placeholder="输入演示网站 例：https://www...."
            size="small"
          ></el-input>
        </el-col>
      </el-row>
      <!-- 版本名称 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">版本名称：</el-button>
        </el-col>
        <el-col :xl="21">
          <el-input v-model="dialogCfg.data.bbkName" placeholder="输入版本名称" size="small"></el-input>
        </el-col>
      </el-row>
      <!-- 字体颜色 + 字体粗细 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">字体颜色：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-col :span="18" style="padding:0;">
            <el-select
              v-model="dialogCfg.data.bbkLineHeight"
              placeholder="选择字体颜色"
              class="w100"
              size="small"
            >
              <el-option
                v-for="item in actionCfg.bbkLineHeight"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="text" class="text-btn" size="small">
              <span
                :style="{color:dialogCfg.data.bbkLineHeight || '#606266',fontWeight:dialogCfg.data.bbkFontWeight}"
              >演示</span>
            </el-button>
          </el-col>
        </el-col>
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">字体粗细：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-col :span="18" style="padding:0;">
            <el-select
              v-model="dialogCfg.data.bbkFontWeight"
              placeholder="选择字体粗细"
              class="w100"
              size="small"
            >
              <el-option
                v-for="item in actionCfg.bbkFontWeight"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="text" class="text-btn" size="small">
              <span
                :style="{fontWeight:dialogCfg.data.bbkFontWeight,color:dialogCfg.data.bbkLineHeight || '#606266'}"
              >演示</span>
            </el-button>
          </el-col>
        </el-col>
      </el-row>
      <!-- 版本热度 + 版本类型 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">版本热度：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-col :span="18" style="padding:0;">
            <el-select
              v-model="dialogCfg.data.bbkHots"
              placeholder="选择版本热度"
              class="w100"
              size="small"
            >
              <el-option
                v-for="item in actionCfg.bbkHots"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <span :span="6">
            <img src="@/assets/imgs/jp.gif" class="ysHots" v-if="dialogCfg.data.bbkHots==='jp'">
            <img src="@/assets/imgs/hot.gif" class="ysHots" v-if="dialogCfg.data.bbkHots!=='jp'">
          </span>
        </el-col>
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">版本类型：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-select
            v-model="dialogCfg.data.bbkType"
            placeholder="选择版本类型"
            class="w100"
            size="small"
          >
            <el-option v-for="item in actionCfg.bbkType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 版本截图 -->
      <el-row :gutter="10" class="mb-10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">版本截图：</el-button>
        </el-col>
        <el-col :xl="21">
          <el-input
            v-model="dialogCfg.data.bbkScreenshots"
            placeholder="输入截图网站 例：https://www...."
            size="small"
          ></el-input>
        </el-col>
      </el-row>
      <!-- 自助购买 -->
      <el-row :gutter="10">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">自助购买：</el-button>
        </el-col>
        <el-col :xl="9">
          <el-select v-model="bbkBuyLinkStr" placeholder="选择自助购买方式" class="w100" size="small">
            <el-option
              v-for="item in bbkBuyLinkInfo"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xl="12" v-if="bbkBuyLinkStr==='zdy'">
          <el-input v-model="bbkBuyLinkData.txt" placeholder="输入自定义内容" size="small" clearable></el-input>
        </el-col>
        <el-col :xl="12" v-if="bbkBuyLinkStr==='lxgl'" class="text-center">
          <el-button class="lxgl-btn" size="small">
            <svg-icon icon-class="qq" class="lxgl-svg"/>联系管理
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="bbkBuyLinkStr==='link'" style="margin-top:10px">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">购买链接1：</el-button>
        </el-col>
        <el-col :xl="21">
          <el-input
            v-model="bbkBuyLinkData.link1"
            placeholder="输入购买链接 例：https://www...."
            size="small"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="bbkBuyLinkStr==='link'" style="margin-top:10px">
        <el-col :xl="3">
          <el-button type="text" class="text-btn" size="small">购买链接2：</el-button>
        </el-col>
        <el-col :xl="21">
          <el-input
            v-model="bbkBuyLinkData.link2"
            placeholder="输入购买链接 例：https://www...."
            size="small"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCfg.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import {
  getbbkgg,
  getbbkdata,
  searchbb,
  getbbkactionCfg,
  addbb,
  deletebb,
  editbb
} from "@/api/bbkApi";
@Component
export default class Bbk extends Vue {
  log: any;
  // 当前用户
  userInfo: any = {};
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
  // 版本增删改查配置
  actionCfg: any = {};
  // 弹出框 -> loading
  dialogLoading: boolean = false;
  // 弹出框 -> 数据
  dialogData: any = {
    bbkUpdated: "", // 更新日期
    bbkEngine: "", // 版本引擎
    bbkShowWeb: "", // 演示网站
    bbkName: "", // 版本名称
    bbkLineHeight: "", // 字体颜色
    bbkFontWeight: "", // 字体粗细
    bbkHots: "", // 版本热度
    bbkType: "", // 版本类型
    bbkScreenshots: "", // 版本截图
    bbkBuyLink: "" // 自助购买
  };
  // 弹出框 -> 配置
  dialogCfg: any = {
    show: false,
    title: "",
    data: _.cloneDeep(this.dialogData)
  };
  // 自助购买选择
  bbkBuyLinkStr: any = "";
  bbkBuyLinkInfo: any = [
    {
      label: "联系管理",
      value: "lxgl"
    },
    {
      label: "自定义",
      value: "zdy"
    },
    {
      label: "购买链接",
      value: "link"
    }
  ];
  bbkBuyLinkData: any = {};
  // 登陆状态
  get loginStatus() {
    if (typeof this.$store.getters.userInfo === "string") {
      this.userInfo = JSON.parse(this.$store.getters.userInfo);
    } else {
      this.userInfo = this.$store.getters.userInfo;
    }
    return this.userInfo.token ? true : false;
    // return true;/
  }
  // mounted
  mounted() {
    // 获取版本库部分数据
    this.getbbkApiFn();
    // 获取版本
    this.getbbkdataFn(this.page);
  }

  // 新增
  addRow() {
    this.dialogCfg.show = true;
    this.dialogCfg.title = "新增版本";
    this.initData();
  }
  // 修改
  editRow(item: any) {
    this.dialogCfg.show = true;
    this.dialogCfg.title = "修改";
    this.dialogCfg.data = _.cloneDeep(item);
    let bylink = item.bbkBuyLink.split("|");
    if (bylink[0] === "text") {
      this.bbkBuyLinkStr = "lxgl";
    } else if (bylink[0] === "txt") {
      this.bbkBuyLinkStr = "zdy";
      this.bbkBuyLinkData.txt = bylink[1];
    } else {
      this.bbkBuyLinkStr = "link";
      this.bbkBuyLinkData.link1 = bylink[0];
      this.bbkBuyLinkData.link2 = bylink[1];
    }
  }
  // 删除
  async deleteRow(item: any) {
    this.$confirm("确定删除该条数据？")
      .then(async (_: any) => {
        let data = await deletebb({
          token: this.userInfo.token,
          uniqueid: item.uniqueid
        });
        this.getbbkdataFn(this.page);
      })
      .catch((_: any) => {});
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
  // 初始化数据
  initData() {
    this.dialogCfg.data = _.cloneDeep(this.dialogData);
    this.bbkBuyLinkData = [];
    this.bbkBuyLinkStr = "";
  }
  // 弹框确认
  async dialogConfirm() {
    if (this.bbkBuyLinkStr === "lxgl") {
      this.dialogCfg.data.bbkBuyLink = "text|联系管理";
    } else if (this.bbkBuyLinkStr === "zdy") {
      let str = this.bbkBuyLinkData.txt;
      if (str && str.replace(/\s+/g, "") !== "") {
        this.dialogCfg.data.bbkBuyLink = "txt|" + str.replace(/\s+/g, "");
      } else {
        this.dialogCfg.data.bbkBuyLink = "";
      }
    } else if (this.bbkBuyLinkStr === "link") {
      // console.log(this.bbkBuyLinkData);
      let obj: any = this.bbkBuyLinkData;
      if (
        obj.link1 &&
        obj.link1.replace(/\s+/g, "") !== "" &&
        obj.link2 &&
        obj.link2.replace(/\s+/g, "")
      ) {
        this.dialogCfg.data.bbkBuyLink =
          obj.link1.replace(/\s+/g, "") + "|" + obj.link2.replace(/\s+/g, "");
      } else {
        this.dialogCfg.data.bbkBuyLink = "";
      }
    } else {
      this.dialogCfg.data.bbkBuyLink = "";
    }
    let param = _.cloneDeep(this.dialogCfg.data);
    let tempData: any = {
      bbkUpdated: "更新日期",
      bbkEngine: "版本引擎",
      bbkShowWeb: "演示网站",
      bbkName: "版本名称",
      bbkLineHeight: "字体颜色",
      bbkFontWeight: "字体粗细",
      bbkHots: "版本热度",
      bbkType: "版本类型",
      bbkScreenshots: "版本截图",
      bbkBuyLink: "自助购买"
    };
    let falg = true;
    _.forIn(param, (v, k) => {
      v = v.replace(/\s+/g, "");
      if (v === "") {
        alert(tempData[k] + "： 未录入信息");
        falg = false;
        return false;
      }
    });
    if (falg) {
      this.dialogLoading = true;
      if (param.uniqueid) {
        let data: any = await editbb({
          token: this.userInfo.token,
          data: param
        });
        if (data.isOk) {
          this.dialogCfg.show = false;
          this.getbbkdataFn(this.page);
          this.initData();
        } else {
          alert(data.msg);
        }
      } else {
        param.uniqueid = param.uniqueid || this.getGuid();
        let data: any = await addbb({
          token: this.userInfo.token,
          data: param
        });
        if (data.isOk) {
          this.resultData = data.data;
          this.pagination.total = data.total;
          this.pagination.currentPage = 1;
          this.dialogCfg.show = false;
          this.initData();
        } else {
          alert(data.msg);
        }
      }
      this.dialogLoading = false;
    }
  }
  // 分页切换
  currentPageChange(currentPage: any) {
    this.pagination.currentPage = currentPage;
    let beg = (currentPage - 1) * this.pagination.pagesize;
    this.page.beg = beg;
    this.page.end = beg + this.pagination.pagesize;
    this.getbbkdataFn(this.page);
  }
  // 获取版本库部分数据
  async getbbkApiFn() {
    this.gg = await getbbkgg();
    this.actionCfg = await getbbkactionCfg();
    let bbkcxtj: any = {};
    let cxtjInfo = {
      bbkType: this.actionCfg.bbkType,
      bbkEngine: this.actionCfg.bbkEngine
    };
    let cxtjData: any = {};
    _.forIn(cxtjInfo, (v, k) => {
      cxtjData[k] = [];
      v.forEach((e: any) => {
        cxtjData[k].push({
          isActive: false,
          text: e
        });
      });
    });
    this.cxtjData = cxtjData;
    this.actionCfg.bbkHots = [
      {
        label: "hot",
        value: "hot"
      },
      {
        label: "精品",
        value: "jp"
      }
    ];
  }

  // 获取版本库版本
  async getbbkdataFn(page: any) {
    this.bbkdataLoading = true;
    let bbkdata: any = await getbbkdata(page);
    this.bbkdataLoading = false;
    this.pagination.total = bbkdata.total;
    this.resultData = bbkdata.data;
  }

  // guid
  getGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
  .ysHots {
    position: relative;
    top: 0.5em;
    left: 0.5em;
  }

  .lxgl-btn {
    background: red;
    color: #fff;
    border-color: red;
  }
}
</style>

