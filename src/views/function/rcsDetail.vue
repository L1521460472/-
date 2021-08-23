<template>
  <div class="header">
    <div class="title">添加功能插件</div>
    <div class="content">
      <el-divider direction="vertical"></el-divider>功能详情<el-button size="small" @click="handleBack" plain>返回</el-button>
    </div>
    <div class="banner">
      <div class="liLeft"><img :src="src" alt=""></div>
      <div class="liCenter">
        <div class="liCenterTop">{{title}}</div>
        <div class="liCenterBottom">{{content}}</div>
      </div>
      <div class="liRight">
        <el-button v-if="type == 0" class="button1" type="primary" size="small" :disabled="openDisabled" @click="handleClickOpen">{{buttonText}}</el-button>
        <el-button v-else-if="type == 1" class="button1" type="primary" size="small" disabled>申请中</el-button>
        <el-button v-else class="button2" type="primary" size="small" @click="handleClickStop">停用</el-button>
      </div>
    </div>
    <div class="nav">
      <div class="navTitle">·申请条件</div>
      <div class="navText">
        <ul>
          <li v-for="item in data1" :key="item.id">{{item.content}}</li>
        </ul>
      </div>
    </div>
    <div class="nav">
      <div class="navTitle">·功能介绍</div>
      <div class="navText">
        <ul>
          <li v-for="item in data2" :key="item.id">{{item.content}}</li>
        </ul>
      </div>
    </div>
    <div class="nav">
      <div class="navTitle">·功能费用</div>
      <div class="navText">{{text}}</div>
    </div>
    <!-- 插件开通 -->
    <el-drawer
    :title="drawerTitle"
    :visible.sync="pluginDrawer"
    :before-close="closePluginDrawer"
    :modal-append-to-body="true"
    :wrapperClosable="false"
    size="500px"
    class="collapseDrawer"
    direction="rtl">
      <el-form
        class="drawerContent formitem"
        ref="rcsPluginForm"
        :model="rcsPluginForm"
        :rules="rcsPluginRules"
        label-width="150px"
        label-position="right"
      >
        <el-collapse v-model="drawerActive" >
          <el-collapse-item title="基本信息" name="baseInfo">
            <el-form-item prop="customerName" label="客户名称：">
              <el-input size="small" maxlength="50" v-model="rcsPluginForm.customerName"></el-input>
            </el-form-item> 
            <el-form-item prop="customerContact" label="客户联系人：">
              <el-input size="small" maxlength="50" v-model="rcsPluginForm.customerContact"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="联系人手机：">
              <el-input size="small" maxlength="11" v-model="rcsPluginForm.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="联系人邮箱：">
              <el-input size="small" show-word-limit v-model="rcsPluginForm.email"></el-input>
            </el-form-item>  
            <el-form-item prop="belongArea" label="归属区域：">
                <el-cascader
                  v-model="rcsPluginForm.belongArea"
                  :options="this.$route.query.type == 1 ? belongAreaList2 : belongAreaList1"
                  size="small"
                  :props="defaultParams"
                  :show-all-levels="true"
                  clearCheckedNodes
                  clearable
                  ref="cascaderHandle"
                  @change="closeDepartment"
                ></el-cascader>
            </el-form-item> 
            <el-form-item prop="belongAgent" label="归属代理商：">
              <el-select value-key="belongAgentCode" v-model="rcsPluginForm.belongAgent" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in belongAgentList"
                  :key="item.belongAgentCode"
                  :label="item.belongAgentName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="industry" label="行业类型：">
              <el-select v-model="rcsPluginForm.industry" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="(item,index) in industryList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="fileAddress" label="附件：">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadPictures"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">您可上传的文件类型：pdf、doc、docx、xls、xlsx、ppt、pptx、jpg、jpeg、gif、rar、7z、zip,单个附件大小限100K,限上传1个文件</div>
              </el-upload>        
            </el-form-item>
            <el-form-item prop="remark" label="备注：">
              <el-input
                type="textarea"
                placeholder="请输入"
                maxlength="300"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                v-model="rcsPluginForm.remark"
              ></el-input>
            </el-form-item>
          </el-collapse-item> 
          <el-collapse-item title="合同信息" name="contractInfo">
            <el-form-item prop="contractCode" label="合同编码：">
              <el-input size="small" maxlength="20" show-word-limit v-model="rcsPluginForm.contractCode"></el-input>
            </el-form-item>
            <el-form-item prop="contractName" label="合同名称：">
              <el-input size="small" maxlength="20" show-word-limit v-model="rcsPluginForm.contractName"></el-input>
            </el-form-item>
            <el-form-item prop="effectiveDate" label="合同生效日期：">
              <el-date-picker
                v-model="rcsPluginForm.effectiveDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="expiryDate" label="合同失效日期：">
              <el-date-picker
                v-model="rcsPluginForm.expiryDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>            
            </el-form-item>
            <el-form-item prop="isRenewal" label="合同是否自动续约：">
              <el-radio-group v-model="rcsPluginForm.isRenewal">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="rcsPluginForm.isRenewal !==0 " prop="renewalDate" label="合同续签日期：">
              <el-date-picker
                v-model="rcsPluginForm.renewalDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>            
            </el-form-item>
            <el-form-item prop="contractFileAddress" label="合同电子扫描件：">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadPictures2"
                :before-upload="beforeAvatarUpload2"
                :limit="1"
                :file-list="fileList"
                :on-remove="handleRemove2"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">可上传的文件类型：pdf、doc、jpg、jpeg、gif、docx、rar,单个附件大小限10M,限上传1个文件</div>
              </el-upload>        
            </el-form-item>
          </el-collapse-item>
        </el-collapse> 
        <el-form-item >
          <el-button  type="primary" size="small" @click="submitAction" :disabled="isSubmit">提交</el-button>
          <el-button  size="small" @click="closePluginDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import {plug,openPlug,plugDetail,stopPlug,getAgentList,uploadFile} from '../../api/function/index'
