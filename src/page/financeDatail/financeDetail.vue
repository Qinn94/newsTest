<template>
  <div class="financeDetailContanier">
    <Fdetail :title="detailConn.name"></Fdetail>
    <div class="proDetailBox">
      <h2>
        <span>产品详情</span>
      </h2>
      <ul>
        <li class="djbm">
          <label>登记编码</label>
          <span>{{detailConn.cpdjbm}}</span>
        </li>
        <li class="fxjg">
          <label>发行机构</label>
          <span>{{detailConn.gov}}</span>
        </li>
        <li class="bz">
          <label>币种</label>
          <span>{{detailConn.rmb}}</span>
        </li>
        <li class="cpzt">
          <label>产品状态</label>
          <span>{{status}}</span>
        </li>
        <li class="fxdj">
          <label>风险等级</label>
          <span>{{detailConn.risk}}</span>
        </li>
        <li class="sylx">
          <label>收益类型</label>
          <span>{{detailConn.income}}</span>
        </li>
        <li class="qxlx">
          <label>期限类型</label>
          <span>{{detailConn.period}}</span>
        </li>
        <li class="yzms">
          <label>运作模式</label>
          <span>{{detailConn.mode}}</span>
        </li>
        <li class="tzzclx">
          <label>投资资产类型</label>
          <span>{{detailConn.type}}</span>
        </li>
        <li class="lcqx">
          <label>理财期限</label>
          <span>{{detailConn.limit}}天</span>
        </li>
        <li class="xsqy">
          <label>销售区域</label>
          <span>{{area}}</span>
        </li>
      </ul>
    </div>
    <div class="finaCycleBox">
      <h2>
        <span>理财周期</span>
      </h2>
      <div class="finaCycleList swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide finaCycleListConn1" :class="{show:markShow == 0}">
            <p class="finaText finaP">
              <span></span>
              <span>预售截止</span>
            </p>
            <div class="rangeDiv">
              <p></p>
            </div>
            <p class="finaTime finaP">
              <span></span>
              <span>{{time[0]}}</span>
            </p>
            <p class="finaMark dn">预售中</p>
          </li>
          <li class="swiper-slide finaCycleListConn2" :class="{show:markShow == 1}">
            <p class="finaText finaP">
              <span>募集开始</span>
              <span>募集截止</span>
            </p>
            <div class="rangeDiv">
              <p class="dn"></p>
            </div>
            <p class="finaTime finaP">
              <span>{{time[1]}}</span>
              <span>{{time[2]}}</span>
            </p>
            <p class="finaMark dn">在售中</p>
          </li>
          <li class="swiper-slide finaCycleListConn3" :class="{show:markShow == 2}">
            <p class="finaText finaP">
              <span>产品起始</span>
              <span>产品到期</span>
            </p>
            <div class="rangeDiv">
              <p class="dn"></p>
            </div>
            <p class="finaTime finaP">
              <span>{{time[3]}}</span>
              <span>{{time[4]}}</span>
            </p>
            <p class="finaMark dn">存续中</p>
          </li>
        </ul>
        <div class="swiper-pagination swiperBtn"></div>
        <!--分页器-->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import Fdetail from "../../components/header/detailHeader";
