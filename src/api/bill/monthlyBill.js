import request from '../../utils/request';

//月结账单查询
export const tableList = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseAccountConsumeDetail/list',
        method:'post',
        data:params
    })
}

//月结账单下载
export const download = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseAccountConsumeDetail/export',
        method:'post',
        data:params,
        responseType: 'blob'
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