import { getCookie, download } from '../../public'
import industryTypeList from '../../industry'
import {area,area2} from '../../area'
export default {
  name: 'rcsDetail',
  data() {
      let validateStartTime = (rule, value, callback) => {
        if(!value){
          callback(new Error("请选择生效日期"));
        }else{
          if(this.rcsPluginForm.expiryDate){
            this.$refs.rcsPluginForm.validateField('expiryDate');
          }
          callback();
        }
      };
      let validateEndTime = (rule, value, callback) => {
        if(!value){
          callback(new Error("请选择失效日期"));
        }else{
          if(!this.rcsPluginForm.effectiveDate){
            callback(new Error("请选择生效日期！"))
            if(this.rcsPluginForm.renewalDate){
                this.$refs.rcsPluginForm.validateField('renewalDate');
            }
          }else if(Date.parse(this.rcsPluginForm.effectiveDate) >= Date.parse(value)){
            callback(new Error("失效日期必须大于生效日期！"))
            if(this.rcsPluginForm.renewalDate && this.rcsPluginForm.renewalDate > Date.parse(value)){
                this.$refs.rcsPluginForm.validateField('renewalDate');
            }
          }else{
            if(this.rcsPluginForm.renewalDate){
              this.$refs.rcsPluginForm.validateField('renewalDate');
            }
            callback();
          }
        }
      };
      let validaterenewalTime = (rule, value, callback) => {
        if(!value){
          callback(new Error("请选择续约日期"));
        }else{
          if(!this.rcsPluginForm.expiryDate){
            callback(new Error("请选择失效日期！"))
          }else if(Date.parse(this.rcsPluginForm.expiryDate) >= Date.parse(value)){
            callback(new Error("续约日期必须大于失效日期！"))
          }else{
            callback();
          }
        }
      };
    return {
      src: require('../../assets/svg/icon_左侧_消息（线性）.svg'),
      title: 'RCS消息',
      content: '未开通',
      buttonText: '开通',
      drawerTitle:'开通rcs消息',
      openDisabled:false,
      disabled:false,
      isSubmit:false,
      type: 0,//0未开通，1开通中，2已开通
      id:null,
      data1: [{ id: 1, content: '认证企业用户' }],
      data2: [
        { id: 1, content: '1、原生消息公众号展示能力。' },
        { id: 2, content: '2、原生消息界面展示自定义菜单能力。' },
        {
          id: 3,
          content:
            ' 3、支持发送文本消息、多媒体消息、会话消息等富媒体消息能力。',
        },
      ],
      text: '按量计费，具体收费，请联系商务咨询。',
      rcsPluginForm:{
        customerName:null, //客户名称
        customerContact:null,//客户联系人 
        mobile:null,//联系人手机 
        email:null, //联系人邮箱
        belongArea:null,//归属区域 
        belongAgent:null,//归属代理商 
        industry:null, //行业类型
        fileAddress:null,//附件地址 
        fileName:null,//附件名字
        fileCode:null,//附件code
        remark:null,//备注
        contractCode:null,//合同编码 
        contractName:null,//合同名称 
        effectiveDate:null,//合同生效日期 
        expiryDate:null,//合同失效日期 
        isRenewal:1,//合同是否自动续约 
        renewalDate:null,//合同续约日期 
        contractFileAddress:null,//合同电子扫描件地址
        contractFileCode:null,//合同电子扫描件code
        contractFileName:null,//合同电子扫描件名字
        plugConfigId:null,//插件配置id
      },//rcs插件表单
      rcsPluginRules:{
        customerName:[{ required: true, message: "客户名称不能为空", trigger: "blur" }],
        customerContact:[{ required: true, message: "客户联系人不能为空", trigger: "blur" }],
        mobile:[{ required: true, message: "联系人手机不能为空", trigger: "blur" }],
        email:[{type:'email',  message: "邮箱格式不正确", trigger: "blur" }],
        belongArea:[{ required: true, message: "归属区域不能为空", trigger: "change" }],
        belongAgent:[{ required: true, message: "归属代理商不能为空", trigger: "change" }],
        // fileAddress:[{ required: true, message: "附件不能为空", trigger: "change" }],//RCS附件必填，SMS,MMS附件不是必填
        industry:[{ required: true, message: "行业类型不能为空", trigger: "change" }],
        contractCode:[{ required: true, message: "合同编码不能为空", trigger: "blur" }],
        contractName:[{ required: true, message: "合同名称不能为空", trigger: "blur" }],
        effectiveDate:[{ required: true, validator: validateStartTime, trigger: "change" }],
        expiryDate:[{ required: true, validator: validateEndTime, trigger: "change" }],
        isRenewal:[{ required: true, message: '合同是否自动续约不能为空', trigger: "change" }],
        renewalDate:[{ required: true, validator: validaterenewalTime, trigger: "change" }],
        contractFileAddress:[{ required: true, message: "合同电子扫描件不能为空", trigger: "change" }]
      },//rcs插件表单规则
      drawerActive:['baseInfo','contractInfo'],
      belongAreaList1:area,//全地区
      belongAreaList2:area2,//华南地区
      belongAgentList:[],
      industryList:industryTypeList,
      defaultParams: {
        label: "name",
        value: "code",
        children: "child",
        emitPath: true, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
      fileList:[],
      timer: null,
      pluginDrawer:false,
      enterpriseId: getCookie('enterpriseId'),                                                                                                                                          
    }
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
    //开通弹框
    handleClickOpen(){
        if(this.$route.query.checkStatus != 1){
            this.$message({
                message: '企业资质未认证',
                type: 'warning'
            });
            return
        }
        if(this.$route.query.type == 1 || this.$route.query.type == 2 || this.$route.query.type == 3){
            if(this.$route.query.type == 1){
                this.drawerTitle = '开通RCS消息'
            }else if(this.$route.query.type == 2){
                this.drawerTitle = '开通SMS短信'
            }else{
                this.drawerTitle = '开通MMS短信'
            }
            if(this.type == 0){
                this.pluginDrawer = true;
                this.getAgentData()
                plug({type:0}).then((res)=>{
                    var arr = []
                    this.rcsPluginForm.customerName = res.data.data.enterpriseDetail.customerName;
                    this.rcsPluginForm.customerContact = res.data.data.enterpriseDetail.customerContactPerson;
                    this.rcsPluginForm.mobile = res.data.data.enterpriseDetail.contactPersonPhone;
                    this.rcsPluginForm.email = res.data.data.enterpriseDetail.contactPersonEmail;
                    arr.push(res.data.data.enterpriseDetail.regionCode)
                    arr.push(res.data.data.enterpriseDetail.provinceCode)
                    arr.push(res.data.data.enterpriseDetail.cityCode)
                    this.rcsPluginForm.belongArea = arr;
                    this.rcsPluginForm.industry = Number(res.data.data.enterpriseDetail.industryType);
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.pluginDrawer = false;
            }
        }else{ 
            plugDetail({type:1}).then(res=>{
                if(res.data.status == 0){
                    if(res.data.data.status == 2){
                        openPlug({type:this.$route.query.type}).then(res=>{
                        if(res.data.status == 0){
                            this.$message.success({
                            message:'提交成功！',
                            center:true
                            })
                            this.getPlugDetail()
                        }else{
                            this.$message({
                            message:res.data.message,
                            center:true,
                            type:res.data.status === 2 ? 'warning':'error'
                            })
                        }
                        }).catch(err=>{
                        this.$message.error({
                            message:err,
                            center:true
                        })
                        })
                    }else{
                        this.$message({
                            message: '请先开通RCS消息功能',
                            type: 'warning'
                        });
                    }
                }
            }).catch(err=>{
                console.log(err) 
            })            
            this.pluginDrawer = false;
        }
    },
    // 获取代理商列表
    getAgentData(){
      getAgentList().then(res=>{
        if(res.data.status == 0){
            // var obj = {};
          this.belongAgentList = res.data.data
        //   obj.belongAgentCode = res.data.data[0].belongAgentCode;
        //   obj.belongAgentName = res.data.data[0].belongAgentName;
        //   obj.serviceCode = res.data.data[0].serviceCode;
        //   this.rcsPluginForm.belongAgent = obj;
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.data.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 消息提交
    submitAction(){ 
      this.$refs.rcsPluginForm.validate(valid=>{
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.isSubmit = true;
          let _this = this
          this.timer = setTimeout(function () {
            let params ={                                           
              belongAgentCode: _this.rcsPluginForm.belongAgent.belongAgentCode,
              belongAgentName: _this.rcsPluginForm.belongAgent.belongAgentName,
              cityCode: _this.rcsPluginForm.belongArea[2],
              contactFileCode: _this.rcsPluginForm.contractFileCode,
              contactFileName: _this.rcsPluginForm.contractFileName,
              contractFileUrl: _this.rcsPluginForm.contractFileAddress,
              contactPersonEmail: _this.rcsPluginForm.email,
              contactPersonPhone: _this.rcsPluginForm.mobile,
              contractCode: _this.rcsPluginForm.contractCode,
              contractInvalidDate: _this.rcsPluginForm.expiryDate,
              contractName: _this.rcsPluginForm.contractName,
              contractRenewDate: _this.rcsPluginForm.renewalDate,
              contractValidDate: _this.rcsPluginForm.effectiveDate,
              customerContactPerson: _this.rcsPluginForm.customerContact,
              customerFileCode: _this.rcsPluginForm.fileCode,
              customerFileName: _this.rcsPluginForm.fileName,
              customerFileUrl: _this.rcsPluginForm.fileAddress ,
              customerName: _this.rcsPluginForm.customerName,
              enterpriseId: _this.rcsPluginForm.customerName.id,
              industryTypeCode: _this.rcsPluginForm.industry,
              isRenewed: _this.rcsPluginForm.isRenewal,
              provinceCode: _this.rcsPluginForm.belongArea[1],
              regionCode: _this.rcsPluginForm.belongArea[0],
              remarkText: _this.rcsPluginForm.remark,
              type:_this.$route.query.type,
            }
            openPlug(params).then(res=>{
              if(res.data.status == 0){
                _this.$message.success({
                  message:'提交成功！',
                  center:true
                })
                _this.isSubmit = false;
                _this.getPlugDetail()
                _this.closePluginDrawer()
              }else{
                _this.isSubmit = false;
                _this.$message({
                  message:res.data.message,
                  center:true,
                  type:res.data.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.$message.error({
                message:err,
                center:true
              })
            })
          }, 500);
        }
      })
    },
    // 关闭抽屉前清除表单规则
    closePluginDrawer(){
      this.$nextTick(()=>{
        this.$refs.rcsPluginForm.resetFields();
        this.pluginDrawer = false
      })
    },
    // 上传附件
    uploadPictures(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.data.status == 0) {
          this.rcsPluginForm.fileAddress = res.data.data.url,//附件地址 
          this.rcsPluginForm.fileName = res.data.data.fileName,//附件名字
          this.rcsPluginForm.fileCode = res.data.data.code,//附件code
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          if (this.$route.query.type == 1){
              this.$refs.rcsPluginForm.validateField('fileAddress')
          }
        } else {
          this.rcsPluginForm.fileAddress = null,//附件地址 
          this.rcsPluginForm.fileName = null,//附件名字
          this.rcsPluginForm.fileCode = null,//附件code
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true,
          })
        }
      })
    },
    // 上传附件
    beforeAvatarUpload(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'pdf' || fileTYpe === 'doc' || fileTYpe === 'docx' || fileTYpe === 'xls' || fileTYpe === 'xlsx' || fileTYpe === 'ppt'  || fileTYpe === 'pptx' || fileTYpe === 'jpg'|| fileTYpe === 'jpeg'|| fileTYpe === 'gif' || fileTYpe === 'rar' || fileTYpe === '7z' || fileTYpe === 'zip')
      const isLt2M = file.size / 1024  < 100;
      if (!isJPG) {
        this.$message.error({
          message:'附件类型应为pdf、doc、docx、xls、xlsx、ppt、pptx、jpg、jpeg、gif、rar、7z、zip',
          center:true
        });
         return isJPG && isLt2M;
      }
      if (!isLt2M) {
        this.$message.error({
          message:'附件大小不能超过100K!',
          center:true
        });
         return isJPG && isLt2M;
      }
     
    },
    // 限制上传附件的数量
    handleExceed(files, fileList){
      this.$message.error({
        message:'只能上传一个文件',
        center:true
      });
    },
    // 上传合同扫描件
    uploadPictures2(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.data.status == 0) {
          this.rcsPluginForm.contractFileAddress = res.data.data.url,//合同电子扫描件地址
          this.rcsPluginForm.contractFileCode = res.data.data.code,//合同电子扫描件code
          this.rcsPluginForm.contractFileName = res.data.data.fileName//合同电子扫描件名字
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          this.$refs.rcsPluginForm.validateField('contractFileAddress')
        } else {
          this.rcsPluginForm.contractFileAddress = null,//附件地址 
          this.rcsPluginForm.contractFileCode = null,//附件名字
          this.rcsPluginForm.contractFileName = null,//附件code
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true,
          })
        }
      })
    },
    // 上传附件
    beforeAvatarUpload2(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'pdf' || fileTYpe === 'doc'|| fileTYpe === 'jpg'|| fileTYpe === 'jpeg'|| fileTYpe === 'gif'|| fileTYpe === 'docx'|| fileTYpe === 'rar')
      const isLt2M = file.size / 1024 /1024 < 5;
      if (!isJPG) {
        this.$message.error({
          message:'附件类型应为pdf、doc、jpg、jpeg、gif、docx、rar',
          center:true
        });
         return isJPG && isLt2M;
      }
      if (!isLt2M) {
        this.$message.error({
          message:'文件不能超过10M!',
          center:true
        });
         return isJPG && isLt2M;             
      }
     
    },
    // 移除附件
    handleRemove(){
      this.rcsPluginForm.fileAddress = null,//附件地址 
      this.rcsPluginForm.fileName = null,//附件名字
      this.rcsPluginForm.fileCode = null//附件code
      if (this.$route.query.type == 1){
        this.rcsPluginRules.fileAddress = [{ required: true, message: '附件不能为空', trigger: 'change'}]
      }
    },
    // 移除合同扫描件
    handleRemove2(file, fileList){
      this.rcsPluginForm.contractFileAddress = null,//合同电子扫描件地址
      this.rcsPluginForm.contractFileCode = null,//合同电子扫描件code
      this.rcsPluginForm.contractFileName = null//合同电子扫描件名字
      this.rcsPluginRules.contractFileAddress = [{ required: true, message: '合同电子扫描件不能为空', trigger: 'change'}]
    },
    // 关闭归属区域级联选择器
    closeDepartment(val){
      this.$refs.cascaderHandle.dropDownVisible = false
    },
    handleInit() {  
      if (this.$route.query.type == 1) {
        this.title = 'RCS消息'
        this.data1 = [{ id: 1, content: '认证企业用户。' }]
        this.data2 = [
          { id: 1, content: '1、原生消息公众号展示能力。' },
          { id: 2, content: '2、原生消息界面展示自定义菜单能力。' },
          {
            id: 3,
            content:
              ' 3、支持发送文本消息、多媒体消息、会话消息等富媒体消息能力。',
          },
        ]
        this.rcsPluginRules.fileAddress = [{ required: true, message: '附件不能为空', trigger: 'change'}]
        this.text = '按量计费，具体收费，请联系商务咨询。'
        this.buttonText = '开通'
        this.openDisabled = false;
        this.src = require('../../assets/svg/icon_左侧_消息（线性）.svg');
      } else if (this.$route.query.type == 2) {
        this.title = 'SMS短信'
        this.data1 = [{ id: 1, content: '认证企业用户。' }]
        this.data2 = [
          { id: 1, content: '支持发送文本消息能力，强触达，低延迟，5s必达。' },
        ]
        this.text = '按量计费，标准价0.05元/次。'
        this.buttonText = '开通'
        this.openDisabled = false;
        this.src = require('../../assets/svg/icon_46px_sms短信.svg');
      } else if (this.$route.query.type == 3) {
        this.title = 'MMS短信'
        this.data1 = [{ id: 1, content: '认证企业用户。' }]
        this.data2 = [
          {
            id: 1,
            content:
              '支持发送图片+文本或视频+文本的富媒体消息能力，消息内容丰富，强触达。',
          },
        ]
        this.text = '按量计费，标准价0.15元/次。'
        this.buttonText = '开通'
        this.openDisabled = false;
        this.src = require('../../assets/svg/icon_46px_mms短信.svg');
      } else if (this.$route.query.type == 4) {
        this.title = '自动回复'
        this.data1 = [
          { id: 1, content: '1、认证企业用户。' },
          { id: 2, content: '2、已成功开通RCS消息功能插件。' },
        ]
        this.data2 = [
          {
            id: 1,
            content: '可以针对用户的行为来设置特定的回复内容和关键词回复规则。',
          },
        ]
        this.text = '免费。'
        this.buttonText = '开通'
        this.openDisabled = false;
        this.src = require('../../assets/svg/icon_46px_自动回复.svg');
      } else if (this.$route.query.type == 5) {
        this.title = '自定义菜单'
        this.data1 = [
          { id: 1, content: '1、认证企业用户。' },
          { id: 2, content: '2、已成功开通RCS消息功能插件。'},
        ]
        this.data2 = [
          {
            id: 1,
            content:
              '可以在消息会话界面底部设置自定义菜单，并可为其设置响应动作。',
          },
        ]
        this.text = '免费。'
        this.buttonText = '开通'
        this.openDisabled = false;
        this.src = require('../../assets/svg/icon_46px_自定义菜单.svg');
      } else if (this.$route.query.type == 6) {
        this.title = '聊天机器人'
        this.data1 = [
          { id: 1, content: '1、认证企业用户。' },
          { id: 2, content: '2、已成功开通RCS消息功能插件。' },
        ]
        this.data2 = [
          { id: 1, content: '开通后可以使用AI机器人与用户进行消息互动。' },
        ]
        this.text = '具体收费，请联系商务咨询。'
        this.buttonText = '待上线'
        this.openDisabled = true;
        this.src = require('../../assets/svg/icon_46px_聊天机器人.svg');
      } else if (this.$route.query.type == 7) {
        this.title = '号码归属查询'
        this.data1 = [{ id: 1, content: '认证企业用户。' }]
        this.data2 = [{ id: 1, content: '号码归属查询根据用量次数进行计费。' }]
        this.text = '按量计费，即按查询成功次数计费，标准价0.01元/次。'
        this.buttonText = '待上线'
        this.openDisabled = true;
        this.src = require('../../assets/svg/icon_46px_号码归属查询.svg');
      }
    },
    //插件状态
    getPlugDetail(){
        plugDetail({type:this.$route.query.type}).then(res=>{
            console.log(res.data)
            this.type = res.data.data.status;
            this.id = res.data.data.plugConfigId;
            if (this.type == 0) {
                this.content = '未开通'
            } else if (this.type == 1) {
                this.content = '未开通'
            } else {
                this.content = '已开通，可以正常使用'
            }
        }).catch(err=>{
            console.log(err) 
        })
    },
    //停用插件
    handleClickStop(){
        this.$confirm('是否确定停用此插件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
            stopPlug({id:this.id}).then(res=>{
                console.log(res.data)
                if(res.data.status == 0){
                    this.getPlugDetail()
                    this.$message({
                        type: 'success',
                        message: '停用成功!'
                    });
                }
            }).catch(err=>{
                console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          }); 
        });
    }
  },
  mounted() {
    this.handleInit()
    this.getPlugDetail()
  },
}
</script>
 <style lang="less" scoped>
