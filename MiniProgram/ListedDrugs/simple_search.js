// ListedDrugs/simple_search.js
var app = getApp();
const util = require('../util/util.js');

const GetGenericNameTip = require('../config').ListedDrugs.GetGenericNameTip
const GetSelectInfo = require('../config').ListedDrugs.GetSelectInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: GetGenericNameTip,
    content_height: wx.getSystemInfoSync().windowHeight,
    GenericName: "",
    ApprovalHolderCompanyName_ManufactureCompanyName: "",
    items: [],
    CollectionCategory: "",
    Unchecked: false,
    ApprovalDate_Start: "",
    ApprovalDate_End: "",
    Power: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 取得下拉框选项
    var param1 = {};
    param1.url = GetSelectInfo;
    var paramData1 = {};
    paramData1.type = 0;
    paramData1.pkey = "";
    param1.data = paramData1;
    param1.success = this.success_GetSelectInfo;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
    
  },

  success_GetSelectInfo: function (result, param) {
    //console.log(result.Data[0].items)
    this.setData({
      items: result.Data[0].items
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

  input_GenericName:function(e){
    this.setData({
      GenericName: e.detail.value
    })
    this.nameTip.show_NameTip();
  },

  Get_GenericName: function (e) {
    this.setData({
      GenericName: e.detail
    })
  },

  input_ApprovalHolderCompanyName_ManufactureCompanyName:function(e){
    this.setData({
      ApprovalHolderCompanyName_ManufactureCompanyName: e.detail.value,
    })
  },

  checkboxChange(e) {
    //console.log(e.detail.value.join())
    this.setData({
      CollectionCategory: e.detail.value.join()
    })
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

  Reset_all:function(e){
    this.setData({
      ApprovalDate_Start: "",
      ApprovalDate_End: "",
      CollectionCategory: "",
      Unchecked: false,
      ApprovalHolderCompanyName_ManufactureCompanyName: "",
      GenericName: "",
    })
  },

  Next_navigator:function(e){
    if (this.data.GenericName.trim() == "" && this.data.ApprovalHolderCompanyName_ManufactureCompanyName.trim() == "" && this.data.CollectionCategory == "" && this.data.ApprovalDate_End == "" && this.data.ApprovalDate_Start == ""){
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.navigateTo({
        url: `/ListedDrugs/list?ApprovalDate_End=${this.data.ApprovalDate_End}&ApprovalDate_Start=${this.data.ApprovalDate_Start}&CollectionCategory=${encodeURIComponent(this.data.CollectionCategory)}&ApprovalHolderCompanyName_ManufactureCompanyName=${encodeURIComponent(this.data.ApprovalHolderCompanyName_ManufactureCompanyName)}&GenericName=${encodeURIComponent(this.data.GenericName)}`
      })
    }
  },

  Close_NameTip: function (e) {
    if (this.nameTip.data.prompt_hidden == false) {
      this.nameTip.blur_NameTip();
    }
  },

})