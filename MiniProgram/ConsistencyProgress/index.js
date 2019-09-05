// ConsistencyProgress//index.js
var app = getApp();
const util = require('../util/util.js');

const GetKeywords = require('../config').ConsistencyProgress.GetKeywords
const GetCategoryTotal = require('../config').ConsistencyProgress.GetCategoryTotal
const GetNews = require('../config').ConsistencyProgress.GetNews
const GetDrugProgress = require('../config').ConsistencyProgress.GetDrugProgress
const GetCompanyProgress = require('../config').ConsistencyProgress.GetCompanyProgress
const GetKeywordsTotal_Drug = require('../config').ConsistencyProgress.GetKeywordsTotal_Drug
const GetKeywordsTotal_Company = require('../config').ConsistencyProgress.GetKeywordsTotal_Company

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: {},
    Isbind: "",
    Modal_hidden: true,
    Name: "",
    Unfocus: true,
    currentsTab: 0,
    Keywords: [],
    CategoryTotal: { cbzjml: "--", besyba: "--",tjpsslh: "--",ytgpw: "--"},
    News: [],
    DrugProgress: [],
    CompanyProgress: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.Auto_load_Keywords(options);
    this.Auto_load_CategoryTotal(options);
    this.Auto_load_News(options);
    this.Auto_load_DrugProgress(options);
    this.Auto_load_CompanyProgress(options);
    
  },

  Auto_load_Keywords: function (options) {
    var param1 = {};
    param1.url = GetKeywords;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.SuccessGetKeywords;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetKeywords: function (result, param) {
    //console.log(result.Data)
    if (result.Data != undefined) {
      this.setData({
        Keywords: result.Data,
      });
    }
  },

  Auto_load_CategoryTotal: function (options){
    var param1 = {};
    param1.url = GetCategoryTotal;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.SuccessGetCategoryTotal;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetCategoryTotal: function (result, param) {
    if (result.Data != undefined){
      result.Data.forEach(function (values, indexs, arrays) {
        if (values.type == 0) {
          this.data.CategoryTotal.cbzjml = values.total
        } else if (values.type == 1) {
          this.data.CategoryTotal.besyba = values.total
        } else if (values.type == 2) {
          this.data.CategoryTotal.tjpsslh = values.total
        } else if (values.type == 3) {
          this.data.CategoryTotal.ytgpw = values.total
        }
      }, this);
    }
    this.setData({
      CategoryTotal: this.data.CategoryTotal,
    });
  },

  Auto_load_News: function (options) {
    var param1 = {};
    param1.url = GetNews;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.SuccessGetNews;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetNews: function (result, param) {
    //console.log(result.Data)
    if (result.Data != undefined) {
      this.setData({
        News: result.Data,
      });
    }
  },

  Auto_load_DrugProgress: function (options) {
    var param1 = {};
    param1.url = GetDrugProgress;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.SuccessGetDrugProgress;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetDrugProgress: function (result, param) {
    if (result.Data != undefined) {
      this.setData({
        DrugProgress: result.Data,
      });
    }
  },

  Auto_load_CompanyProgress: function(options) {
    var param1 = {};
    param1.url = GetCompanyProgress;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.SuccessGetCompanyProgress;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);
  },

  SuccessGetCompanyProgress: function (result, param) {
    if (result.Data != undefined) {
      this.setData({
        CompanyProgress: result.Data,
      });
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
    this.setData({
      Power: { ConsistencyProgress : wx.getStorageSync('auth').ConsistencyProgress,
               ConsistencyProgress_Co : wx.getStorageSync('auth').ConsistencyProgress_Co},
      Target_DrugApproval: wx.getStorageSync('auth').DrugApproval,
      Target_ListedDrugs: wx.getStorageSync('auth').ListedDrugs,
      Target_ClinicalRegistration: wx.getStorageSync('auth').ClinicalRegistration,
      Target_ChineseReferencePreparation: wx.getStorageSync('auth').ChineseReferencePreparation,
      Isbind: wx.getStorageSync('isbind'),
    });
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

  },
  Get_focus:function(e){
    this.setData({
      Unfocus: false,
    })
  },
  Lose_focus: function (e) {
    this.setData({
      Unfocus: true,
    })
  },
  //点击切换 
  TabNavs: function (e) {
    if (this.data.currentsTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentsTab: e.currentTarget.dataset.current
      })
    }
  },

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },

  //输入药品名称/企业名称
  input_Name: function (e) {
    this.setData({
      Name: e.detail.value
    })
  },

  Get_Keywords_Total: function (type, key){
    var param1 = {};
    param1.url = type == 0 ? GetKeywordsTotal_Drug : GetKeywordsTotal_Company;
    var paramData1 = {};
    paramData1.keywords = key;
    param1.data = paramData1;
    param1.success = this.Success_Get_Total;
    param1.method = "GET";
    param1.param = {type:type,key:key};
    util.NetRequest(param1);
  },

  Success_Get_Total: function (result, param){
    //console.log(result)
    if (result.Data > 0){
      const path = param.type == 0 ? 'DrugList' :'CompanyList'
      wx.navigateTo({
        url: `/ConsistencyProgress/${path}?search_Type=0&search_Con=${encodeURIComponent(param.key)}`
      })
    }else{
      if (param.type == 0){
        this.data.Power.ConsistencyProgress_Co == true ? this.Get_Keywords_Total(1, param.key) : 
        wx.showToast({
          title: '暂未找到相关内容',
          icon: 'none',
          duration: 2000
        });
      }else{
        wx.showToast({
          title: '暂未找到相关内容',
          icon: 'none',
          duration: 2000
        });
      }
    }
  },

  Search_navigator: function (e) {
    if (this.data.Name.trim() == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (this.data.Isbind == true){
        this.data.Power.ConsistencyProgress == true ? this.Get_Keywords_Total(0, this.data.Name) : (this.data.Power.ConsistencyProgress_Co == true ? this.Get_Keywords_Total(1, this.data.Name) : this.Show_modal())
      }else{
        // 没绑定
        this.Show_modal()
      }
    }
  },

  Key_navigator: function (e) {
    //console.log(e)
    if (this.data.Isbind == true) {
      this.data.Power.ConsistencyProgress == true ? this.Get_Keywords_Total(0, e.currentTarget.dataset.name) : (this.data.Power.ConsistencyProgress_Co == true ? this.Get_Keywords_Total(1, e.currentTarget.dataset.name) : this.Show_modal())
    } else {
      //没绑定
      this.Show_modal()
    }
  },

})