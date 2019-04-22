<template>
  <div class="lb-ad">
    <a :href="ad.url" v-for="(ad,i) of bbkad" :key="i" class="adimg" target="_blank">
      <img
        :src="ad.src"
        alt="t"
        class="w100"
        :height="ad.height"
        :class="{'mb-10': i === bbkad.length - 1}"
      >
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getbbkad } from "@/api/bbkApi";
@Component
export default class Ad extends Vue {
  log: any;
  bbkad: any = [];
  mounted() {
    this.getbbkadFn();
  }
  async getbbkadFn() {
    this.bbkad = await getbbkad();
  }
}
</script>

<style lang="scss" scoped>
.lb-ad {
  .adimg {
    img {
      display: block;
      padding: 0;
      margin: 0;
      &.mb-10 {
        margin-bottom: 10px !important;
      }
    }
  }
}
</style>

