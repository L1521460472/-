<template>
  <div id="header">
    <div class="header">
      <el-container>
        <el-header>
          <div class="left">
            <img src="../../assets/svg/logo.svg" alt="" />
            航通云信
          </div>
          <div class="right">
            <el-button type="text" @click="toInfo" >{{username}}</el-button> <span>|</span>
            <el-button type="text" style="margin:0" @click="handleOut">退出</el-button>
          </div>
        </el-header>
        <el-container style="height: calc(100% - 60px);">
          <el-aside width="200px">
            <!-- <el-aside width="null"> -->
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                :default-openeds="openeds_value"
                :collapse="isCollapse"
                background-color="#F8F8FB"
                text-color="#222"
                active-text-color="#368CFE"
                router
              >
                <!-- 一级菜单 -->
                <template v-for="item in menuItems">
                  <el-submenu
                    v-if="item.children && item.children.length&& item.show"
                    :index="item.url"
                    :key="item.id"
                  >
                    <template slot="title">
                      <!-- <i :class="'iconfont ' + item.icon"></i> -->
                      <!-- <img src='../assets/icon-左侧-消息（线性）@1x.png' alt=""> -->
                      <img class="icon" :src="require(`../../assets/svg/${item.icon}.svg`)" alt="" srcset="" />
                      <span>{{ item.name }}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <template v-for="subItem in item.children">
                      <el-submenu
                        v-if="subItem.children && subItem.children.length && subItem.show"
                        :index="subItem.url"
                        :key="subItem.id"
                      >
                        <template slot="title">
                          <!-- <i :class="'iconfont ' + subItem.icon"></i>
                          <img :src="subItem.imageUrl" alt=""> -->
                          <span>{{ subItem.name }}</span>
                        </template>

                        <!-- 三级菜单 -->
                        <el-menu-item
                          class="threeMenu"
                          v-for="threeItem in subItem.children"
                          :index="threeItem.url"
                          :key="threeItem.id"
                          >
                          <!-- <i :class="'iconfont ' + threeItem.icon"></i> -->
                          <!-- <img :src="threeItem.imageUrl" alt="" /> -->
                          <span slot="title">{{threeItem.name}}</span></el-menu-item
                        >
                      </el-submenu>

                      <el-menu-item
                        v-else
                        class="subItem"
                        :index="subItem.url"
                        :key="subItem.id"
                        >
                        <!-- <i :class="'iconfont ' + subItem.icon"></i>
                        <img :src="subItem.imageUrl" alt=""> -->
                        <span slot="title">{{subItem.name}}</span>
                      </el-menu-item
                      >
                    </template>
                  </el-submenu>

                  <el-menu-item v-else :index="item.url" :key="item.id">
                    <!-- <i :class="'iconfont ' + item.icon"></i> -->
                    <img class="icon" :src="require(`../../assets/svg/${item.icon}.svg`)" v-if="$route.path == '/homeIndex'" />
                    <img class="icon" :src="require(`../../assets/svg/${item.icon}2.svg`)" v-else />
                    <span slot="title">{{ item.name }}</span>
                  </el-menu-item>
                </template>
              </el-menu>
            <!-- </el-aside> -->
          </el-aside>
          <el-main>
            <div class="main">
              <router-view :authorityBttonList="menuItems" />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getLimitMenus } from '@/api/setting/menu'
