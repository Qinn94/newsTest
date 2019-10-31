<template>
  <div class="personDetailContainer">
    <detailHeader :title="item.name"></detailHeader>
    <!-- <div class="main">
      <p class="name">{{item.name}}</p>
      <p class="crtificateStatus">
        证书状态：
        <span>{{item.cert}}</span>
      </p>
      <p class="companyName">{{item.gov}}</p>
      <p class="crtificateId">
        证书编号：
        <span></span>
      </p>
      <p class="btnP">
        <span class="xueli">{{item.eco_name}}</span>
        <span class="zige">{{item.pti_name}}</span>
      </p>
      <p class="date dateS">
        证书取得日期
        <span>{{item.start}}</span>
      </p>
      <p class="date dateE">
        证书有效截止日期
        <span>{{item.end}}</span>
      </p>
      <img class="headImg" :src="item.photo" />
    </div>-->
  </div>
</template>

<script>
import detailHeader from "../../components/header/detailHeader";
export default {
  components: { detailHeader },
  data() {
    return {
      item: {}
    };
  },
  created() {
    //this.item = this.$route.params;
  }
};
</script>

<style scoped>
.personDetailContainer {
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  background: url(../../images/ryDetailBG.png) no-repeat left bottom #fff;
  background-size: 100% auto;
  padding: 80px 11.2% 0;
  position: absolute;
  top: 0;
}
.main p {
  color: #6a6a6a;
  font-size: 14px;
  line-height: 45px;
}
.main p.name {
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  color: #444;
}
p span {
  margin-left: 15px;
}
p.crtificateStatus span {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  color: #fff;
  background: #84d334;
  border-radius: 4px;
  font-size: 12px;
}
p.btnP span {
  display: inline-block;
  height: 18px;
  line-height: 16px;
  padding: 0 6px;
  border: 1px solid #119af1;
  color: #119af1;
  margin-left: 0;
  margin-right: 15px;
}
p.date {
  margin: 15px 0;
  border-left: 1px solid #dedede;
  height: 14px;
  line-height: 14px;
  padding-left: 10px;
}
.main img.headImg {
  width: 102px;
  height: 102px;
  border-radius: 50%;
  position: absolute;
  top: 85px;
  right: 10%;
}
</style>