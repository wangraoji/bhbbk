
<template>
  <div class="about">
    <div class="a-t">
      <div class="a-content">
        <div class="text w100 text-center">行业领先 独家优势</div>
        <hr />
      </div>
    </div>
    <h3 class="mb-10">在线客服 7*24小时</h3>
    <el-card shadow="never" class="mb-20">
      <el-row :gutter="20" class="card-row">
        <el-col :span="4" v-for="(admin, i) of data.aboutAdmin" :key="i">
          <el-row class="text-center">
            <img src="@/assets/imgs/Icon-qq.png" alt="qq" />
          </el-row>
          <el-row class="text-center mb-5">
            <span class="card-name">{{ admin.name }}</span>
          </el-row>
          <el-row class="text-center">
            <svg-icon icon-class="qq" />
            {{ admin.qq }}
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="mb-10">
      <div class="a-content">
        <div class="text w100 text-center">我们的服务</div>
        <hr />
        <br />
        <br />
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, i) of data.aboutData" :key="i">
            <h5 class="mb-5 text-center">{{ item.title }}</h5>
            <p class="card-name mb-5 text-center">{{ item.smtext }}</p>
            <p class="card-name">{{ item.text }}</p>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAboutData } from "@/api/aboutApi";
@Component
export default class About extends Vue {
  log: any;
  data: any = {};
  mounted() {
    this.getAboutDataFn();
  }
  async getAboutDataFn() {
    this.data = await getAboutData();
    this.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
.about {
  .a-t {
    height: 120px;
    background: #0593d3;
    color: #fff;
    margin-bottom: 30px;
  }
  .a-content {
    width: 60%;
    margin: 0 auto;
    padding-top: 24px;
    .text {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  .card-row {
    font-size: 14px;
  }
  .card-name {
    color: gray;
  }
  .mb-5 {
    margin-bottom: 5px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
}
</style>

