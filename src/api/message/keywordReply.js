import request from '../../utils/request'

// 获取关键词列表
export const getKeyords = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseKeyWordReply/pageList',
    method: 'post',
    data: params
  })
}

// 删除关键字
export const delKeyword = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseKeyWordReply/batchDelete',
    method: 'post',
    data: params
  })
}


// 新增关键词
export const addKeyword = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseKeyWordReply/add',
    method: 'post',
    data: params
  })
}

// 修改关键词
export const updateKeywords = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseKeyWordReply/update',
    method: 'post',
    data: params
  })
}

// 根据ID获取关键字详情
export const keywordDetail = (params) => {
  return request({
    url: `/enterprise-business-service/enterpriseKeyWordReply/detail/${params}`,
    method: 'get'
  })
}
