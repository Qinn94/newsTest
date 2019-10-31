<template>
  <div class="searchBox">
    <ul class="searchList1">
      <li
        v-for="(item,index) in tabList"
        :key="index"
        :ref="item.value"
        @click="searchTab1(index)"
        :class="{active:index == isActive}"
      >
        <span>{{item.tab}}</span>
        <p></p>
      </li>
    </ul>
    <div class="searchListConnBox">
      <ul
        v-for="(itemList,index) in tabList"
        :key="index"
        class="searchListConn"
        :class="['col'+itemList.fields.length,{show:isActive==index}]"
      >
        <li
          v-for="(item,i) in itemList.fields"
          :key="i"
          :value="item.value"
          @click="searchTab2($event)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="resetBox" :class="{'show':resetFlag}" @click="resetClick">
      <button>重置</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tabList: [],
      //重置按钮
      resetFlag: false,
      //tab1选中状态,tabList显示状态
      isActive: 0,
      //tab2选中状态
      isActive1: null,
      period: "",
      status: "",
      income: "",
      risk: ""
    };
  },
  created() {
    this.getTab();
  },
  computed: mapState(["page_num"]),
  methods: {
    ...mapActions([
      "setParams",
      "setListNo",
      "setPageNum",
      "setSearchKey",
      "setListNo"
    ]),
    getTab() {
      this.axios
        .get("wealth/finance_tab")
        .then(result => {
          this.tabList = result.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchTab1(index) {
      this.resetFlag = true;
      this.isActive = index;
    },
    //tab2点击事件
    searchTab2(e) {
      let that = e.currentTarget;
      this.resetFlag = true;
      //this.page_num = 1;
      this.setListNo(true);
      this.setPageNum(1);
      if ($(that).hasClass("active")) {
        $(that).removeClass("active");
        $(".searchList1 li.active span").show();
        console.log($(".searchList1 li.active p"));
        $(".searchList1 li.active p")
          .text("")
          .attr("value", "");
      } else {
        $(that)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $(".searchList1 li.active span").hide();
        var _text = $(that)
          .find("span")
          .text();
        if (_text.length == 7) {
          _text = _text.slice(0, 5);
        }
        $(".searchList1 li.active p")
          .text(_text)
          .attr("value", $(that).attr("value"));
      }
      this.status = $(this.$refs.status)
        .find("p")
        .attr("value");
      this.period = $(this.$refs.period)
        .find("p")
        .attr("value");
      this.income = $(this.$refs.income)
        .find("p")
        .attr("value");
      this.risk = $(this.$refs.risk)
        .find("p")
        .attr("value");
      this.setParams({
        status: this.status,
        period: this.period,
        income: this.income,
        risk: this.risk
      });
    },
    //重置按钮点击事件
    resetClick() {
      //this.page_num = 1;
      this.resetFlag = false;
      this.isActive = 0;
      $(".searchListConn li").removeClass("active");
      $(".searchList1 li span").show();
      $(".searchList1 li p").text("");
      this.setParams({
        status: "",
        period: "",
        income: "",
        risk: ""
      });
      this.setSearchKey("");
      this.setPageNum(1);
      this.setListNo(true);
    }
  }
};
</script>

<style scoped>
.searchBox {
  height: auto;
  padding-bottom: 20px;
}

.searchBox ul li {
  float: left;
  width: 25%;
  border: 1px solid #dfdfdf;
  text-align: center;
  border-right: none;
  background: #f3f3f3;
  font-size: 1.2rem;
  color: #444;
  height: 3rem;
  line-height: 2.8rem;
}

.searchBox ul.searchList1 {
  height: 31px;
  margin-bottom: 14px;
  width: 106%;
  margin-left: -3%;
}

.searchBox ul.searchList1 li {
  position: relative;
}

.searchBox ul.searchList1 li p {
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.searchBox td:first-child {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.searchBox td:last-child {
  border-right: 1px solid #dfdfdf;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.searchBox td.active {
  background: #119af1;
  color: #fff;
  border-color: #119af1;
}

.searchBox ul li.active {
  background: #119af1;
  color: #fff;
  border-color: #119af1;
}

.searchBox ul li:first-child {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.searchBox ul li:last-child {
  border-right: 1px solid #dfdfdf;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.searchBox ul.searchListConn {
  padding: 0 3.6%;
  height: 26px;
  display: none;
}
.searchBox ul.searchListConn.show {
  display: block;
}

.searchBox ul.searchListConn li {
  height: 2.6rem;
  line-height: 2.4rem;
  font-size: 1rem;
  overflow: hidden;
}

.searchBox ul.searchListConn.col5 li {
  width: 20%;
}

.searchBox ul.searchListConn.col3 li {
  width: 33.33%;
}

.searchBox ul.searchListConn li.active {
  background: #75d3ff;
  border-color: #75d3ff;
}
.resetBox {
  height: 36px;
  padding-top: 10px;
  display: none;
}
.resetBox.show {
  display: block;
}
.resetBox button {
  width: 70px;
  height: 26px;
  -border: none;
  background: #fff;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
  color: #119af1;
  border: 1px solid #119af1;
}
</style>