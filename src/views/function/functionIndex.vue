<template>
    <div class="header">
        <div class="title">添加功能插件</div>
        <div class="content">你可以添加下列需要的功能，丰富平台能力和体验</div>
        <div class="banner">
            <ul>
                <li v-for="(item,index) in dataList" :key="item.type">
                    <div class="liLeft"><img :src="item.src" alt=""></div>
                    <div class="liCenter">
                        <div class="liCenterTop">{{item.name}}</div>
                        <div class="liCenterBottom">{{item.content}}</div>
                    </div>
                    <div class="liRight">
                        <div class="liRightText"><span v-show="item.status == 2">已添加</span></div>
                        <img @click="handleClick(item.checkStatus,item.type)" src="../../assets/svg/icon_下一张_选中.svg" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {plug} from '../../api/function/index'
import { getCookie, download } from '../../public'
export default {
    name:"functionIndex",   
    data() {
        return {
            dataList:[
                {
                    id:null,src:require('../../assets/svg/icon_左侧_消息（线性）.svg'),name:'RCS消息',content:'开通后可以发送富媒体消息',type:1,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_sms短信.svg'),name:'SMS短信',content:'开通后可以发送文本短信',type:2,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_mms短信.svg'),name:'MMS短信',content:'开通后可以发送视频短信',type:3,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_自动回复.svg'),name:'自动回复',content:'可以针对用户的行为来设置特定的回复内容和关键词回复规则',type:4,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_自定义菜单.svg'),name:'自定义菜单',content:'可以在消息会话界面底部设置自定义菜单，并可为其设置响应动作',type:5,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_聊天机器人.svg'),name:'聊天机器人',content:'开通后可以使用AI机器人与用户进行消息互动',type:6,status:0,checkStatus:-1
                },
                {
                    id:null,src:require('../../assets/svg/icon_46px_号码归属查询.svg'),name:'号码归属查询',content:'号码归属查询根据用量次数进行计费',type:7,status:0,checkStatus:-1
                },
            ],
            enterpriseId: getCookie('enterpriseId'),
        }
    },
    methods: {
        handleClick(checkStatus,val){
            // console.log(index,val)
            this.$router.push({
                path:'/rcsDetail',
                query:{checkStatus:checkStatus,type:val}
            });
        },
        getData(){
            plug({type:0}).then((res)=>{
                res.data.data.plugOpenList.map((item,index)=>{
                    if(this.dataList[index].type == item.type){
                        this.dataList[index].status = item.status;
                        this.dataList[index].id = item.id;
                        this.dataList[index].checkStatus = res.data.data.enterpriseDetail.checkStatus;
                    }
                })
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.getData()
    },
}
</script>
<style lang="less" scoped>
.header{
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
    .title {
      height: 90px;
      font-size: 20px;
      line-height: 80px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .content{
        height: 50px;
        font-size: 14px;
        color: #999999;
    }
    .banner{
        width: 100%;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            padding: 0;
            li{
                width: 45%;
                height: 120px;
                display: flex;
                border: 1px solid #e5e5e5;
                margin-bottom: 45px;
                .liLeft{
                    width: 120px;
                    height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #739ED8;
                }
                .liCenter{
                    width: calc(100% - 240px);
                    height: 120px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    box-sizing: border-box;
                    padding: 10px 0px 10px 20px;
                    .liCenterTop{
                        font-size: 18px;
                        color: #333333;
                    }
                    .liCenterBottom{
                        font-size: 14px;
                        color: #666666;
                    }
                }
                .liRight{
                    width: 120px;
                    height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .liRightText{
                        width: 50px;
                        font-size: 16px;
                        color: #FE9636;
                    }
                    img{
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>