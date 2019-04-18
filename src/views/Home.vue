<template>
  <div class="home h100">
    <!-- 头部 -->
    <lb-header></lb-header>
    <!-- 主体 -->
    <div class="lb-main">
      <div class="lb-container">
        <router-view/>
      </div>
      <!-- 底部 -->
      <div class="lb-footer">
        <lb-footer></lb-footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import header from "@/components/header/index.vue";
import footer from "@/components/footer/index.vue";
@Component({
  components: {
    "lb-header": header,
    "lb-footer": footer
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.lb-main {
  height: calc(100% - 48px);
  padding-top: 20px;
  overflow: auto;
}
</style>