import { getCookie, removeCookie } from "@/public"
import { LoginOut } from '@/api/homeIndex/login'
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      openeds_value: ['/homeIndex', '/message', '/robot', '/account', '/development','/setting','/baseSeeting','/addressBook','/statistical','/SMSmessage','/VMSmessage','/bill','/function','/signature'], //一进入就打开的菜单
      username: getCookie("loginName") || '账号管理',
      menuItems: [],
      btnList: []
    };
  },
  methods: {
    handleOut(){
      LoginOut().then(res => {
        if(res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '退出成功',
            center:true
          })
          removeCookie("enterpriseToken")
          removeCookie("enterpriseName")
          sessionStorage.removeItem('loginName')
          sessionStorage.removeItem('menuList')
          sessionStorage.removeItem('btnList')
          this.$router.push('/')
        } else {
          if (res.data.status == 3) {
            removeCookie("enterpriseToken")
            removeCookie("enterpriseName")
            this.$router.push('/')
          } else {
            this.$message.error({
              message:res.data.message,
              center:true
            })
          }
        }
      }).catch((err) => {
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    toInfo() {
      this.$router.push('/userInformation')
    },
    getMenuList(){
      getLimitMenus().then(res=>{
        if(res.data.status == 0){
          this.menuItems = res.data.data
          const data = res.data.data
          const result = this.getTreeData(data)
          sessionStorage.setItem('btnList', JSON.stringify(result))
          sessionStorage.setItem('menuList',JSON.stringify(res.data.data))
        } else {
          this.$message.error({
            message:res.data.message,
            center:true
          })
        }
      }).catch(err=>{})
    },
    getTreeData(data) {
      for(var i in data) {
        if (data[i].type == 2) {
          this.btnList.push(data[i].code)
        }
        if (data[i].children != 0) {
          this.getTreeData(data[i].children)
        }
      }
      return this.btnList
    }
  },
  mounted() {
    if (window.sessionStorage.getItem('menuList')) {
      this.menuItems = JSON.parse(window.sessionStorage.getItem('menuList'))
    } else {
      this.getMenuList()
    }
    this.getMenuList()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#header {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
    .left {
      // width: 250px;
      height: 42px;
      font-size: 20px;
      font-weight: 600;
      margin-left: 10px;
      margin-top: 9px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 42px;
        height: 42px;
        margin-right: 10px;
      }
    }
    .right {
      // width: 180px;
      height: 100%;
      float: right;
      padding-right: 8px;
      .el-button{
        color: rgba(0,0,0,0.8);
        font-size: 16px;
      }
      span{
          color: #e5e5e5;
          margin: 0 10px;
      }
    }
  }
  .el-header{
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .el-aside {
    height: 100%;
    padding-top: 20px;
    background-color: #f8f8fb !important;
    overflow: hidden;
    padding-right: 8px;
    box-sizing: border-box;
    .el-menu {
      border-right: none;
      width: 200px;
      .el-menu-item {
        font-size: 18px;
      }
      .el-submenu__title {
        span {
          font-size: 18px;
        }
      }
    }
    .el-submenu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        color: #333;
        padding-left: 56px!important;
        font-size: 14px;
      }
    }
    .el-submenu .el-menu--inline .el-menu-item span{
      color: #333;
    }
    .el-menu-item.is-active span{
      color: #368cfe !important;
    }

  }
  .el-aside:hover{
    overflow-y: auto;
  }
  /deep/ .el-menu .is-active{
    background-color: #f8f8fb !important;
    color: #368cfe !important;
  }

  .el-menu-item{
    font-size: 22px;
    color: #333 !important;
  }
  .subItem{
    font-size: 14px;
    color: #666 !important;
  }
  /deep/ .el-submenu__title{
    font-size: 22px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    background: #F8F8FB;
  }
  // .el-menu-item+.is-active{
  //     color: #368cfe !important;
  //     background-color: none;
  // }
  .el-menu-vertical-demo {
    height: 100%;
    user-select: none;
  }
  .el-menu-item:hover {
  background-color: #EDEDF2 !important;
  color: #368cfe !important;
}
/deep/ .el-submenu__title:hover {
  background-color: #EDEDF2 !important;
  color: #368cfe !important;
}

  .el-main {
    // width: 100%;
    // height: 100%;
    background: #F8F8FB;
    .main {
      // width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      background: #fff;
      // border: 1px solid #e5e5e5;
    }
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .header > .el-container {
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .icon{
    margin-right: 5px;
  }

}
</style>
