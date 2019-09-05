// page/pages/DingyueTs/DingyueTs.js
var app = getApp();
const util = require('../../util/util.js');

const GetPushList_Zgsb = require('../../config').Subscription.GetPushList_Zgsb

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_Con: "CDE最新受理",
    data_list:[],
    count:"",
    date:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var interval = setInterval(function () {
      if (app.globalData.order != "") {
        clearInterval(interval)
        that.load_data(options)
      }
    }, 1000);
  },

  load_data: function (options){
    //获取订阅推送消息
    var param1 = {};
    param1.url = GetPushList_Zgsb;
    var paramData1 = {};
    paramData1.id = options.id;
    param1.data = paramData1;
    param1.success = this.successGetPushList_Zgsb;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  successGetPushList_Zgsb: function (result, param) {
    //console.log(result.Data);
    this.setData({
      data_list: result.Data,
      count: result.Data.length,
      date: result.Data[0].cbrq,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //监听屏幕滚动 判断上下滚动  
  onPageScroll: function (ev) {
    
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
})