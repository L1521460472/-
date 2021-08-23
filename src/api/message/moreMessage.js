import request from '../../utils/request'

// 获取消息列表
export const getMessageList = (params) => {
  return request({
    url: '/enterprise-business-service/messageMould/list',
    method: 'post',
    data: params
  })
}


// 发送模板消息
export const sendTempalteMsessage = (params) => {
  return request({
    url: '/enterprise-business-service/message/sendMouldMessage',
    method: 'post',
    data: params
  })
}


// 通讯录导入
export const addressImport = (params) => {
  return request({
    url: '/enterprise-business-service/message/addressBook/import',
    method: 'post',
    data: params
  })
}


/**
 * 导入通讯录接口
 */

// 通讯录--左侧个人通讯录树状列表
export const leftMenu = (params) => {
  return request({
    url: '/enterprise-business-service/message/addressBook/treeList',
    method: 'post',
    data: params
  })
}

// 通讯录--获取顶部企业设置的字段
export const getHeadList = (params) => {
  return request({
    url: '/enterprise-business-service/message/addressBook/queryColumnList',
    method: 'get',
    data: params
  })
}

// 通讯录--分页获取联系人自定义列表
export const getTableList = (params) => {
  return request({
    url: '/enterprise-business-service/message/addressBook/pageList',
    method: 'post',
    data: params
  })
}

// 通讯录--导入联系人

