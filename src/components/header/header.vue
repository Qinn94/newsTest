<template>
  <div class="headerContainer">
    <div id="top" class="top">
      <h1>
        <img src="../../images/h1Img.png" />
      </h1>
      <div class="tabTitle container">
        <ul>
          <router-link to="/home" tag="li">
            <a>查银行理财产品</a>
          </router-link>
          <router-link to="/personPage" tag="li">
            <a href="cyryIndex.html">查金融从业人员</a>
          </router-link>
        </ul>
      </div>
      <searchCom :parentsCom="parentsCom"></searchCom>
    </div>
  </div>
</template>

<script>
import searchCom from "../search/search";
export default {
  props: ["parentsCom"],
  components: { searchCom },
  data() {
    return {};
  }
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 160px;
  background: url(../../images/topbg.jpg) no-repeat center top;
  background-size: 100% 100%;
  padding: 0 5%;
  margin-bottom: 11px;
}

a {
  text-decoration: none;
}

h1 {
  text-align: center;
  height: 44px;
  margin: 0;
  padding: 12px 0;
}

h1 img {
  display: block;
  height: 20px;
  margin: auto;
}

.top .tabTitle {
  height: 50px;
  padding: 17px 0;
  color: #fff;
  font-size: 1.6rem;
}

.top .tabTitle li {
  height: 16px;
  line-height: 16px;
  width: 50%;
  float: left;
  padding: 0 15px;
}

.top .tabTitle li a {
  color: #fff;
}
.router-link-active a {
  border: 1px solid rgba(200, 200, 200, 0.7);
  background: rgba(200, 200, 200, 0.3);
  border-radius: 4px;
  padding: 2px 4px;
  color: #fff;
}

.top .tabTitle li:first-child {
  border-right: 1px solid #fff;
  text-align: right;
}
</style>