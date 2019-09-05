// page/pages/DingyueList/DingyueList.js
var app = getApp();
const util = require('../../util/util.js');

const GetSubscriptionHistory = require('../../config').Member.GetSubscriptionHistory

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_list:[],
    date:"",
    have_more: true,
    con_null: false,
    Count: 0,
    Maxpage: 1450,//1450
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取订阅历史列表
    var param1 = {};
    param1.url = GetSubscriptionHistory;
    var paramData1 = {};
    paramData1.date = "";
    param1.data = paramData1;
    param1.success = this.successGetSubscriptionHistory;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  successGetSubscriptionHistory: function (result, param) {
    //console.log(result.Data);
    if (result.Data.length != 0) {
      var use_date = result.Data[result.Data.length - 1].date
      this.setData({
        data_list: result.Data,
        date: use_date,
        con_null: false
      })
    } else {
      this.setData({
        con_null: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    if (this.data.Count >= this.data.Maxpage) {
      this.setData({
        have_more: false
      })
    }else{
      //获取订阅历史列表
      if (this.data.have_more == true) {
        var param1 = {};
        param1.url = GetSubscriptionHistory;
        var paramData1 = {};
        paramData1.date = this.data.date;
        param1.data = paramData1;
        param1.success = this.successGetSubscriptionHistory1;
        param1.method = "POST";
        param1.param = {};
        util.NetRequest(param1);
      }
    }
  },

  successGetSubscriptionHistory1: function (result, param){
    //console.log(result.Data.length)
    if (this.data.have_more == true && result.Data.length != 0) {
      var use_date = result.Data[result.Data.length - 1].date
      this.setData({
        date: use_date
      })
      
      var data_list = this.data.data_list;
      
      if (result.Data.length > 0) {
        for (var i = 0; i < result.Data.length; i++) {
          data_list.push(result.Data[i]);
        }
        // 设置数据
        this.setData({
          data_list: this.data.data_list
        })
        result.Data.forEach(function (values, indexs, arrays) {
          this.data.Count += values.data.length
        }, this);
      } else {
        this.setData({
          have_more: false
        })
      }
      
    } else {
      this.setData({
        have_more: false
      })
    }
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