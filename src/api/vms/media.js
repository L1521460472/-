import request from '../../utils/request'

// 素材文件列表
export const getFileList = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroupDetail/pageList',
    method: 'post',
    data: params
  })
}

// 上传文件
export const uploadFile = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroupDetail/upload',
    method: 'post',
    data: params,
    timeout: 40000
  })
}

// 更新文件
export const updateFile = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroupDetail/update',
    method: 'post',
    data: params
  })
}

// 删除文件
export const deleteFileById = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroupDetail/deleteById',
    method: 'delete',
    params: params
  })
}

//  批量移动分组
export const batchUpdate = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroupDetail/batchUpdateGroupId',
    method: 'post',
    data: params
  })
}

// 删除分组
export const deleteGroups = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroup/deleteById',
    method: 'delete',
    data:params
  })
}

// 新增或更新素材组
export const updateGroup = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroup/addOrUpdate',
    method: 'post',
    data: params
  })
}

// 根据素材类型和状态获取素材组列表
export const getGroupByType = (params) => {
  return request({
    url: '/enterprise-business-service/vms/fileGroup/listByFileTypeAndStatus',
    method: 'post',
    data: params
  })
}
