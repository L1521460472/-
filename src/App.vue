<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
#app {
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#333333;
}
body .el-table th.gutter{
display: table-cell!important;
}
/* 交换confirmz弹窗确认按钮位置 */
.btn-custom-confirm{
  float: left !important;
  /* margin-left: 10px; */
}
/* .el-message-box__btns button:nth-child(2) {
    margin-right: 10px;
} */
.el-message-box__btns{
  padding:  5px 130px 0 !important;
}
/* 兼容safari浏览器，防止表头错位 */
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
/* 设置el-tooltip宽度 */
.el-tooltip__popper{
  max-width: 300px!important;
  max-height: 90% !important;
  overflow: auto;
}

/* 去掉el-tooltip聚焦边框 */
.el-tooltip:focus{
  outline: 0 !important;
}
.v-modal{
  top:60px !important;
}
.el-drawer__wrapper{
  top: 60px !important
}
*{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
input{
  outline: none
}
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  box-shadow: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
/* 抽屉超出滚动 */
.el-drawer__header span:focus {
  outline: 0;
}
.el-drawer:focus {
  outline: 0;
}

.el-drawer__open .el-drawer.rtl{
  overflow-y: auto;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  width: 12px;
  height: 12px;
}
/* 操作图标居中 */
.operation {
  margin-left: 10px;
  display: block;
  float: left;
  cursor: pointer;
}
.headerBtn .el-input--small .el-input__inner{
  height: 36px;
  line-height: 36px;
}
.headerBtn .el-input--small .el-input__icon{
  line-height: 36px;
}
.headerBtn .el-range-editor--small.el-input__inner{
  height: 36px;
}
/* 按钮icon文字居中 */
.headerBtnRight .el-button span{
  display: flex;
  align-items: center;
}
.headerBtnRight .el-button span .iconfont{
  margin-right: 4px
}
/* 更改tree组件icon */
.el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/* 有子节点 且未展开 */
.el-tree .el-icon-caret-right:before {
  background: url("./assets/svg/fold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
/* 有子节点 且已展开 */
.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  background: url("./assets/svg/unfold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
.el-tree .el-tree-node__expand-icon.is-leaf::before {
  background: url("./assets/svg/file_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
/* el-tab  切换时蓝色边框问题 */
.el-tabs__item:focus.is-active.is-focus:not(:active) {
         -webkit-box-shadow: none;
          box-shadow: none;
}
</style>
