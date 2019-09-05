// ListedDrugs/high_search.js
var app = getApp();
const util = require('../util/util.js');

const GetDrugNameTip = require('../config').ListedDrugs.GetDrugNameTip
const ListedDrugs_GetSelectInfo = require('../config').ListedDrugs.GetSelectInfo
const GetSelectInfo = require('../config').CommCategory.GetSelectInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    content_height: wx.getSystemInfoSync().windowHeight,
    address: GetSelectInfo,//组件-配置数据请求地址
    dbtype: 2,//组件-数据库类型
    address2: GetDrugNameTip,//枚举字典组件地址
    items: [],
    array: [],
    index: 0,
    CollectionCategory: "",
    Unchecked: false,
    ReferencePreparation:"",
    StandardPreparation:"",
    SalesStatus:"",
    ApprovalDate_Start: "",
    ApprovalDate_End: "",
    ManufactureCompanyName: "",
    ApprovalNo: "",
    ApprovalHolderCompanyName: "",
    Dosage: "",
    DrugName: "",
    ATC: { ATC1: "", ATC2: "", ATC3: "", ATC4: "" },
    PHIIC: { zldl: "", zlxl: "" },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 取得下拉框选项
    var param1 = {};
    param1.url = ListedDrugs_GetSelectInfo;
    var paramData1 = {};
    paramData1.type = 0;
    paramData1.pkey = "";
    param1.data = paramData1;
    param1.success = this.success_ListedDrugs_GetSelectInfo;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
    // 取得下拉框选项
    var param2 = {};
    param2.url = ListedDrugs_GetSelectInfo;
    var paramData2 = {};
    paramData2.type = 1;
    paramData2.pkey = "";
    param2.data = paramData2;
    param2.success = this.success_SalesStatus;
    param2.method = "GET";
    param2.param = {};
    util.NetRequest(param2);
  },

  success_ListedDrugs_GetSelectInfo: function (result, param) {
    //console.log(result.Data[0].items)
    this.setData({
      items: result.Data[0].items
    })
  },

  success_SalesStatus: function (result, param) {
    result.Data[0].items.unshift({ pkey: null, item_val: "", item_title: "不限", total: 0 })
    this.setData({
      array: result.Data[0].items
    })
    //console.log(this.data.array)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.area_Picker = this.selectComponent('#area_picker');
    this.nameTip = this.selectComponent('#NameTip');
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
  onShareAppMessage: function (res) {
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
  to_PDB:function(){
    wx.navigateToMiniProgram({
      appId: app.globalData.PDB_ID,
      path: '',
      extraData: {
        
      },
      envVersion: 'release',
      success(res) {
        console.log("跳转成功")
      },
      fail(res) {
        
      }
    })
  },

  input_ManufactureCompanyName:function(e){
    this.setData({
      ManufactureCompanyName: e.detail.value
    })
  },

  input_ApprovalNo:function(e){
    this.setData({
      ApprovalNo: e.detail.value
    })
  },

  input_ApprovalHolderCompanyName:function(e){
    this.setData({
      ApprovalHolderCompanyName: e.detail.value
    })
  },

  input_Dosage: function(e) {
    this.setData({
      Dosage: e.detail.value
    })
  },
  
  input_DrugName: function(e) {
    this.setData({
      DrugName: e.detail.value
    })
    this.nameTip.show_NameTip();
  },

  Get_DrugName: function (e) {
    this.setData({
      DrugName: e.detail
    })
  },

  checkboxChange(e) {
    //console.log(e.detail.value.join())
    this.setData({
      CollectionCategory: e.detail.value.join()
    })
  },

  bind_ReferencePreparation:function(e){
    this.setData({
      ReferencePreparation: e.detail.value == false ? "" : 1
    })
    //console.log(this.data.ReferencePreparation)
  },

  bind_StandardPreparation: function (e) {
    this.setData({
      StandardPreparation: e.detail.value == false ? "" : 1
    })
    //console.log(this.data.StandardPreparation)
  },

  bind_SalesStatus:function(e){
    this.setData({
      index: e.detail.value,
      SalesStatus: this.data.array[e.detail.value].item_val
    })
    //console.log(this.data.SalesStatus)
  },

  DateChange_Start: function (e) {
    //console.log(e.detail.value)
    this.setData({
      ApprovalDate_Start: e.detail.value
    })
  },

  DateChange_End: function (e) {
    //console.log(e.detail.value)
    this.setData({
      ApprovalDate_End: e.detail.value
    })
  },


  Get_ATC: function (e) {
    this.setData({
      ATC: e.detail
    })
    //console.log(this.data.ATC)
  },

  Get_PHIIC: function (e) {
    this.setData({
      PHIIC: e.detail
    })
    //console.log(this.data.PHIIC)
  },

  Reset_all: function (e) {
    this.area_Picker.ATC_reset();
    this.area_Picker.PHIIC_reset();
    this.setData({
      ApprovalDate_Start: "",
      ApprovalDate_End: "",
      ManufactureCompanyName: "",
      ApprovalNo: "",
      ApprovalHolderCompanyName: "",
      Dosage: "",
      DrugName: "",
      CollectionCategory: "",
      ReferencePreparation: "",
      StandardPreparation: "",
      SalesStatus: "",
      index: 0,
      Unchecked: false,
    })

  },

  Next_navigator: function (e) {
    if (this.data.DrugName.trim() == "" && this.data.Dosage.trim() == "" && this.data.ApprovalHolderCompanyName.trim() == "" && this.data.ApprovalNo.trim() == "" && this.data.ManufactureCompanyName.trim() == "" && this.data.CollectionCategory == "" && this.data.ReferencePreparation == "" && this.data.StandardPreparation == "" && this.data.SalesStatus == "" && this.data.ApprovalDate_End == "" && this.data.ApprovalDate_Start == "" && this.data.ATC.ATC1 == "" && this.data.ATC.ATC2 == "" && this.data.ATC.ATC3 == "" && this.data.ATC.ATC4 == "" && this.data.PHIIC.zldl == "" && this.data.PHIIC.zlxl == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ListedDrugs/list?CollectionCategory=${encodeURIComponent(this.data.CollectionCategory)}&ApprovalDate_End=${this.data.ApprovalDate_End}&ApprovalDate_Start=${this.data.ApprovalDate_Start}&ManufactureCompanyName=${encodeURIComponent(this.data.ManufactureCompanyName)}&ApprovalNo=${encodeURIComponent(this.data.ApprovalNo)}&ApprovalHolderCompanyName=${encodeURIComponent(this.data.ApprovalHolderCompanyName)}&Dosage=${encodeURIComponent(this.data.Dosage)}&DrugName=${encodeURIComponent(this.data.DrugName)}&ReferencePreparation=${this.data.ReferencePreparation}&StandardPreparation=${this.data.StandardPreparation}&SalesStatus=${encodeURIComponent(this.data.SalesStatus)}&ATCCategoryId01=${encodeURIComponent(this.data.ATC.ATC1)}&ATCCategoryId02=${encodeURIComponent(this.data.ATC.ATC2)}&ATCCategoryId03=${encodeURIComponent(this.data.ATC.ATC3)}&ATCCategoryId04=${encodeURIComponent(this.data.ATC.ATC4)}&CategoryId=${encodeURIComponent(this.data.PHIIC.zldl)}&SubCategoryId=${encodeURIComponent(this.data.PHIIC.zlxl)}`
      })
    }
  },

  Close_NameTip: function (e) {
    if (this.nameTip.data.prompt_hidden == false) {
      this.nameTip.blur_NameTip();
    }
  },

})