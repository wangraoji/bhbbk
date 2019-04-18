<template>
  <div class="lb-footer lb-container">
    <el-row class="lb-content">
      <p class="text-center" v-for="item of infoData" :key="item" v-html="item">
      </p>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getfooterInfo } from "@/api/bbkApi";
@Component

export default class Footer extends Vue {
  infoData: any = [];
  mounted() {
      this.getfooterInfoFn();
  }
  async getfooterInfoFn(){
      this.infoData = await getfooterInfo();
  }
}
</script>

<style lang="scss" scoped>
$bdc: 1px solid #d5d5d5;
.lb-footer {
  border-top: $bdc;
  border-bottom: $bdc;
  font-size: 14px;
  cursor: default;
  .lb-content {
    padding: 30px 20px;
  }
  /deep/ .highlight {
    color: #0593d3;
  }
  /deep/ a {
    text-decoration: underline;
  }
}
</style>

