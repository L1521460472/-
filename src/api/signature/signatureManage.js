import request from '../../utils/request'

// 签名分页列表
export const getSignPageList = (params) => {
  return request({
    url: '/enterprise-business-service/signConfig/pageList',
    method: 'post',
    data: params
  })
}

export const addSign = (params) => { //新增签名
  return request({
    url: '/enterprise-business-service/signConfig/add',
    method: 'post',
    data: params
  })
}

export const deleteSign = (params) => {//删除签名
  return request({
    url: '/enterprise-business-service/signConfig/delete',
    method: 'post',
    data: params
  })
}

export const editSign = (params) => {//编辑签名
  return request({
    url: '/enterprise-business-service/signConfig/update',
    method: 'post',
    data: params
  })
}
