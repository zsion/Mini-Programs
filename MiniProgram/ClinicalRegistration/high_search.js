// ClinicalRegistration//high_search.js
var app = getApp();
const util = require('../util/util.js');

const GetDrugNameTip = require('../config').ClinicalRegistration.GetDrugNameTip
const GetApplicantNameTip = require('../config').ClinicalRegistration.GetApplicantNameTip
const GetSelectInfo = require('../config').CommCategory.GetSelectInfo
const ClinicalRegistration_GetSelectInfo = require('../config').ClinicalRegistration.GetSelectInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    address_DrugName: GetDrugNameTip,//组件-枚举字典字典
    address_ApplicantName: GetApplicantNameTip,//组件-枚举字典字典
    address: GetSelectInfo,//组件-治疗类别-配置数据请求地址
    dbtype: 3,//组件-数据库类型
    ATC: { ATC1: "", ATC2: "", ATC3: "", ATC4: "" },
    PHIIC: { zldl: "", zlxl: "" },
    DrugName: "",//药品名称
    ApplicantName: "",//申办者名称
    Dosage: "",//剂型
    Indications: "",//适应症
    picker_address: ClinicalRegistration_GetSelectInfo,//自定义picker组件地址(只有type不同，地址都一样,type对应接口文档)
    addwidth: true,//控制组件左边label的宽度
    DrugTypeId: "",//试验药类别
    DrugHighestPhase: "",//试验药最高研发阶段
    TestState: "",//试验状态
    TestStaging: "",//试验分期
    IsBeTestRecord: "",//BE试验备案
    TestType: "",//试验分类
    TestRange: "",//试验范围
    FundsSource: "",//经费来源
    DateTestPublictiy_Start: "",//公示时间开始
    DateTestPublictiy_End: "",//公示时间结束
    DateFirstCaseEnrollment_Start: "", //首例入组时间开始
    DateFirstCaseEnrollment_End: "", //首例入组时间结束
    DateTestEnd_Start: "",//试验结束时间开始
    DateTestEnd_End: "",//试验结束时间结束

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.nameTip_DrugName = this.selectComponent('#nameTip_DrugName');
    this.nameTip_ApplicantName = this.selectComponent('#nameTip_ApplicantName');
    this.area_Picker = this.selectComponent('#area_picker');
    this.CustomPicker_DrugTypeId = this.selectComponent('#CustomPicker_DrugTypeId');
    this.CustomPicker_DrugHighestPhase = this.selectComponent('#CustomPicker_DrugHighestPhase');
    this.CustomPicker_TestState = this.selectComponent('#CustomPicker_TestState');
    this.CustomPicker_TestStaging = this.selectComponent('#CustomPicker_TestStaging');
    this.CustomPicker_IsBeTestRecord = this.selectComponent('#CustomPicker_IsBeTestRecord');
    this.CustomPicker_TestType = this.selectComponent('#CustomPicker_TestType');
    this.CustomPicker_TestRange = this.selectComponent('#CustomPicker_TestRange');
    this.CustomPicker_FundsSource = this.selectComponent('#CustomPicker_FundsSource');
    this.DateTestPublictiy = this.selectComponent('#DateTestPublictiy');
    this.DateFirstCaseEnrollment = this.selectComponent('#DateFirstCaseEnrollment');
    this.DateTestEnd = this.selectComponent('#DateTestEnd');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').ListedDrugs
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: app.globalData.ShareApp_title,
      path: app.globalData.ShareApp_path,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  //输入药品名称
  input_DrugName: function (e) {
    this.setData({
      DrugName: e.detail.value
    })
    this.nameTip_DrugName.show_NameTip();//唤起枚举字典
  },
  //获得枚举字典组件返回值
  Get_DrugName: function (e) {
    this.setData({
      DrugName: e.detail
    })
  },

  //输入申办者名称
  input_ApplicantName: function (e) {
    this.setData({
      ApplicantName: e.detail.value
    })
    this.nameTip_ApplicantName.show_NameTip();//唤起枚举字典
  },
  //获得枚举字典组件返回值
  Get_ApplicantName: function (e) {
    this.setData({
      ApplicantName: e.detail
    })
  },

  //获得治疗类别组件返回值
  Get_ATC: function (e) {
    this.setData({
      ATC: e.detail
    })
    //console.log(this.data.ATC)
  },
  //获得治疗类别组件返回值
  Get_PHIIC: function (e) {
    this.setData({
      PHIIC: e.detail
    })
    //console.log(this.data.PHIIC)
  },

  //输入剂型
  input_Dosage: function (e) {
    this.setData({
      Dosage: e.detail.value
    })
  },

  //输入适应症
  input_Indications: function (e) {
    this.setData({
      Indications: e.detail.value
    })
  },

  //获取试验药类别-组件返回值
  Get_DrugTypeId: function (e) {
    this.setData({
      DrugTypeId: e.detail
    })
  },

  //获取试验药最高研发阶段-组件返回值
  Get_DrugHighestPhase: function (e) {
    this.setData({
      DrugHighestPhase: e.detail
    })
  },

  //获取试验状态-组件返回值
  Get_TestState: function (e) {
    this.setData({
      TestState: e.detail
    })
  },

  //获取试验分期-组件返回值
  Get_TestStaging: function (e) {
    this.setData({
      TestStaging: e.detail
    })
  },

  //获取BE试验备案-组件返回值
  Get_IsBeTestRecord: function (e) {
    this.setData({
      IsBeTestRecord: e.detail
    })
  },

  //获取试验分类-组件返回值
  Get_TestType: function (e) {
    this.setData({
      TestType: e.detail
    })
  },

  //获取试验范围-组件返回值
  Get_TestRange: function (e) {
    this.setData({
      TestRange: e.detail
    })
  },

  //获取经费来源-组件返回值
  Get_FundsSource: function (e) {
    this.setData({
      FundsSource: e.detail
    })
  },

  //公示时间开始
  Get_DateTestPublictiy_Start: function (e) {
    this.setData({
      DateTestPublictiy_Start: e.detail
    })
  },

  //公示时间结束
  Get_DateTestPublictiy_End: function (e) {
    this.setData({
      DateTestPublictiy_End: e.detail
    })
  },

  //首例入组时间开始
  Get_DateFirstCaseEnrollment_Start: function (e) {
    this.setData({
      DateFirstCaseEnrollment_Start: e.detail
    })
  },

  //首例入组时间结束
  Get_DateFirstCaseEnrollment_End: function (e) {
    this.setData({
      DateFirstCaseEnrollment_End: e.detail
    })
  },

  //试验结束时间开始
  Get_DateTestEnd_Start: function (e) {
    this.setData({
      DateTestEnd_Start: e.detail
    })
  },

  //试验结束时间结束
  Get_DateTestEnd_End: function (e) {
    this.setData({
      DateTestEnd_End: e.detail
    })
  },

  Reset_all: function (e) {
    this.area_Picker.ATC_reset();
    this.area_Picker.PHIIC_reset();
    this.CustomPicker_DrugTypeId.custompicker_reset();
    this.CustomPicker_DrugHighestPhase.custompicker_reset();
    this.CustomPicker_TestState.custompicker_reset();
    this.CustomPicker_TestStaging.custompicker_reset();
    this.CustomPicker_IsBeTestRecord.custompicker_reset();
    this.CustomPicker_TestType.custompicker_reset();
    this.CustomPicker_TestRange.custompicker_reset();
    this.CustomPicker_FundsSource.custompicker_reset();
    this.DateTestPublictiy.datepicker_reset();
    this.DateFirstCaseEnrollment.datepicker_reset();
    this.DateTestEnd.datepicker_reset();
    this.setData({
      DrugName: "",//药品名称
      Dosage: "",//剂型
      Indications: "",//适应症
      ApplicantName: "",//申办者名称
    });
  },

  Next_navigator: function (e) {
    if (this.data.DrugName.trim() == "" && this.data.Dosage.trim() == "" && this.data.Indications.trim() == "" && this.data.DrugTypeId == "" && this.data.DrugHighestPhase == "" && this.data.ApplicantName.trim() == "" && this.data.TestState == "" && this.data.TestStaging == "" && this.data.IsBeTestRecord == "" && this.data.TestType == "" && this.data.TestRange == "" && this.data.FundsSource == "" && this.data.DateTestPublictiy_Start == "" && this.data.DateTestPublictiy_End == "" && this.data.DateFirstCaseEnrollment_Start == "" && this.data.DateFirstCaseEnrollment_End == "" && this.data.DateTestEnd_Start == "" && this.data.DateTestEnd_End == "" && this.data.ATC.ATC1 == "" && this.data.ATC.ATC2 == "" && this.data.ATC.ATC3 == "" && this.data.ATC.ATC4 == "" && this.data.PHIIC.zldl == "" && this.data.PHIIC.zlxl == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ClinicalRegistration/list?DrugName=${encodeURIComponent(this.data.DrugName)}&Dosage=${encodeURIComponent(this.data.Dosage)}&Indications=${encodeURIComponent(this.data.Indications)}&DrugTypeId=${encodeURIComponent(this.data.DrugTypeId)}&DrugHighestPhase=${encodeURIComponent(this.data.DrugHighestPhase)}&ApplicantName=${encodeURIComponent(this.data.ApplicantName)}&TestState=${encodeURIComponent(this.data.TestState)}&TestStaging=${encodeURIComponent(this.data.TestStaging)}&IsBeTestRecord=${encodeURIComponent(this.data.IsBeTestRecord)}&TestType=${encodeURIComponent(this.data.TestType)}&TestRange=${encodeURIComponent(this.data.TestRange)}&FundsSource=${encodeURIComponent(this.data.FundsSource)}&DateTestPublictiy_Start=${this.data.DateTestPublictiy_Start}&DateTestPublictiy_End=${this.data.DateTestPublictiy_End}&DateFirstCaseEnrollment_Start=${this.data.DateFirstCaseEnrollment_Start}&DateFirstCaseEnrollment_End=${this.data.DateFirstCaseEnrollment_End}&DateTestEnd_Start=${this.data.DateTestEnd_Start}&DateTestEnd_End=${this.data.DateTestEnd_End}&ATCCategoryId01=${encodeURIComponent(this.data.ATC.ATC1)}&ATCCategoryId02=${encodeURIComponent(this.data.ATC.ATC2)}&ATCCategoryId03=${encodeURIComponent(this.data.ATC.ATC3)}&ATCCategoryId04=${encodeURIComponent(this.data.ATC.ATC4)}&CategoryId=${encodeURIComponent(this.data.PHIIC.zldl)}&SubCategoryId=${encodeURIComponent(this.data.PHIIC.zlxl)}`
      })
    }
  },

  Close_NameTip: function (e) {
    if (this.nameTip_DrugName.data.prompt_hidden == false) {
      this.nameTip_DrugName.blur_NameTip();
    }
    if (this.nameTip_ApplicantName.data.prompt_hidden == false) {
      this.nameTip_ApplicantName.blur_NameTip();
    }
  },

})