.header {
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
  .content {
    height: 50px;
    font-size: 18px;
    color: #666666;
    .el-divider {
      background-color: #368cfe;
    }
    .el-divider--vertical {
      width: 3px;
      margin-left: 0;
    }
    .el-button {
      float: right;
    }
  }
  .banner {
    width: 100%;
    height: 134px;
    background-color: #f8f8fb;
    display: flex;
    border: 1px solid #e5e5e5;
    margin-bottom: 20px;
    padding: 27px 70px;
    box-sizing: border-box;
    .liLeft {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #739ed8;
    }
    .liCenter {
      width: calc(100% - 176px);
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 10px 0px 10px 20px;
      .liCenterTop {
        font-size: 18px;
        color: #333333;
      }
      .liCenterBottom {
        font-size: 14px;
        color: #666666;
        text-align: acutr;
      }
    }
    .liRight {
      display: flex;
      justify-content: center;
      align-items: center;
    //   .el-button--primary {
    //     background-color: #368cfe;
    //     border-color: #368cfe;
    //   }
      .button2{
          background-color: #FE3636;
          border-color: #FE3636;
      }
    }
  }
  .nav {
    margin-bottom: 20px;
    .navTitle {
      font-size: 20px;
      line-height: 32px;
    }
    .navText {
      font-size: 14px;
      color: #666666;
      line-height: 32px;
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
  .drawerTitle{
      height: 40px;
  }
  .formitem{
      /deep/ .el-input{
          width: 100% !important;
      }
      /deep/ .el-cascader {
            width: 100% !important;
        }
        .el-select{
            width: 100%;
        }
  }
  /deep/ .el-drawer__wrapper .el-drawer__body {
        padding: 0 40px 0 40px;
    }
     /deep/ .el-collapse{
        border: 0;
    }
    /deep/ .el-collapse-item__wrap{
        border: 0;
    }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100%;
      }
  .demo-drawer__footer{
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
  }
  /deep/ .el-textarea .el-input__count{
      background: none;
      bottom: -18px;
  }
  /deep/ .el-input .el-input__count .el-input__count-inner{
      margin-top: 30px;
  }
}
</style>