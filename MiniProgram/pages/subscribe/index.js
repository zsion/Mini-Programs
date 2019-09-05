// page/pages/Dingyue/Dingyue.js
var app = getApp();
const util = require('../../util/util.js');

const GetSubscriptionInfo = require('../../config').Member.GetSubscriptionInfo
const SaveUserInfo = require('../../config').Member.SaveUserInfo
const OpenSubscription = require('../../config').Member.OpenSubscription
const CloseSubscription = require('../../config').Member.CloseSubscription
const DoUnbind = require('../../config').Member.DoUnbind

//图片地址管理
var url_array = {
  lzgsb: app.globalData.imgUrl + '/img/public/lzgsb.png',//
  hzgss: app.globalData.imgUrl + '/img/public/hzgss.png',//
  lyzxpj: app.globalData.imgUrl + '/img/public/lyzxpj.png',//
  bg: app.globalData.imgUrl + '/img/Dingyue/1.png',//
  face: app.globalData.imgUrl + '/img/Dingyue/2.png',//
  left: app.globalData.imgUrl + '/img/Dingyue/6.png',//
  right: app.globalData.imgUrl + '/img/Dingyue/7.png',//
  qrcode1: app.globalData.imgUrl + '/img/Dingyue/qrcode1.png',//
  qrcode2: app.globalData.imgUrl + '/img/Dingyue/qrcode2.png',//
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbind: wx.getStorageSync('isbind'),
    information: wx.getStorageSync('information'),
    imgUrl: url_array,
    data_list:[],
    userInfo: {},
    hasUserInfo: false,
    do_type: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户订阅信息
    var param1 = {};
    param1.url = GetSubscriptionInfo;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.successGetSubscriptionInfo;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  auto_load:function(){
    //获取用户订阅信息
    var param1 = {};
    param1.url = GetSubscriptionInfo;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.successGetSubscriptionInfo1;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },
  Save_UserInfo: function () {
    //保存用户信息
    var param2 = {};
    param2.url = SaveUserInfo;
    var paramData2 = {};
    paramData2.nickname = this.data.userInfo.nickName;
    paramData2.gender = this.data.userInfo.gender;
    paramData2.province = this.data.userInfo.province;
    paramData2.city = this.data.userInfo.city;
    paramData2.country = this.data.userInfo.country;
    paramData2.avatarurl = this.data.userInfo.avatarUrl;
    param2.data = paramData2;
    param2.success = this.successSaveUserInfo;
    param2.method = "POST";
    param2.param = {};
    util.NetRequest(param2);
  },
  successGetSubscriptionInfo: function (result, param) {
    //console.log(result.Data);
    this.setData({
      data_list: result.Data
    })
  },
  successGetSubscriptionInfo1: function (result, param) {
    //console.log(result);
    if (result.ResultType == 1){
      if (this.data.do_type == "订阅"){
        setTimeout(function () {
          wx.showToast({
            title: '订阅成功',
            icon: 'none',
            duration: 1000,
          })
        }, 100)
      } else if (this.data.do_type == "取消"){
        setTimeout(function () {
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1000,
          })
        }, 100)
      }
      this.setData({
        data_list: result.Data
      })
    }else{
      if (this.data.do_type == "订阅") {
        setTimeout(function () {
          wx.showToast({
            title: '订阅失败',
            icon: 'none',
            duration: 1000,
          })
        }, 100)
      } else if (this.data.do_type == "取消"){
        setTimeout(function () {
          wx.showToast({
            title: '取消失败',
            icon: 'none',
            duration: 1000,
          })
        }, 100)
      }
    }
  },
  successSaveUserInfo: function (result, param) {
    //console.log(result);
    if (result.Data == true){
      console.log("用户信息存储成功")
    }else{
      console.log("用户信息存储失败")
    }
  },
  getUserInfo: function (e) {
    //console.log(e)
    try {
      if (e.detail.userInfo != undefined) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        //console.log(this.data.userInfo)
        this.Save_UserInfo()
      }
    } catch (e) {
      
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
    //console.log("ok")
    this.setData({
      isbind: wx.getStorageSync('isbind'),
      information: wx.getStorageSync('information'),
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

  unbind:function(e){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '解绑后将无法使用数据库的高级功能，无法查看所有数据详情，是否继续解绑?',
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          var param3 = {};
          param3.url = DoUnbind;
          var paramData3 = {};
          param3.data = paramData3;
          param3.success = that.successDoUnbind;
          param3.method = "GET",
          param3.param = {};
          util.NetRequest(param3);
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
    
  },

  show_message:function(){
    wx.showToast({
      title: '解绑成功',
      icon: 'none',
      duration: 2000
    })
  },
  successDoUnbind: function(result, param) {
    //console.log(result)
    if (result.ResultType == 1) {
      try {
        wx.setStorageSync('auth', result.Data.auth)
        wx.setStorageSync('isbind', result.Data.isbind)
        wx.setStorageSync('information', result.Data.information)
      } catch (e) {

      }
      setTimeout(this.show_message, 700);
      this.setData({
        isbind: wx.getStorageSync('isbind'),
        information: wx.getStorageSync('information'),
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: result.Message,
        showCancel: false
      });
    }
  },

  close:function(e){
    this.setData({
      do_type: "取消",
    })
    //用户取消动作
    var param1 = {};
    param1.url = CloseSubscription;
    var paramData1 = {};
    paramData1.type = e.target.dataset.type;
    param1.data = paramData1;
    param1.success = this.auto_load;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },
  open:function(e){
    this.setData({
      do_type: "订阅",
    })
    //用户订阅动作
    var param1 = {};
    param1.url = OpenSubscription;
    var paramData1 = {};
    paramData1.type = e.target.dataset.type;
    param1.data = paramData1;
    param1.success = this.auto_load;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },
  copyTBL: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.content,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.imgUrl.qrcode1, // 当前显示图片的http链接 
      urls: [this.data.imgUrl.qrcode2] // 需要预览的图片http链接列表
    })
    // 获取图片信息（此处可不要）
    wx.getImageInfo({
      src: this.data.imgUrl.qrcode2,
      success: function (res) {
        //console.log(res.width)
        //console.log(res.height)
      }
    })

  },
  
})