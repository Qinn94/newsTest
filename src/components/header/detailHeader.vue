<template>
  <div id="top">
    <a class="backA" @click="goBack"></a>
    <h1 class="cpms">{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
#top {
  min-height: 32px;
  background: url(../../images/proDetailTopBg.png) no-repeat;
  background-size: 100%;
  padding: 0 5%;
  color: #fff;
  margin-bottom: 9px;
  position: relative;
  z-index: 10;
}

#top a.backA {
  width: 12px;
  height: 21px;
  background: url(../../images/backBG.png) no-repeat;
  background-size: 100%;
  left: 5%;
  top: 15px;
  position: absolute;
}
h1 {
  width: 80%;
  margin: 0 auto;
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
  padding: 15px 0;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>