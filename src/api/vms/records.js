import request from '../../utils/request'

/**
 * 查看记录
 * @param {*} params
 */
export const recoedDetail = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/view',
    method: 'post',
    data: params
  })
}


/**
 * 消息撤回
 * @param {*} params
 */
export const withdraw = (params) => {
  return request({
    url: '/enterprise-business-service/vms/message/withdraw',
    method: 'post',
    params: params
  })
}

/**
 * 发送批次记录
 * @param {*} params
 */
export const sendBatch = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/batchPageList',
    method: 'post',
    data: params
  })
}


/**
 * 获取通道列表
 * @param {*} params
 */
export const channelLists = (params) => {
  return request({
    url: '/enterprise-business-service/channel/listByEnterpriseAccountId',
    method: 'get',
    params: params
  })
}

/**
 * 消息接收记录列表
 * @param {*} params
 */
export const receiveList = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/receivePageList',
    method: 'post',
    data: params
  })
}

/**
 * 获取发送详情列表
 * @param {*} params
 */
export const sendDetailList = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/sendPageList',
    method: 'post',
    data: params
  })
}


/**
 * 消息批次撤回
 * @param {*} params
 */
export const messageBatchWithdraw = (params) => {
  return request({
    url: '/enterprise-business-service/vms/message/batchWithdraw',
    method: 'post',
    params: params
  })
}


// 消息回复
/**
 * 消息回复
 * @param {*} params
 */
export const replyMessage = (params) => {
  return request({
    url: '/enterprise-business-service/vms/message/reply',
    method: 'post',
    data: params
  })
}


/**
 * 批次消息重发
 * @param {*} params
 */
export const repeatMessage = (params) => {
  return request({
    url: '/enterprise-business-service/vms/message/batchResend',
    method: 'post',
    data: params
  })
}

/**
 * 记录导出
 * @param {*} params
 */
export const exportExcel = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/batchMessageExport',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

/**
 * 消息批次删除
 * @param {*} params
 */
export const deleteBatch = (params) => {
  return request({
    url: '/enterprise-business-service/vms/messageRecord/batchDelete',
    method: 'post',
    data: params
  })
}
