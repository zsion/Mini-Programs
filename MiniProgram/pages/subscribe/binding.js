// pages/subscribe/binding.js
var app = getApp();
const util = require('../../util/util.js');

const SendVerifyCode = require('../../config').Member.SendVerifyCode
const ClearVerifyCode = require('../../config').Member.ClearVerifyCode
const DoBind = require('../../config').Member.DoBind

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:"",
    user_password:"",
    user_mobile:"",
    identify_code:"",
    identify_text: "发送验证码",
    time:"60",
    change_color: false,
    not_use: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //清空绑定验证码
    var param2 = {};
    param2.url = ClearVerifyCode;
    var paramData2 = {};
    param2.data = paramData2;
    param2.success = this.successClearVerifyCode;
    param2.method = "GET";
    param2.param = {};
    util.NetRequest(param2);
  },

  successClearVerifyCode: function (result, param){
    
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

  user_name_input: function (e) {
    this.setData({
      user_name: e.detail.value
    })
  },
  user_name_blur: function (e) {
    if (this.data.user_name.length < 4 && this.data.user_name.length != 0) {
      wx.showToast({
        title: '用户名长度为4-25',
        icon: 'none',
        duration: 2000
      })
    }
  },

  user_password_input: function (e) {
    this.setData({
      user_password: e.detail.value
    })
  },

  user_password_blur: function (e) {
    if (this.data.user_password.length < 6 && this.data.user_password.length != 0) {
      wx.showToast({
        title: '密码长度为6-15',
        icon: 'none',
        duration: 2000
      })
    }
  },

  user_mobile_input: function (e) {
    this.setData({
      user_mobile: e.detail.value
    })
    if (this.data.user_mobile.length == 11) {
      if (!(/^1[34578]\d{9}$/.test(this.data.user_mobile))) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none',
          duration: 2000
        })
      } 
    }
  },

  identify_code_input:function(e){
    this.setData({
      identify_code: e.detail.value
    })
  },

  Send_VerifyCode:function(e){
    if (this.data.user_name.trim() == ""){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_name.length < 4) {
      wx.showToast({
        title: '用户名长度为4-25',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_password.trim() == ""){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_password.length < 6) {
      wx.showToast({
        title: '密码长度为6-15',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_mobile.trim() == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_mobile.length != 11) {
      wx.showToast({
        title: '手机号长度错误',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_name.trim() != "" && this.data.user_name.length >= 4 && this.data.user_password.trim() != "" && this.data.user_password.length >= 6 && this.data.user_mobile.trim() != "" && this.data.user_mobile.length == 11){
      //发送绑定验证码
      var param1 = {};
      param1.url = SendVerifyCode;
      var paramData1 = {};
      paramData1.username = this.data.user_name;
      paramData1.password = this.data.user_password;
      paramData1.phone = this.data.user_mobile;
      param1.data = paramData1;
      param1.success = this.successSendVerifyCode;
      param1.method = "GET";
      param1.param = {};
      util.NetRequest(param1);
    }
    
  },

  successSendVerifyCode: function (result, param) {
    if (result.ResultType == 1){
      var that = this
      var currentTime = that.data.time
      that.setData({
        identify_text: currentTime + '秒后重新发送',
        not_use: true,
        change_color: true,
      })
      
      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--;
        that.setData({
          identify_text: currentTime + '秒后重新发送',
          not_use: true,
          change_color: true,
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            identify_text: "重新发送",
            time: 60,
            not_use: false,
            change_color: false,
          })
        }
      }, 1000);
      
    }else{
      this.setData({
        not_use: false,
      })
    }
    
  },

  make_sure: function (e) {
    if (this.data.user_name.trim() == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_name.length < 4) {
      wx.showToast({
        title: '用户名长度为4-25',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_password.trim() == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_password.length < 6) {
      wx.showToast({
        title: '密码长度为6-15',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_mobile.trim() == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_mobile.length != 11) {
      wx.showToast({
        title: '手机号长度错误',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.identify_code.trim() == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.identify_code.length != 4) {
      wx.showToast({
        title: '验证码长度为4',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.user_name.trim() != "" && this.data.user_name.length >= 4 && this.data.user_password.trim() != "" && this.data.user_password.length >= 6 && this.data.user_mobile.trim() != "" && this.data.user_mobile.length == 11 && this.data.identify_code.trim() != "" && this.data.identify_code.length == 4){
      //绑定请求
      var param1 = {};
      param1.url = DoBind;
      var paramData1 = {};
      paramData1.username = this.data.user_name;
      paramData1.password = this.data.user_password;
      paramData1.phone = this.data.user_mobile;
      paramData1.verifycode = this.data.identify_code;
      param1.data = paramData1;
      param1.success = this.successDoBind;
      param1.method = "POST",
      param1.param = {};
      util.NetRequest(param1);
    }

  },

  successDoBind: function (result, param){
    //console.log(result)
    if (result.ResultType == 1){
      app.globalData.Islock = false
      try {
        wx.setStorageSync('auth', result.Data.auth)
        wx.setStorageSync('isbind', result.Data.isbind)
        wx.setStorageSync('information', result.Data.information)
      } catch (e) {

      }
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: result.Message,
        showCancel: false
      });
    }
  }


})