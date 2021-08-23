import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import { getCookie } from '../public'


const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: ()=>import('@/views/home/home.vue'),
    children:[
      {//首页
        path: '/homeIndex',
        name: 'homeIndex',
        component: ()=>import('@/views/home/homeIndex.vue')
      },
      {//群发消息
        path: '/moreMessages',
        name: 'moreMessages',
        component: ()=>import('@/views/rcs/moreMessage.vue')
      },
      {//收发记录
        path: '/records',
        name: 'records',
        component: ()=>import('@/views/rcs/record.vue')
      },
      {//消息模板
        path: '/messageTemplate',
        name: 'messageTemplate',
        component: ()=>import('@/views/rcs/messageTemplate.vue')
      },
      {//sms消息模板
        path: '/smsMessageTemplate',
        name: 'smsMessageTemplate',
        component: ()=>import('@/views/sms/smsMessageTemplate.vue')
      },
      {//vms消息模板
        path: '/vmsMessageTemplate',
        name: 'vmsMessageTemplate',
        component: ()=>import('@/views/vms/vmsMessageTemplate.vue')
      },
      {//消息制作器
        path: '/diyMessage',
        name: 'diyMessage',
        component: ()=>import('@/views/rcs/diyMessage/index.vue'),
      },
      {//sms消息制作器
        path: '/diySmsMessage',
        name: 'diySmsMessage',
        component: ()=>import('@/views/sms/diySmsMessage/index.vue'),
      },
      {//sms消息制作器
        path: '/diyVmsMessage',
        name: 'diyVmsMessage',
        component: ()=>import('@/views/vms/diyVmsMessage/index.vue'),
      },
      {
        path: '/keywordReply',
        name: 'keywordReply',
        component: () => import('@/views/rcs/keywordReply.vue')
      },
      {//媒体素材
        path: '/multimediaFile',
        name: 'mediaMaterial',
        component: ()=>import('@/views/rcs/mediaMaterial.vue')
      },
      {//自定义菜单
        path: '/customMenu',
        name: 'customMenu',
        component: ()=>import('@/views/rcs/customMenu.vue')
      },
      {//财务记录
        path: '/financialRecord',
        name: 'financialRecord',
        component: ()=>import('@/views/bill/financialRecord.vue'),
      },
      {//月结账单
        path: '/monthlyBill',
        name: 'monthlyBill',
        component: ()=>import('@/views/bill/monthlyBill.vue'),
      },
      { // sms  群发助手
        path: '/smsMoreMessage',
        name: 'smsMoreMessage',
        component: ()=>import('@/views/sms/moreMessage.vue')
      },
      { // sms收发记录
        path: '/smsRecord',
        name: 'smsRecord',
        component: () => import('@/views/sms/record.vue')
      },
      { // vms  群发助手
        path: '/vmsMoreMessage',
        name: 'vmsMoreMessage',
        component: ()=>import('@/views/vms/moreMessage.vue')
      },
      { // vms收发记录
        path: '/vmsRecord',
        name: 'vmsRecord',
        component: () => import('@/views/vms/record.vue')
      },
      { // vms 媒体素材
        path: '/vmsMediaMaterial',
        name: 'vmsMediaMaterial',
        component: () => import('@/views/vms/mediaMaterial.vue')
      },
      {//功能插件
        path: '/funComponent',
        name: 'funComponent',
        component: ()=>import('@/views/function/functionIndex.vue'),
      },
      {//rcs功能插件详情
        path: '/rcsDetail',
        name: 'rcsDetail',
        component: ()=>import('@/views/function/rcsDetail.vue'),
      },
      {//我的机器人
        path: '/myrobot',
        name: 'myrobot',
        component: ()=>import('@/views/robot/myrobot.vue'),
      },
      {//实体管理
        path: '/entityManagement',
        name: 'entityManagement',
        component: ()=>import('@/views/robot/entityManagement.vue'),
      },
      {//意图管理
        path: '/intentionManagement',
        name: 'intentionManagement',
        component: ()=>import('@/views/robot/intentionManagement.vue'),
      },
      {//调试信息
        path: '/debugInformation',
        name: 'debugInformation',
        component: ()=>import('@/views/robot/debugInformation.vue'),
      },
      { // 个人通讯录
        path: '/personalAddressBook',
        name: 'personalAddressBook',
        component: () => import('@/views/addressBook/personalAddressBook.vue')
      },
      { // 通讯录管理
        path: '/manageAddressBook',
        name: 'manageAddressBook',
        component: () => import('@/views/addressBook/manageAddressBook.vue')
      },
      {//统计
        path: '/statisticalReport',
        name: 'statisticalReport',
        component: ()=>import('@/views/statistics/statisticalReport.vue'),
      },
      {//统计
        path: '/signatureManage',
        name: 'signatureManage',
        component: ()=>import('@/views/signature/signatureManage.vue'),
      },
      {//我的应用
        path: '/myApps',
        name: 'myApps',
        component: ()=>import('@/views/Develop/myApps.vue')
      },
      {//基本配置
        path: '/userConfiguration',
        name: 'userConfiguration',
        component: ()=>import('@/views/Develop/userConfiguration.vue')
      },
      {//基本信息
        path: '/userInformation',
        name: 'userInformation',
        component: ()=>import('@/views/UserName/userInformation.vue')
      },
      {//密码设置
        path: '/setPassword',
        name: 'setPassword',
        component: ()=>import('@/views/UserName/setPassword.vue')
      },
      {//操作日志
        path: '/operationLog',
        name: 'operationLog',
        component: ()=>import('@/views/UserName/operationLog.vue')
      },
      {//账号管理
        path: '/accountManagement',
        name: 'accountManagement',
        component: ()=>import('@/views/setting/accountManagement.vue')
      },
      {//角色权限
        path: '/rolePermission',
        name: 'rolePermission',
        component: ()=>import('@/views/setting/rolePermission.vue')
      },
      { // 菜单管理
        path: '/menusetting',
        name: 'menusetting',
        component: () => import ('@/views/setting/menuButton.vue')
      }
    ]
  }
]


const router =  new Router({
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  const token = getCookie('enterpriseToken')
  if (to.path === '/') {
    if(token) {
      next('/homeIndex')
    } else {
      next()
    }
  } else {
    if (!token) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
