// ClinicalRegistration//Subject_info.js
var app = getApp();
const util = require('../util/util.js');

const GetInclusionCriteriaList = require('../config').ClinicalRegistration.GetInclusionCriteriaList
const GetExclusionCriteriaList = require('../config').ClinicalRegistration.GetExclusionCriteriaList

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RegistrationNo: "",

    AgeDistribution: "",
    HealthySubjects: "",
    Gender: "",
    TargetEntry: "",
    ActualEntry: "",

    Type: 0,
    page: 0,
    have_more: true,
    DataList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      RegistrationNo: options.RegistrationNo,
      AgeDistribution: (options.AgeDistribution != undefined) ? decodeURIComponent(options.AgeDistribution) : "",
      HealthySubjects: (options.HealthySubjects != undefined) ? decodeURIComponent(options.HealthySubjects) : "",
      Gender: (options.Gender != undefined) ? decodeURIComponent(options.Gender) : "",
      TargetEntry: (options.TargetEntry != undefined) ? decodeURIComponent(options.TargetEntry) : "",
      ActualEntry: (options.ActualEntry != undefined) ? decodeURIComponent(options.ActualEntry) : "",
    });
    this.Load_data();//加载列表
  },

  //加载列表
  Load_data: function () {
    var param1 = {};
    param1.url = (this.data.Type == 0) ? GetInclusionCriteriaList : GetExclusionCriteriaList;
    var paramData1 = {};
    paramData1.RegistrationNo = this.data.RegistrationNo;
    paramData1.page = this.data.page;
    param1.data = paramData1;
    param1.success = this.Success_DataList;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  Success_DataList: function (result, param) {
    //console.log(result.Data)
    if (this.data.page == 0) {
      if (result.Data.length != 0) {
        this.setData({
          have_more: true,
          DataList: result.Data,
        });
      } else {
        this.setData({
          DataList: [],
        });
      }
    } else {
      if (this.data.have_more == true) {
        var DataList = this.data.DataList;
        if (result.Data.length != 0) {
          for (var i = 0; i < result.Data.length; i++) {
            DataList.push(result.Data[i]);
          }
          // 设置数据
          this.setData({
            DataList: this.data.DataList,
          })
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
    //触底加载更多函数
    if (this.data.have_more == true) {
      this.data.page++
      this.Load_data();//加载列表
    }
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

  tab_touch:function(e){
    this.setData({
      Type: e.currentTarget.dataset.current,
      page: 0,
      have_more: true,
      DataList: [],
    });
    this.Load_data();//加载列表
  },
})