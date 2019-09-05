var app = getApp();
const util = require('../../util/util.js');

const GetSearchInfo_Drug = require('../../config').Search.GetSearchInfo_Drug
const GetSearchInfo_Company = require('../../config').Search.GetSearchInfo_Company
const GetSearchInfo_ATC = require('../../config').Search.GetSearchInfo_ATC
const GetSearchInfo_CPHIIC = require('../../config').Search.GetSearchInfo_CPHIIC

//图片地址管理
var url_array = {
  zgxs: [app.globalData.imgUrl + '/img/public/hzgxs.png', app.globalData.imgUrl + '/img/public/lzgxs.png',],//
  zgsb: [app.globalData.imgUrl + '/img/public/hzgsb.png', app.globalData.imgUrl + '/img/public/lzgsb.png',],//
  zgss: [app.globalData.imgUrl + '/img/public/hzgss.png', app.globalData.imgUrl + '/img/public/lzgss.png',],//
  yzxpj: [app.globalData.imgUrl + '/img/public/hyzxpj.png', app.globalData.imgUrl + '/img/public/lyzxpj.png',],//
  cbzjml: [app.globalData.imgUrl + '/img/public/hcbzjml.png', app.globalData.imgUrl + '/img/public/lcbzjml.png',],//
  zgcps: [app.globalData.imgUrl + '/img/public/hzgcps.png', app.globalData.imgUrl + '/img/public/lzgcps.png',],//
  zglc: [app.globalData.imgUrl + '/img/public/hzglc.png', app.globalData.imgUrl + '/img/public/lzglc.png',],//
}

Page({
  data: {
    Isbind: "",
    Modal_hidden: true,
    imgUrl: url_array,
    total_data:[],
    search_Type:"",
    search_Con:"",
    ATC1: "",
    ATC2: "",
    ATC3: "",
    ATC4: "",
    zldl: "",
    zlxl: "",
    con_null:false,
    All_options:{},
  },
  onLoad: function (options) {
    //console.log(options)

    wx.setNavigationBarTitle({
      title: options.ATC4 || options.ATC3 || options.ATC2 || options.ATC1 || options.zlxl || options.zldl || decodeURIComponent(options.search_Con)
    })
    this.setData({
      All_options: options,
      search_Type: options.search_Type,
      search_Con: options.ATC4 || options.ATC3 || options.ATC2 || options.ATC1 || options.zlxl || options.zldl || decodeURIComponent(options.search_Con),
      ATC4: (options.ATC4 != undefined) ? options.ATC4 : "",
      ATC3: (options.ATC3 != undefined) ? options.ATC3 : "",
      ATC2: (options.ATC2 != undefined) ? options.ATC2 : "",
      ATC1: (options.ATC1 != undefined) ? options.ATC1 : "",
      zlxl: (options.zlxl != undefined) ? options.zlxl : "",
      zldl: (options.zldl != undefined) ? options.zldl : "",
    })

    this.Auto_load(options)
    
  },

  Auto_load: function (options){
    //请求热门藥品搜索词
    var param1 = {};
    if (options.search_Type == 0) {
      param1.url = GetSearchInfo_Drug;
    } else if (options.search_Type == 1) {
      param1.url = GetSearchInfo_Company;
    } else if (options.search_Type == 2) {
      param1.url = GetSearchInfo_ATC;
    } else if (options.search_Type == 3) {
      param1.url = GetSearchInfo_CPHIIC;
    }
    var paramData1 = {};
    if (options.search_Type == 0) {
      paramData1.keywords = decodeURIComponent(options.search_Con);
    } else if (options.search_Type == 1) {
      paramData1.keywords = decodeURIComponent(options.search_Con);
    } else if (options.search_Type == 2) {
      paramData1.ATC1 = options.ATC1;
      paramData1.ATC2 = options.ATC2;
      paramData1.ATC3 = options.ATC3;
      paramData1.ATC4 = options.ATC4;
    } else if (options.search_Type == 3) {
      paramData1.zldl = options.zldl;
      paramData1.zlxl = options.zlxl;
    }
    param1.data = paramData1;
    param1.success = this.successGetSearchInfo_Drug;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Target_Drug: wx.getStorageSync('auth').ConsistencyProgress,
      Target_Company: wx.getStorageSync('auth').ConsistencyProgress_Co,
      Isbind: wx.getStorageSync('isbind'),
    });
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
  successGetSearchInfo_Drug: function (result, param) {
    //console.log(result.Data)
    if (result.Data.length != 0){
      this.setData({
        total_data: result.Data,
        con_null: false
      })
    }else{
      this.setData({
        con_null: true
      })
    }
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

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },
  

})

