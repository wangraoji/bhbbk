<template>
  <div class="lb-ad mb-10">
    <a v-for="img of imgData" :key="img.img" :href="img.url" target="_blank">
      <img v-bind:src="img.name" alt="t" class="w100">
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getaddata } from "@/api/bbkApi";
import _ from "lodash";
@Component
export default class Ad extends Vue {
  log: any;
  imgData: any = [
    {
      //   name: "ad1.png",
      src: "logo.png",
      url: "https://www.0lb.com/thread-652-1-1.html"
    }
  ];
  mounted() {
    this.getData();
  }
  async getData() {
    // let data: any = await getaddata();
    // this.log(data);
    // let cc = require;
    // data.forEach((e: any) => {
    //   e.name = cc("@/assets/imgs/" + e.name);
    // });
    // this.imgData = _.cloneDeep(data);
  }
}
</script>

<style lang="scss" scoped>
.lb-ad {
  .ad-img {
    img {
      width: 100%;
    }
  }
}
</style>

