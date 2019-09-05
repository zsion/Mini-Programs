// ClinicalRegistration//simple_search.js
var app = getApp();

const GetDrugNameTip = require('../config').ClinicalRegistration.GetDrugNameTip
const GetApplicantNameTip = require('../config').ClinicalRegistration.GetApplicantNameTip

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_DrugName: GetDrugNameTip,
    address_ApplicantName: GetApplicantNameTip,
    Power: "",
    DrugName: "",
    ApplicantName: "",
    Indications: "",
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').ClinicalRegistration
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

  input_DrugName: function (e) {
    this.setData({
      DrugName: e.detail.value
    })
    this.nameTip_DrugName.show_NameTip();
  },

  Get_DrugName: function (e) {
    this.setData({
      DrugName: e.detail
    })
  },

  input_ApplicantName: function (e) {
    this.setData({
      ApplicantName: e.detail.value
    })
    this.nameTip_ApplicantName.show_NameTip();
  },

  Get_ApplicantName: function (e) {
    this.setData({
      ApplicantName: e.detail
    })
  },

  input_Indications: function (e) {
    this.setData({
      Indications: e.detail.value
    })
  },

  Reset_all: function (e) {
    this.setData({
      DrugName: "",
      ApplicantName: "",
      Indications: "",
    })
  },

  Next_navigator: function (e) {
    if (this.data.DrugName.trim() == "" && this.data.ApplicantName.trim() == "" && this.data.Indications.trim() == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ClinicalRegistration/list?DrugName=${encodeURIComponent(this.data.DrugName)}&ApplicantName=${encodeURIComponent(this.data.ApplicantName)}&Indications=${encodeURIComponent(this.data.Indications)}`
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