export default {
  components: { Fdetail },
  data() {
    return {
      detailConn: {},
      area: "",
      time: [],
      initialSlide: 0,
      status: "",
      markShow: null
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {},
  methods: {
    getDetail() {
      this.axios("wealth/finance_detail", {
        params: { id: this.$route.params.id }
      }).then(result => {
        this.detailConn = result.data.data;
        this.area =
          result.data.data.area.length > 0
            ? result.data.data.area[0].cpxsqy
            : "";
        this.time = result.data.data.time;
        if (!this.compareDate(this.time[0])) {
          this.initialSlide = 0;
          this.status = "预售";
        } else if (
          this.compareDate(this.time[1]) &&
          !this.compareDate(this.time[2])
        ) {
          this.initialSlide = 1;
          this.status = "在售";
        } else if (
          this.compareDate(this.time[3]) &&
          !this.compareDate(this.time[4])
        ) {
          this.initialSlide = 2;
          this.status = "存续";
        } else {
          this.initialSlide = 3;
          this.status = "存续";
        }
        this.markShow = this.initialSlide;
        if (this.initialSlide == 3) {
          this.markShow = null;
          this.initialSlide = 2;
        }
        let mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal",
          /*横向滑动*/
          //loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
          pagination: { el: ".swiper-pagination" },
          initialSlide: this.initialSlide
        });
      });
    },
    //日期计算
    cc(dd, dadd) {
      //可以加上错误处理
      var a = new Date(dd);
      a = a.valueOf();
      a = a - dadd * 24 * 60 * 60 * 1000;
      a = new Date(a);
      newDate = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate();
      return newDate;
    },
    //日期比较
    //compareDate('2017/12/21')
    compareDate(aa) {
      var date1 = new Date(aa).getTime();
      var date2 = new Date().getTime();
      if (date2 > date1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
h2 {
  height: 50px;
  padding: 12px 0;
}

h2 span {
  display: inline-block;
  height: 26px;
  color: #444444;
  font-size: 16px;
  border-bottom: 2px solid #2388f0;
}
.proDetailBox,
.finaCycleBox {
  height: auto;
  background: #fff;
  padding: 0 5%;
  color: #444;
  padding-bottom: 20px;
  margin-bottom: 12px;
}
.proDetailBox ul li {
  -height: 32px;
  line-height: 32px;
  font-size: 14px;
}

.proDetailBox ul li:after {
  content: "";
  clear: both;
  /*清除浮动*/
  display: block;
  /*确保该元素是一个块级元素*/
}

.proDetailBox ul li label {
  width: 32%;
  display: block;
  text-align: right;
  padding-right: 5%;
  float: left;
}

.proDetailBox ul li span {
  padding-left: 5%;
  border-left: 1px solid #a6a6a6;
  display: block;
  float: left;
  width: 64%;
  min-height: 32px;
}
.finaCycleBox {
  padding: 0;
  padding-bottom: 20px;
}

.finaCycleBox h2 {
  padding: 12px 5%;
}

.finaCycleList {
  height: 150px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.finaCycleList .rangeDiv {
  width: 84.4%;
  height: 10px;
  background: #ccc;
  margin-left: 15.6%;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.finaCycleList ul {
  width: 300%;
  height: 100%;
}

.finaCycleList ul li {
  float: left;
  width: 33.33%;
}

.finaCycleList .rangeDiv p {
  width: 76%;
  height: 100%;
  background: url(../../images/finaCycleP.png) no-repeat;
  background-size: 100% 100%;
  display: none;
}
.finaCycleList li.show .rangeDiv p,
.finaCycleList li.show .finaMark {
  display: block;
}

.finaCycleList p.finaP {
  width: 82%;
  margin: 20px auto;
  font-size: 14px;
}

.finaCycleList p.finaP:after {
  content: "";
  clear: both;
  /*清除浮动*/
  display: block;
  /*确保该元素是一个块级元素*/
}

.finaCycleList p.finaP span:first-child {
  float: left;
}

.finaCycleList p.finaP span:last-child {
  float: right;
}

.finaCycleListConn2 .rangeDiv {
  width: 100%;
  margin-left: 0;
  border-radius: 0;
}

.finaCycleListConn2 .rangeDiv p {
  width: 64.5%;
  margin: 0 auto;
}

.finaCycleListConn3 .rangeDiv {
  margin-left: 0;
  border-radius: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.finaCycleListConn3 .rangeDiv p {
  float: right;
}

.finaMark {
  width: 48px;
  height: 26px;
  background: url(../../images/finaMarkBG.png) no-repeat;
  background-size: 100% 100%;
  color: #2388f0;
  text-align: center;
  line-height: 20px;
  position: absolute;
  left: 50%;
  top: 33px;
  margin-left: -24px;
  display: none;
}

.swiperBtn {
  width: 100px;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>