import request from '../../utils/request'

// 获取当前的企业信息
export const getCompanyInfo = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccount/selectAccountInfo',
    method: 'get',
    params:params
  })
}


// 提交认证信息
export const submitCompayInfo = (params) => {
  return request({
    url: '/enterprise-business-service//enterpriseAccount/saveEnterpriseAuthentication',
    method: 'post',
    data: params
  })
}


// 文件上传
export const uploadFile = (params) => {
  return request({
    url: '/enterprise-business-service/uploadFile',
    method: 'post',
    data: params
  })
}

// 操作日志

export const  getOperateionList= (params) => {
  return request({
    url: '/enterprise-business-service/operateHistory/pageList',
    method: 'post',
    data: params
  })
}

