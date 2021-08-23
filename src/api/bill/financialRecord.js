import request from '../../utils/request';

//财务记录查询
export const tableList = (params)=>{
    return request({
        url:'/enterprise-business-service/incomeAndExpenseDetail/pageListFinancialRecord',
        method:'post',
        data:params
    })
}