// ClinicalRegistration//Second_endpoint.js
var app = getApp();
const util = require('../util/util.js');

const GetSecondaryIndicatorsList = require('../config').ClinicalRegistration.GetSecondaryIndicatorsList

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Address: GetSecondaryIndicatorsList,
    RegistrationNo: "",
    Type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      RegistrationNo: options.RegistrationNo,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.detaillist = this.selectComponent('#detaillist');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.detaillist.Load_more();
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
  }
})