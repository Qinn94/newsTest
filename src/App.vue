<template>
  <div id="app">
    <h2>资讯包原创列表</h2>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;}
html,body{background:#f0f0f0;}
html, body, div,p, span, applet, object, iframe, h1, h2, h3, h4, h5, h6,blockquote, pre, a, abbr,acronym address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption,tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer,header,menu, nav, output, ruby, section, summary, time, mark, audio, video,select,input,textarea { margin:0; padding:0; border:0; list-style:none; font-family:"微软雅黑";}
table, tr,td,dl, dt, dd{ margin:0; padding:0; list-style:none; font-family:"微软雅黑";}
h1,h2,h3,h4,h5,h6 {font-size:12px; font-weight:normal;}
input{border:0px;background: none;outline: none;display: inherit;}
html,body{font-family: -apple-system,BlinkMacSystemFont,PingFangSC-Regular,"PingFang SC","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;}
div, span, h1, h2, h3, h4, h5, h6, p, a, img, dl, dt, dd, ol, ul, li, form{overflow:visible;}
.f-none{float: none !important;}
ul{zoom: 1;}
ul:after{display: block;content: "";clear: both;}
a { text-decoration:none;color:#333;}
a:hover{color:#3978F0!important;}
.mr0{margin-right: 0px !important;}
.clearfix:after {content:""; display:block; height:0; visibility:hidden; clear:both; }
.clearfix{zoom:1;}
.clear{clear:both; height:0; font-size:0;overflow:hidden; line-height:0;}
.auto{margin-left:auto;margin-right:auto;}
.fl{float:left;}
.fr{float:right;}
.show{display:block!important;}
.hide{display:none!important;}
img{vertical-align:middle; *vertical-align: top; }
.boxcenter{margin: 0 auto; width:1000px;}
.db{display:block!important;}
.dn{display:none;}
.ib{display:inline-block;}
h2{font-size:26px;text-align:center;line-height:80px;}
</style>
