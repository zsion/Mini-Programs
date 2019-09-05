// ClinicalRegistration//detail.js
var app = getApp();
const util = require('../util/util.js');

const GetInfo = require('../config').ClinicalRegistration.GetInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixed: false,
    currentsTab: 0,
    list: 100,
    toggle: [{ name: "试验目的", open: false, value: "" }, { name: "试验设计", open: false, value: []}],
    condition: [{ name: "药品名称", value: "" }, 
                { name: "药品通用名", value: "" }, 
                { name: "国内最高进度", value: "" },
                { name: "申办者", value: "" },
                { name: "适应症", value: "" },
                { name: "试验专业题目", value: "" },
                { name: "试验分期", value: "" },
                { name: "试验分类", value: "" },
                { name: "试验范围", value: "" },
                { name: "试验状态", value: "" }],
    skip: [{ name: "试验药", url: "/ClinicalRegistration/Test_drug" },
            { name: "对照药", url: "/ClinicalRegistration/Control_drug" },
            { name: "受试者信息", url: "/ClinicalRegistration/Subject_info" },
            { name: "主要终点指标", url: "/ClinicalRegistration/Main_endpoint" },
            { name: "次要终点指标", url: "/ClinicalRegistration/Second_endpoint" }],

    toggle_content:false,

    DataList: {},
    TimeLine: [],
    RegistrationNo: "",

    All_options: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.RegistrationNo
    })
    this.setData({
      All_options: options,
      RegistrationNo: options.RegistrationNo,
    });

    this.Auto_load(options)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
  },

  Auto_load: function (options) {
    var param1 = {};
    param1.url = GetInfo;
    var paramData1 = {};
    paramData1.RegistrationNo = options.RegistrationNo;
    param1.data = paramData1;
    param1.success = this.SuccessGetInfo;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetInfo: function (result, param) {
    this.setData({
      DataList: result.Data,
      TimeLine: result.Data.TimeLine,
      condition: [{ name: "药品名称", value: result.Data.ProductName },
        { name: "药品通用名", value: result.Data.GenericName },
        { name: "国内最高进度", value: result.Data.DrugHighestPhase },
        { name: "申办者", value: result.Data.ApplicantName },
        { name: "适应症", value: result.Data.Indications },
        { name: "试验专业题目", value: result.Data.TestSubject },
        { name: "试验分期", value: result.Data.TestStaging },
        { name: "试验分类", value: result.Data.TestType },
        { name: "试验范围", value: result.Data.TestRange },
        { name: "试验状态", value: result.Data.TestState }],
      toggle: [{ name: "试验目的", open: false, value: result.Data.TestPurpose }, 
                { name: "试验设计", open: false, value: [
                  { name: "设计类型", value: result.Data.DesignType}, 
                  { name: "随机化", value: result.Data.Randomization }, 
                  { name: "盲法", value: result.Data.BlindMethod}] }],  
    })
  },

  Show_WarningCode: function (result, param) {
    this.setData({
      Message: result.Message,
      Type: result.Data.type,
      Img: result.Data.code,
    });
    this.WarningCode.Init_WarningCode();
  },

  Get_WarningCode: function (e) {
    this.Auto_load(this.data.All_options)
  },

  //监听屏幕滚动 判断上下滚动  
  onPageScroll: function (ev) {
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
      _this.setData({
        fixed: false
      })
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动   
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      _this.setData({
        fixed: true
      })
    } else {

    }
    //给scrollTop重新赋值    
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
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
  //第二个点击切换 
  tabNavs: function (e) {
    if (this.data.currentsTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentsTab: e.target.dataset.current
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  toggle_Ctrl:function(e){
    this.data.toggle.forEach(function (value, index, array) {
      if (value.name == e.currentTarget.dataset.name) {
        value.open = !value.open
      } else {
        value.open = false
      }
    },this);
    this.setData({
      toggle: this.data.toggle
    })
  },

  toggle_source:function(e){
    this.setData({
      toggle_content: !this.data.toggle_content
    })
  },

})