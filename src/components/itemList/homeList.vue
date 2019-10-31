<template>
  <div>
    <div class="companyList">
      <div class="loadingBox"></div>
      <div class="noDataBox" :class="{show:noDataShow}"></div>
      <div class="errorBox" :class="{show:errBoxShow}"></div>
      <ul>
        <router-link
          tag="li"
          v-for="item in itemList"
          :key="item.id"
          :id="item.id"
          :to="'/FDetail/'+item.id"
        >
          <div class="syDetail">
            <p class="companytext">
              <button
                class="cpztBtn"
                :class="{yellow:item.status_name == '预售',red:item.status_name == '在售',blue:item.status_name == '存续'}"
              >{{item.status_name}}</button>
              <span style="border-right: 1px solid #444;">{{item.gov}}</span>
              <span>{{item.name}}</span>
            </p>
            <p class="biaoshi">
              <span>{{item.income_name}}</span>
              <span>{{item.period}}天</span>
            </p>
          </div>
          <div style="clear: both;"></div>
        </router-link>
      </ul>
    </div>
    <div class="loadBox" :class="{show:loadShow}">努力为您加载中……</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      itemList: [],
      //总条数
      total_count: null,
      noDataShow: false,
      loadShow: false,
      errBoxShow: false,
      scrollFlag: true,
      onFetching: false, //防止页面滑动时多次加载
      pageNum: 1,
      backUpShow: false,
      params: {},
      itemListNo: false
    };
  },
  created() {
    let that = this;
    let scrollTime;
    let screenHeight = window.screen.height;
    window.onscroll = function() {
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (that.onFetching) {
      } else {
        if (scrollTop > screenHeight) {
          that.backUpShow = true;
        } else {
          that.backUpShow = false;
        }
        that.$emit("backUpEvent", that.backUpShow);
        if (
          Math.round(screenHeight + scrollTop) >=
          Math.round(document.body.scrollHeight)
        ) {
          that.onFetching = true;
          if (that.scrollFlag) {
            scrollTime = setTimeout(function() {
              that.getList();
              that.onFetching = false;
            }, 500);
          }
        }
      }
    };
  },
  methods: {
    ...mapActions(["setPageNum", "setListNo"]),
    getList() {
      if (this.getListNo) {
        this.itemList = [];
        this.setListNo(false);
      }
      this.noDataShow = false;
      this.loadShow = true;
      this.scrollFlag = true;
      this.onFetching = false;
      this.params.page_num = this.getPageNum;
      this.axios
        .get("wealth/finance_list", {
          params: this.params
        })
        .then(result => {
          this.itemList = this.itemList.concat(result.data.data.data_list);
          this.total_count = result.data.data.total_count;

          if (this.total_count == 0) {
            this.noDataShow = true;
            this.loadShow = false;
          }
          if (result.data.data.data_list.length < this.getParams.page_size) {
            this.loadShow = false;
            this.scrollFlag = false;
          }
          this.setPageNum(this.getPageNum + 1);
        })
        .catch(error => {
          this.loadShow = false;
        });
    }
  },
  computed: { ...mapGetters(["getParams", "getListNo", "getPageNum"]) },
  watch: {
    getParams: {
      handler(newVal, oldValue) {
        this.params = newVal;
        this.getList();
      },
      immediate: true
    },
    getListNo: {
      handler(newVal, oldValue) {
        this.itemListNo = newVal;
      }
    }
  }
};
</script>

<style>
.companyList ul li {
  height: auto;
  border-top: 1px solid #ebebeb;
  padding: 20px 0;
}

.companyList ul li:last-child {
  border-bottom: 1px solid #ebebeb;
}

.companyList .syBox {
  width: 25%;
  text-align: center;
  float: left;
}

.companyList .syBox span {
  color: #f24957;
  font-size: 25px;
}

.companyList .syBox p {
  font-size: 12px;
  color: #888;
  line-height: 16px;
  clear: both;
}

.companyList .cpztBtn {
  display: inline-block;
  width: 30px;
  height: 16px;
  line-height: 16px;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
}

.companyList .cpztBtn.yellow {
  background: #f8a91e;
}

.companyList .cpztBtn.red {
  background: #f24957;
}

.companyList .cpztBtn.blue {
  background: #75d3ff;
}

.companyList .syDetail {
  width: 100%;
  height: auto;
  float: left;
}

.syDetail p.companytext {
  width: 100%;
  max-height: 36px;
  line-height: 18px;
  clear: both;
  overflow: hidden;
  /* text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical; */
}

.syDetail p.companytext span {
  color: #444;
  font-size: 13px;
  padding: 0 8px;
  margin: 0;
  height: 15px;
  line-height: 15px;
}

.syDetail p.companytext span:first-child {
  border-right: 1px solid #444;
}

.syDetail p.biaoshi {
  clear: both;
}

.syDetail p.companytext:after,
.syDetail p.biaoshi:after {
  content: "";
  clear: both;
  /*清除浮动*/
  display: block;
  /*确保该元素是一个块级元素*/
}

.syDetail p.biaoshi span {
  display: inline-block;
  height: 17px;
  line-height: 15px;
  color: #119af1;
  border: 1px solid #119af1;
  font-size: 12px;
  text-align: center;
  margin: 12px 0 0 8px;
  padding: 0 5px;
}

.syDetail p.biaoshi span:last-child {
  margin-left: 20px;
}

.loadBox {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  color: #bbb;
  font-size: 12px;
  text-align: center;
  display: none;
}
.loadBox.show {
  display: block;
}
</style>