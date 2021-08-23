import request from '../../utils/request'

// 左侧分组查询
export const leftMenu = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBook/treeList',
    method: 'post',
    data: params
  })
}


// 新增左侧分组
export const addLeftMenu = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBook/add',
    method: 'post',
    data: params
  })
}

// 修改左侧分组
export const updateLeftMenu = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBook/update',
    method: 'post',
    data: params
  })
}


// 删除左侧分组
export const deleteLeftMenu = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBook/delete',
    method: 'post',
    data: params
  })
}


// 获取右侧表头
export const getHeadList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/queryColumnList',
    method: 'get',
    params: params
  })
}

// 获取表格列表
export const getTableList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/pageList',
    method: 'post',
    data: params
  })
}

// 新增通讯录
export const addAddress = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/add',
    method: 'post',
    data: params
  })
}


// 导出
export const exportExcel = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/export',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}


// 获取新增给或者编辑的时候表单的内容
export const formItem = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/getDetail',
    method: 'get',
    params
  })
}


// 删除联系人
export const deleteAddress = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/deleteByIds',
    method: 'post',
    data: params
  })
}

// 更新联系人
export const updateAddress = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/update',
    method: 'post',
    data: params
  })
}


// 导入
export const importFile = (formData, params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/import',
    method: 'post',
    data: formData,
    onUploadProgress: ProgressEvent => {
      // console.log('progressEvent', ProgressEvent, params)
      // params.file.percent = ProgressEvent.loaded / ProgressEvent.total * 100
      // params.onProgress(params.file)
      const complete = (ProgressEvent.loaded / ProgressEvent.total * 100 | 0)
      params.onProgress({percent: complete})
    }
  }).then(res => {
    params.onSuccess(res)
  }).catch(error => {
    params.onError(error)
  })
}

// 模板导出
export const exportTemplate = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookPersonField/mould/export',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}
