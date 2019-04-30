
<template>
  <div class="adServing">
    <h2 class="text-center mb-10">
      <span :style="{ color: data.title.color }">{{ data.title.text }}</span>
      &nbsp;&nbsp;技术/客服
      <svg-icon icon-class="qq" />：
      <a
        :href="
          'http://wpa.qq.com/msgrd?v=3&uin=' +
            data.title.qq +
            '&site=xg.com&menu=yes'
        "
        target="_blank"
        class="lxqq"
        >{{ data.title.qq }}</a
      >
    </h2>
    <!-- 广告说明 -->
    <el-row class="adinfo mb-20">
      <h3 class="mb-10">广告说明</h3>
      <ul>
        <li
          v-for="(adinfo, i) of data.adIntroduction"
          :key="i"
          :style="{ color: adinfo.color }"
        >
          {{ adinfo.text }}
        </li>
      </ul>
    </el-row>
    <!-- 广告发布说明 -->
    <el-row class="adPublish mb-20">
      <h3 class="mb-10">广告发布说明</h3>
      <el-row :gutter="20">
        <el-col
          class="bd"
          :span="12"
          v-for="(adPublish, i) of data.adPublishing"
          :key="i"
        >
          <ul>
            <li :style="{ color: adPublish.color }">{{ adPublish.name }}</li>
            <li
              v-for="(info, i1) of adPublish.content"
              :key="i1"
              :style="{ color: info.color }"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{ info.text }}
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-row>
    <!-- 广告发布价格 -->
    <el-row class="mb-20">
      <h4 class="mb-10">
        <span class="null"
          >【 信誉是金 ★ 财富是银 ★ 诚信交易 ★ 一诺千金】
          以下广告发布价格仅供参考 详情咨询技术/客服
          <svg-icon icon-class="qq" />：
          <a
            :href="
              'http://wpa.qq.com/msgrd?v=3&uin=' +
                data.title.qq +
                '&site=xg.com&menu=yes'
            "
            target="_blank"
            class="lxqq"
          >
            {{ data.title.qq }}
          </a>
        </span>
        <span class="fr">价格统计：{{ adServingSum }} 元</span>
      </h4>
      <el-table
        :data="data.adServingData"
        style="width: 100%"
        :height="518"
        border
      >
        <el-table-column prop="servingSite" label="投放站点" width="150">
        </el-table-column>
        <el-table-column prop="siteIntroduction" label="站点介绍">
        </el-table-column>
        <el-table-column prop="stars" label="推荐星级" width="70">
        </el-table-column>
        <el-table-column label="套黄" width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.tempTop" class="null">暂无套餐</span>
            <el-checkbox
              v-if="scope.row.tempTop"
              @change="pushPod($event, scope.row.tempTop)"
              >{{ scope.row.tempTop }} 元</el-checkbox
            >
          </template>
        </el-table-column>
        <el-table-column label="改时/通宵" width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.editTime" class="null">暂无套餐</span>
            <el-checkbox
              v-if="scope.row.editTime"
              @change="pushPod($event, scope.row.editTime)"
              >{{ scope.row.editTime }} 元</el-checkbox
            >
          </template>
        </el-table-column>
        <el-table-column label="通宵固顶" width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.nightTop" class="null">暂无套餐</span>
            <el-checkbox
              v-if="scope.row.nightTop"
              @change="pushPod($event, scope.row.nightTop)"
              >{{ scope.row.nightTop }} 元</el-checkbox
            >
          </template>
        </el-table-column>
        <el-table-column label="全天固顶" width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.dayTop" class="null">暂无套餐</span>
            <el-checkbox
              v-if="scope.row.dayTop"
              @change="pushPod($event, scope.row.dayTop)"
              >{{ scope.row.dayTop }} 元</el-checkbox
            >
          </template>
        </el-table-column>
        <el-table-column label="全天套黄" width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.AllDayTop" class="null">暂无套餐</span>
            <el-checkbox
              v-if="scope.row.AllDayTop"
              @change="pushPod($event, scope.row.AllDayTop)"
              >{{ scope.row.AllDayTop }} 元</el-checkbox
            >
          </template>
        </el-table-column>
        <el-table-column label="发布状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '正常发布'"
              >{{ scope.row.status }}<span class="status0">0</span></span
            >
            <span v-if="scope.row.status !== '正常发布'"
              >{{ scope.row.status }}<span class="status1">1</span></span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 连体广告价格 -->
    <el-row class="mb-20">
      <h4 class="mb-10">
        <span class="null"
          >连体广告费用计算表单工具(广告数量*广告单价) 详情咨询技术/客服
          <svg-icon icon-class="qq" />：
          <a
            :href="
              'http://wpa.qq.com/msgrd?v=3&uin=' +
                data.title.qq +
                '&site=xg.com&menu=yes'
            "
            target="_blank"
            class="lxqq"
          >
            {{ data.title.qq }}
          </a>
        </span>
      </h4>
      <el-table
        :data="data.adTool"
        border
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column prop="PublishingSite" label="发布站点名称">
        </el-table-column>
        <el-table-column label="广告发布数量" width="200">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              @change="numChange($event, scope.row)"
              :min="0"
              class="w100"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="单条广告价格" width="100">
          <template slot-scope="scope">
            {{ scope.row.adPrice }} 元
          </template>
        </el-table-column>

        <el-table-column prop="total" label="广告金额总计" width="200">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.total" readonly>
              <template slot="append">
                元
              </template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAdServingData } from "@/api/adServingApi";
@Component
export default class AdServing extends Vue {
  log: any;
  data: any = {
    title: {}
  };
  adServingSum: number = 0;
  mounted() {
    this.getAdServingDataFn();
  }
  async getAdServingDataFn() {
    this.data = await getAdServingData();
    this.log(this.data);
  }
  pushPod(e: any, v: any) {
    if (e) {
      this.adServingSum += v * 1;
    } else {
      this.adServingSum -= v;
    }
  }
  numChange(v: any, row: any) {
    v = v || 0;
    row.total = v * row.adPrice;
  }
  getSummaries(param: any) {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = "总价";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        sums[index] += " 元";
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }
}
</script>

<style lang="scss" scoped>
.adServing {
  font-size: 14px;
  cursor: default;
  .lxqq {
    &:hover {
      text-decoration: underline;
      color: #0593d3;
    }
  }
  .ad-title {
    background: linear-gradient(rgb(246, 247, 249) 0%, rgb(235, 237, 240) 100%);
    width: 100%;
  }
  li {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #c9c9c9;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .null {
    color: red;
  }
  .status0,
  .status1 {
    // display: inline-block;
    // width: 14px;
    // height: 14px;
    background: green;
    color: green;
    padding: 0 3.9px;
    margin-left: 5px;
  }
  .status1 {
    background: red;
    color: red;
  }
}
</style>

