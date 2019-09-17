<template>
  <div class="list-container">
    <div class="mainR">
      <div class="mainRConn">
        <div class="companyList">
          <ul>
            <li v-for="item in newsList" :key="item.id" class="clearfix" :class="{gray:item.isdel}">
              <img :src="item.images[0]" />
              <div class="companyConn">
                <p class="companyTitle">
                  <a :href="item.PCurl" target="_blank">{{item.title}}</a>
                </p>
                <p class="MGCTime">
                  <span>{{item.source}}</span>
                  <span v-show="item.author!=''">作者：{{item.author}}</span>
                  <span>编辑：{{item.editor}}</span>
                  <span class="timeSpan">{{item.date}}</span>
                  <button class="danger" :class="{'btnShow':item.isdel == false}" @click="delData(item)">删除</button>
                  <button class="primary" :class="{'btnShow':item.isdel}" @click="addData(item)">撤销删除</button>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width: 300px; margin: 0 auto 30px;">
      <button class="moreBtn" v-if="page < totalPage-1" @click="getMore">点击加载更多</button>
    </div>
    <div class="tips" :class="{'tipsShow':tipsShow}" ref="myTip">
      {{tipsmsg}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      newsList: [],
      sn: this.$route.query.sn || '',
      totalPage: 0,
      tipsmsg:'',
      tipsShow:false,
      invt:''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取文章列表
    getList() {
      //console.log(this.sn)
      this.axios
        .get("https://app.cfbond.com/cfbond_app/App.tg_yc_new.action", {
          params: {
            page: this.page,
            random: new Date().getTime(),
            sn: this.sn
          }
        })
        .then(result => {
          this.totalPage = result.data.totalPage;
          this.newsList = this.newsList.concat(result.data.list);
          
        });
    },
    //加载更多
    getMore() {
      this.page++;
      this.getList();
    },
    //删除文章
    delData(item){
      this.axios.get("https://app.cfbond.com/cfbond_app/App.tg_yc_add_new.action",{
        params:{
          id:item.id,
          title:item.title,
          PublishedAt:item.time,
          sn:this.sn
        }
      }).then(result => {
        if(result.data.success == true){
          item.isdel = !item.isdel;
          this.tipsToggle("删除成功")
        }
        else{
          this.tipsToggle("删除失败");
        }
      })
    },
    //撤销删除
    addData(item){
      this.axios.get("https://app.cfbond.com/cfbond_app/App.tg_yc_del_new.action",{
        params:{
          id:item.id,
          sn:this.sn
        }
      }).then(result => {
        if(result.data.success == true){
          item.isdel = !item.isdel;
          this.tipsToggle("撤销删除成功")
        }
        else{
          this.tipsToggle("撤销删除失败")
        }
      })
    },
    tipsToggle(msg){
      this.tipsmsg = msg;
      this.tipsShow = !this.tipsShow;
      this.invt = setTimeout(() => {
        this.tipsShow = !this.tipsShow;
      },2000)
    }
  }
};
</script>

<style lang="scss" scoped>
.mainR {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  .mainRConn {
    padding: 16px 16px 0;
    .companyList {
      ul {
        overflow: hidden;
        margin-bottom: 20px;
        li {
          height: auto;
          padding: 16px 0;
          border-bottom: 1px solid #e8e8e8;
          overflow: hidden;
          img {
            width: 180px;
            height: auto;
            float: left;
            margin-right: 20px;
          }
        }

        .dataNo {
          text-align: center;
          line-height: 26px;
          padding: 15px;
          color: #999;
          margin-top: 20px;
        }
        .companyTitle {
          font-weight: bold;
          cursor: pointer;
          line-height: 24px;
          font-size: 16px;
          color: #151415;
          margin-bottom: 8px;
          span {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-left: 16px;
          }
        }
        .companyDesc {
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 24px;
          color: #595959;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .MGCTime {
          font-size: 14px;
          line-height: 20px;
          color: #999;
          span {
            margin-right: 20px;
          }
          button {
            float: right;
            margin-left: 10px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 12px;
            color:#fff;
            border:none;
            outline:none;
            cursor:pointer;
            display:none;
          }
          button:hover{
            opacity: .8;
          }
          button.danger{
            background:#FF5722;
          }
          button.primary{
            background:#009688;
          }
          button.btnShow{
            display:inline-block;
          }
          button.btnHide{
            display:none;
          }
        }
      }
    }
  }
}
.moreBtn{
    width:100%;
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #009688;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    outline:none;
}
.moreBtn:hover{
    opacity: .8;
}
.companyList li.gray a {
  color: #bbb;
}
.companyList li.gray span {
  color: #bbb;
}
.companyList li.gray img {
  opacity: 0.5;
}
.tips{
  height:50px;
  line-height:50px;
  width:150px;
  text-align:center;
  background:rgba(0,0,0,0.6);
  color:#fff;
  border-radius: 2px;
  position:fixed;
  left:50%;
  top:500px;
  margin-left:-75px;
  display:none;
}
.tips.tipsShow{
  display:block;
}
</style>