import request from '../../utils/request';

//业务类型
export const getBusinessLis = (params)=>{
    return request({
        url:'/enterprise-business-service/common/queryBusinessListByProductType',
        method:'get',
        params:params
    })
}

//产品类型
export const businessTypeList = (params) => {
    return request({
      url: '/enterprise-base-service/dictionaryType/listDictByTypeCodeList',
      method: 'post',
      data: params
    })
}

//企业应用list
export const enterpriseApplist = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseAccountApp/listByBusinessType',
        method:'get',
        params:params
    })
}

//保存并继续,修改
export const save = (params)=>{
    return request({
        url:'/enterprise-business-service/sms/messageMould/addOrUpdate',
        method:'post',
        data:params
    })
}

//审核
export const saveAndAudit = (params)=>{
    return request({
        url:'/enterprise-business-service/mouldAuthentication/addMouldAuthentication?messageMouldId='+params,
        method:'post',
        // data:params
    })
}

//消息模板详情
export const MessageMould = (params)=>{
    return request({
        url:'/enterprise-business-service/sms/messageMould/findByIdAndEnterpriseId',
        method:'get',
        params:params
    })
}

//签名列表
export const signConfigList = (params)=>{
    return request({
        url:'/enterprise-business-service/common/selectSignList',
        method:'get',
        params:params
    })
}