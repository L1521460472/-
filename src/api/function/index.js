import request from '../../utils/request'

// 插件
export const plug = (params) => {
  return request({
    url: '/enterprise-business-service/plugConfig/queryPlugList',
    method: 'post',
    data: params
  })
}

// 插件开通
export const openPlug = (params) => {
  return request({
    url: '/enterprise-business-service/plugConfig/openPlug',
    method: 'post',
    data: params
  })
}

// 插件的状态
export const plugDetail = (params) => {
  return request({
    url: '/enterprise-business-service/plugConfig/getPlugDetail',
    method: 'post',
    data: params
  })
}

// 插件停用
export const stopPlug = (params) => {
  return request({
    url: '/enterprise-business-service/plugConfig/stop',
    method: 'post',
    data: params
  })
}

//查询代理商列表
export const getAgentList = (params) => {
    return request({
      url: '/enterprise-business-service/plugConfig/selectAgentList',
      method: 'post',
      data: params
    })
}

//上传文件
export const uploadFile = (params) => {
    return request({
      url: '/enterprise-business-service/uploadFile/database',
      method: 'post',
      data: params,
    })
}