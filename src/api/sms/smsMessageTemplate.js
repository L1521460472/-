import request from '../../utils/request'

// 获取sms消息模板列表
export const getMessageTemplateList = (params) => {
    return request({
      url: '/enterprise-business-service/sms/messageMould/pageList',
      method: 'post',
      data: params
    })
  }

//业务类型
export const businessTypeList = (params)=>{
    return request({
        url:'/enterprise-business-service/common/queryBusinessListByProductType',
        method:'get',
        params:params
    })
}

// 获取消息模板数量
export const getMouldNum = (params) => {
    return request({
      url: '/enterprise-business-service/sms/messageMould/mouldGroupByMouldType',
      method: 'post',
      data: params
    })
  }
    
// 获取应用列表
export const getAppList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/list',
    method: 'get',
    params: params
  })
}

// 发送模板消息
export const sentMessage = (params) => {
  return request({
    url: '/enterprise-business-service/sms/messageMould/sendMouldMessage',
    method: 'post',
    data: params
  })
}

// 删除消息模板
export const deleteMessageMould = (params) => {
  return request({
    url: '/enterprise-business-service/sms/messageMould/deleteById',
    method: 'delete',
    params: params
  })
}







