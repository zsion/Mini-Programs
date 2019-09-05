// ChineseReferencePreparation//high_search.js
var app = getApp();
const util = require('../util/util.js');

const GetDrugNameTip = require('../config').ChineseReferencePreparation.GetDrugNameTip
const GetSelectInfo = require('../config').CommCategory.GetSelectInfo
const ChineseReferencePreparation_GetSelectInfo = require('../config').ChineseReferencePreparation.GetSelectInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    address_DrugName: GetDrugNameTip,//组件-枚举字典字典
    picker_address: ChineseReferencePreparation_GetSelectInfo,//自定义picker组件地址(只有type不同，地址都一样,type对应接口文档)
    address: GetSelectInfo,//组件-治疗类别-配置数据请求地址
    dbtype: 4,//组件-数据库类型
    ATC: { ATC1: "", ATC2: "", ATC3: "", ATC4: "" },
    PHIIC: { zldl: "", zlxl: "" },
    DrugName: "",//药品名称
    Dosage: "",//剂型
    CertificateHolder: "",//持证商名称
    PreparationSourceId: "",//参比制剂来源
    ReleaseTime_Start: "",//发布时间开始
    ReleaseTime_End: "",//发布时间结束
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
    this.CustomPicker_PreparationSourceId = this.selectComponent('#CustomPicker_PreparationSourceId');
    this.area_Picker = this.selectComponent('#area_picker');
    this.ReleaseTime = this.selectComponent('#ReleaseTime');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').ChineseReferencePreparation
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
  //输入持证商名称
  input_CertificateHolder: function (e) {
    this.setData({
      CertificateHolder: e.detail.value
    })
  },
  //获取参比制剂来源-组件返回值
  Get_PreparationSourceId: function (e) {
    this.setData({
      PreparationSourceId: e.detail
    })
  },
  //发布时间开始
  Get_ReleaseTime_Start: function (e) {
    this.setData({
      ReleaseTime_Start: e.detail
    })
  },
  //发布时间结束
  Get_ReleaseTime_End: function (e) {
    this.setData({
      ReleaseTime_End: e.detail
    })
  },
  Reset_all: function (e) {
    this.area_Picker.ATC_reset();
    this.area_Picker.PHIIC_reset();
    this.CustomPicker_PreparationSourceId.custompicker_reset();
    this.ReleaseTime.datepicker_reset();
    this.setData({
      DrugName: "",//药品名称
      Dosage: "",//剂型
      CertificateHolder: "",//持证商名称
    });
  },

  Next_navigator: function (e) {
    if (this.data.DrugName.trim() == "" && this.data.Dosage.trim() == "" && this.data.CertificateHolder.trim() == "" && this.data.PreparationSourceId == "" && this.data.ReleaseTime_Start == "" && this.data.ReleaseTime_End == "" && this.data.ATC.ATC1 == "" && this.data.ATC.ATC2 == "" && this.data.ATC.ATC3 == "" && this.data.ATC.ATC4 == "" && this.data.PHIIC.zldl == "" && this.data.PHIIC.zlxl == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ChineseReferencePreparation/list?DrugName=${encodeURIComponent(this.data.DrugName)}&Dosage=${encodeURIComponent(this.data.Dosage)}&CertificateHolder=${encodeURIComponent(this.data.CertificateHolder)}&PreparationSourceId=${this.data.PreparationSourceId}&ReleaseTime_Start=${this.data.ReleaseTime_Start}&ReleaseTime_End=${this.data.ReleaseTime_End}&ATCCategoryId01=${encodeURIComponent(this.data.ATC.ATC1)}&ATCCategoryId02=${encodeURIComponent(this.data.ATC.ATC2)}&ATCCategoryId03=${encodeURIComponent(this.data.ATC.ATC3)}&ATCCategoryId04=${encodeURIComponent(this.data.ATC.ATC4)}&CategoryId=${encodeURIComponent(this.data.PHIIC.zldl)}&SubCategoryId=${encodeURIComponent(this.data.PHIIC.zlxl)}`
      })
    }
  },

  Close_NameTip: function (e) {
    if (this.nameTip_DrugName.data.prompt_hidden == false) {
      this.nameTip_DrugName.blur_NameTip();//关闭药品名称枚举字典
    }
  },

})