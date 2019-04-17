<template>
  <div class="bbk h100">
    <el-row>当前状态{{ loginStatus }}</el-row>
    <el-row class="lb-table-container">
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
      </el-row>
      <el-row class="lb-b">
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
              <td v-if="loginStatus"></td>
            </tr>
            <tr v-for="(item,i) of resultData" :key="i">
              <template v-if="item.xx">
                <td
                  :colspan="loginStatus ? 6 : 5"
                  style="background:linear-gradient(to bottom, #f6f7f9 0%, #ebedf0 100%);"
                  class="pd075"
                >{{item.xx}}</td>
              </template>
              <template v-if="!item.xx">
                <td>
                  <el-button type="danger">演示网站</el-button>
                </td>
                <td class="text-left pl20 pd075">{{item.amount1}}</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td v-if="loginStatus">
                  <el-button type="primary">编辑</el-button>
                  <el-button type="danger" @click="deleteRow(item)">删除</el-button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </el-row>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
@Component
export default class Bbk extends Vue {
  log: any;
  tableData6: any = [
    {
      id: "1",
      name: "王小虎1",
      amount1: "234",
      amount2: "3.2",
      amount3: 10,
      amount4: 10,
      guid: "1"
    },
    {
      id: "3",
      name: "王小虎3",
      amount1: "234",
      amount2: "3.2",
      amount3: 10,
      amount4: 10,
      guid: "2"
    },
    {
      id: "5",
      name: "王小虎5",
      amount1: "234",
      amount2: "3.2",
      amount3: 10,
      amount4: 10,
      guid: "3"
    },
    {
      id: "1",
      name: "王小虎1",
      amount1: "2342",
      amount2: "3.23",
      amount3: 10,
      amount4: 10,
      guid: "4"
    },
    {
      id: "3",
      name: "王小虎3",
      amount1: "234",
      amount2: "3.2",
      amount3: 10,
      amount4: 10,
      guid: "5"
    }
  ];
  resultData: any = [];
  gg: any = [
    {
      gg:
        "<span style='font-size:blod'>本站为萝卜论坛旗下商业版本销售站点：唯一销售QQ：1094459877谨防假冒！</span>",
      color: "#DC143C"
    },
    {
      gg:
        "<span style='font-size:blod'>本站支持互换，代销，收购开区独家版本合作共赢，欢迎传奇各界人士来洽谈！</span>",
      color: "#FF8C00"
    },
    {
      gg:
        "<span style='font-size:blod'>如果版本截图网址打不开，请把.com改成.net即可。</span>",
      color: "#FF4500"
    },
    {
      gg:
        "<span style='font-size:blod'>更多免费版本 请到 <a href='https://www.0lb.com/' style='text-decoration:underline;' target='_blank'>萝卜论坛</a> 内查看下载</span>",
      color: "#808000"
    },
    {
      gg:
        "<span style='font-size:blod'>独家商业版本 请到 <a href='http://bbk.bhbbk.com/' style='text-decoration:underline;' target='_blank'>商业版本库</a> 内查看下载</span>",
      color: "#FF0000"
    }
  ];
  search: string = "";
  // loginStatus:boolean = this.loginStatusFn ? JSON.parse(this.loginStatusFn).token ? true : false : false;
  get loginStatus() {
    let userInfo;
    if (typeof this.$store.getters.userInfo === "string") {
      userInfo = JSON.parse(this.$store.getters.userInfo);
    } else {
      userInfo = this.$store.getters.userInfo;
    }
    return userInfo.token ? true : false;
  }
  mounted() {
    this.dbconversion();
  }
  toSearch(e: any) {
    let searchInput: any = this.$refs.searchInput;
    searchInput.blur();
  }
  handleSelect(item: any) {
    // log(item);
    console.log(item);
  }
  // 删除
  deleteRow(item: any) {
    this.tableData6.forEach((e: any, i: any) => {
      if (e.guid === item.guid) {
        this.$delete(this.tableData6, i);
      }
    });
    this.dbconversion();
  }
  // 数据转换
  dbconversion() {
    let arr = _.orderBy(this.tableData6, ["id"]);
    let tempData: any = [];
    arr.forEach((e, i) => {
      let result = tempData.filter((v: any) => {
        return v.xx === e.id;
      });
      if (result.length === 0) {
        tempData.push({ xx: e.id });
      }
      tempData.push(_.omit(e, ["id"]));
    });
    this.resultData = tempData;
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
    .text-left {
      text-align: left;
    }
    .pd075 {
      padding: 0.75em 0;
    }
  }
  .pl20 {
    padding-left: 20px !important;
  }
}
</style>

