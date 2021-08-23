import request from '../../utils/request';

//新增或更新消息模板
export const addOrUpdate = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMould/addOrUpdate',
        method:'post',
        params:params
    })
}

//图片分组list
export const imageGroup = (params)=>{
    return request({
        url:'/enterprise-business-service/fileGroup/listByFileTypeAndStatus',
        method:'post',
        data:params
    })
}

//图片、音频、视频lists
export const imageLists = (params)=>{
    return request({
        url:'/enterprise-business-service/fileGroupDetail/pageList',
        method:'post',
        data:params
    })
}

//图片、音频、视频确认选中,素材文件类型
export const getFile = (params)=>{
    return request({
        url:'/enterprise-business-service/fileGroupDetail/findByIdAndEnterpriseId',
        method:'get',
        params:params
    })
}

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
      url: '/enterprise-operation-service/dictionaryType/listDictByTypeCodeList',
      method: 'post',
      data: params
    })
}

//根据业务类型获取应用列表
export const enterpriseApplist = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseAccountApp/listByBusinessType',
        method:'get',
        params:params
    })
}

//通道
export const channelList = (params) => {
    return request({
      url: '/enterprise-business-service/channel/listByEnterpriseAccountId',
      method: 'get',
      params: params
    })
}

//保存并继续,修改
export const save = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMould/addOrUpdate',
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

//新增或更新消息模板卡片
export const saveCard = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMouldCard/addOrUpdate',
        method:'post',
        data:params
    })
}

//消息模板卡片列表
export const cardList = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMouldCard/listByMessageMouldId',
        method:'get',
        params:params
    })
}

//消息模板详情
export const MessageMould = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMould/findByIdAndEnterpriseId',
        method:'get',
        params:params
    })
}

//消息模板卡片详情
export const MessageMouldCard = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMouldCard/findById',
        method:'get',
        params:params
    })
}

//删除消息模板卡片
export const deleteCard = (params)=>{
    return request({
        url:'/enterprise-business-service/messageMouldCard/deleteById',
        method:'delete',
        params:params
    })
}