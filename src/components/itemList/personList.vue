<template>
  <div>
    <div id="main">
      <div class="queryConditionsBox">
        <ul class="queryConditionsUl">
          <li :class="{active:tabListShow1}" class="queryConditionsLi">
            <p
              @click="tabListToggle1"
              class="tabTitle2"
            >{{tab1CheckedText !="" ?tab1CheckedText :"机构类别"}}</p>
            <span class="sanjiao"></span>
          </li>
          <li class="queryConditionsLi">
            <p
              @click="tabListToggle2"
              class="tabTitle2"
            >{{tab2CheckedText !="" ?tab2CheckedText :"资格种类"}}</p>
            <span class="sanjiao"></span>
          </li>
        </ul>
        <div class="tabConnBox" :class="{show:tabListShow1 || tabListShow2}">
          <div class="tabConn jgList tabConnList" :class="{show:tabListShow1}">
            <ul>
              <li
                v-for="(item,index) in aoiList"
                :key="index"
                :class="{active:tab1Checked == index}"
              >
                <p @click="tab1ConnChecked(index,item.name)" class="jgListTitle">{{item.name}}</p>
                <div class="jgListConn">
                  <p
                    @click="tabConnAoi(itemConn._id)"
                    v-for="itemConn in item.value"
                    :key="itemConn._id"
                    :aoi_id="itemConn._id"
                    :class="{active:apiParam.aoi == itemConn._id}"
                  >{{itemConn.aoi_name}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="tabConn HighLevelList" :class="{show:tabListShow2}">
            <ul>
              <li
                @click="tab2ConnChecked(item.id,item.name)"
                v-for="item in ptiList"
                :key="item.id"
                :pti_id="item.id"
                :class="{active:apiParam.pti === item.id}"
              >{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="shadowBox" :class="{show:tabListShow1 || tabListShow2}"></div>

      <div class="personList">
        <div class="noDataBox" :class="{show:noDataShow}"></div>
        <div class="errorBox" :class="{show:errBoxShow}"></div>
        <ul>
          <li v-for="item in personList" :key="item.id" :id="item.id">
            <div class="imgBox">
              <img :src="item.photo" />
            </div>

            <div class="personInfoL fl">
              <p class="name">{{item.name}}</p>
              <p>{{item.eco_name}}</p>
            </div>
            <div class="xian fl"></div>
            <div class="personInfoR fl">
              <p class="name">{{item.pti_name}}</p>
              <p class="companyName">{{item.gov}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loadBox" :class="{show:loadShow}">努力为您加载中……</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //机构类别列表
      aoiList: [],
      //资格种类列表
      ptiList: [],
      //人员列表
      personList: [],
      //人员列表总条数
      total_count: 0,
      tabListShow1: false,
      tabListShow2: false,
      //机构类别大类选中
      tab1Checked: null,
      //资格种类大类选中
      tab2Checked: null,
      //机构类别大类选中内容
      tab1CheckedText: "",
      //资格种类大类选中内容
      tab2CheckedText: "",
      noDataShow: false,
      loadShow: false,
      errBoxShow: false,
      backUpShow: false,
      onFetching: false,
      apiParam: {
        //机构id,机构类别细类选中
        aoi: "",
        //资格种类id
        pti: "",
        key: ""
      },
      pageNum: 1,
      pageSize: 10,
      scrollFlag: true
    };
  },
  created() {
    this.getTab();

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
              that.getPersonList();
              that.onFetching = false;
            }, 500);
          }
        }
      }
    };
  },
  methods: {
    //获取tab列表
    getTab() {
      this.axios.get("wealth/finance_person").then(result => {
        this.aoiList = [
          {
            name: "机构类别",
            value: []
          }
        ].concat(result.data.data.aoi);
        this.ptiList = [
          {
            name: "资格种类",
            id: 0
          }
        ].concat(result.data.data.pti);
        console.log(this.aoiList);
        console.log(this.ptiList);
      });
    },
    //tab列表1显隐切换
    tabListToggle1() {
      this.tabListShow1 = !this.tabListShow1;
      if (this.tabListShow1) {
        this.tabListShow2 = false;
      }
    },
    tabListToggle2() {
      this.tabListShow2 = !this.tabListShow2;
      if (this.tabListShow2) {
        this.tabListShow1 = false;
      }
    },
    //tab列表1机构类别选中
    tab1ConnChecked(index, name) {
      console.log(index);
      this.tab1Checked = index;
      this.tab1CheckedText = name.toString().substring(0, 4);
      console.log(this.tab1CheckedText);
      if (index == 0) {
        this.tabListShow1 = false;
        this.tab1Checked = null;
        this.apiParam.aoi = "";
      }
    },
    //aoi列表id选择
    tabConnAoi(id) {
      this.apiParam.aoi = id;
      console.log(id);
      this.tabListShow1 = false;
    },
    //资格种类选中
    tab2ConnChecked(id, name) {
      this.apiParam.pti = id;
      this.tab2CheckedText = name;
      this.tabListShow2 = false;
      if (id == 0) {
        this.tabListShow2 = false;
        this.tab2Checked = null;
        this.apiParam.pti = "";
      }
    },
    getPersonList() {
      this.noDataShow = false;
      this.loadShow = true;
      this.scrollFlag = true;
      this.onFetching = false;
      this.axios
        .get(
          "wealth/finance_person_list?page_size=" +
            this.pageSize +
            "&page_num=" +
            this.pageNum,
          {
            params: this.apiParam
          }
        )
        .then(result => {
          this.personList = this.personList.concat(result.data.data.data_list);
          this.total_count = result.data.data.total_count;
          if (this.total_count == 0) {
            this.noDataShow = true;
            this.loadShow = false;
          }
          if (result.data.data.data_list.length < this.pageSize) {
            this.loadShow = false;
            this.scrollFlag = false;
          }
          this.pageNum += 1;
        })
        .catch(error => {
          this.loadShow = false;
        });
    }
  },
  computed: mapGetters(["getSearchKey"]),
  watch: {
    getSearchKey: {
      handler(newVal, oldVal) {
        this.apiParam.key = this.getSearchKey;
      },
      immediate: true
    },
    apiParam: {
      deep: true,
      handler(newVal, oldVal) {
        this.pageNum = 1;
        this.personList = [];
        this.getPersonList();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
#main {
  background: #fff;
  width: 100%;
  height: auto;
}

.queryConditionsBox {
  height: 46px;
  padding: 10px 0;
  position: relative;
  z-index: 100;
}

.queryConditionsBox ul.queryConditionsUl {
  height: auto;
  color: #3d3d3d;
}

.queryConditionsBox ul.queryConditionsUl:after {
  content: "";
  clear: both;
  /*清除浮动*/
  display: block;
  /*确保该元素是一个块级元素*/
}

.queryConditionsBox ul.queryConditionsUl li.queryConditionsLi {
  width: 30%;
  height: 26px;
  float: left;
  margin: 0 1.5%;
  position: relative;
}

.queryConditionsBox ul li.queryConditionsLi p.tabTitle2 {
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #3d3d3d;
  font-size: 12px;
  background: url(../../images/downbg.png) no-repeat 95% center;
  background-size: 14px auto;
}
.queryConditionsBox ul li.queryConditionsLi.active p.tabTitle2 {
  background-image: url(../../images/upbg.png);
}
.queryConditionsBox ul li.queryConditionsLi.active span.sanjiao {
  width: 15px;
  height: 8px;
  display: block;
  background: url(../../images/sanjiao.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -5px;
  z-index: 100;
}
.tabConn {
  width: 100%;
  height: auto;
  display: none;
}
.tabConn.show {
  display: block;
}
.tabConnBox {
  display: none;
  width: 100%;
  height: auto;
  border-top: 1px solid #a6a6a6;
  margin-top: 9px;
}
.tabConnBox.show {
  display: block;
}
.tabConnBox .jgList ul {
  position: relative;
}
.tabConnBox .jgList li {
  width: 45%;
  background: #f3f3f3;
  border-bottom: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  padding: 0 2% 0 5%;
  color: #7c7c7c;
  height: 46px;
}
.tabConnBox .jgList li p.jgListTitle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.tabConnBox .jgList li:last-child {
  border-bottom: 1px solid #e6e6e6;
}
.tabConnBox .jgList li.active {
  border-right: 1px solid #fff;
  background: #fff;
  color: #3d3d3d;
}
.tabConnBox .jgList li.active div {
  display: block;
}
.tabConnBox .jgList ul div {
  position: absolute;
  left: 44%;
  top: 0;
  background: #fff;
  width: 56%;
  height: 100%;
  overflow-y: auto;
  color: #7c7c7c;
  border-left: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  display: none;
}
.tabConnBox .jgList ul div p {
  height: 46px;
  line-height: 46px;
  padding-left: 10%;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.tabConnBox .jgList ul div p.active {
  color: #3d3d3d;
}
.personList {
  padding: 0 5%;
}
.personList ul li {
  height: 112px;
  border-bottom: 1px solid #ebebeb;
  padding: 18px 0;
  overflow: hidden;
}
.personList ul li:after {
  content: "";
  clear: both;
  display: block;
}
.personList ul li .imgBox {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  float: left;
  overflow: hidden;
}
.personList ul li .imgBox img {
  width: 75px;
  height: auto;
  display: block;
}
.personList .personInfoL {
  width: 20%;
  text-align: right;
  font-size: 12px;
  color: #888;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.personList .personInfoL p.name {
  color: #444;
  font-size: 18px;
  line-height: 20px;
}
.personList .xian {
  height: 45px;
  margin: 15px 5%;
  width: 1px;
  background: #979797;
}
.personList .personInfoR {
  width: 45%;
}
.personList .personInfoR p.name {
  width: 84px;
  height: 16px;
  text-align: center;
  color: #119af1;
  border: 1px solid #119af1;
  line-height: 14px;
  margin: 17px 0;
}
.personList .personInfoR p.companyName {
  font-size: 12px;
  color: #888;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.HighLevelList ul li {
  height: 46px;
  line-height: 46px;
  background: #f3f3f3;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 5%;
  color: #7c7c7c;
  height: 46px;
}
.HighLevelList ul li.active {
  background: #fff;
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
#shadowBox {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 37px;
  margin-top: 180px;
  background: rgba(0, 0, 0, 0.4);
  display: none;
}
#shadowBox.show {
  display: block;
}
@media only screen and (min-width: 100px) and (max-width: 320px) {
  #top .tabTitle {
    font-size: 14px;
  }
  .personList .personInfoR {
    width: 40%;
  }
  .personList .personInfoL {
    width: 22%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .personList .personInfoL p.name {
    color: #444;
    font-size: 18px;
    line-height: 20px;
  }
  .top .formDiv input {
    padding-left: 30px;
  }
  .tabConnBox .jgList li {
    height: 42px;
  }
  .tabConnBox .jgList ul div p {
    height: 42px;
  }
  .tabConnBox .jgList ul div {
    height: 336px;
  }
}
</style>