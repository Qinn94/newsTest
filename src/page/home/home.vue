<template>
  <div class="homeContainer">
    <headerCom parentsCom="home"></headerCom>
    <div id="main">
      <financialTab></financialTab>
      <homeListCom @backUpEvent="isbackUpShow"></homeListCom>
    </div>

    <div @click="backUp" :class="{show:backUpShow}" id="backTop">
      <a></a>
    </div>
  </div>
</template>

<script>
import headerCom from "../../components/header/header";
import financialTab from "../../components/searchTab/financialTab";
import homeListCom from "../../components/itemList/homeList";
export default {
  components: { headerCom, financialTab, homeListCom },
  data() {
    return {
      backUpShow: false
    };
  },
  methods: {
    isbackUpShow(data) {
      this.backUpShow = data;
    },
    backUp() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 5);
    }
  },
  watch: {
    // backUp: {
    //   handler: function(newVal, oldVal) {
    //     console.log(newVal);
    //     this.backUpShow = newVal;
    //   },
    //   immediate: true
    // }
  }
};
</script>

<style scoped>
#main {
  padding: 22px 5% 0;
  background: #fff;
}
</style>