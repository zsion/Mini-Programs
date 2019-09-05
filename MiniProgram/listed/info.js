var app = getApp();
const util = require('../util/util.js');

const GetGcypInfo = require('../config').Zgss.GetGcypInfo
const GetJkypInfo = require('../config').Zgss.GetJkypInfo

Page({
  data: {
    type:0,
    detaildata1:[],
    detaildata2:[],
    All_options: {},
  },
  onLoad: function (options) {
    //console.log(options.type)
    this.setData({
      All_options: options,
      type: options.type
    })

    this.Auto_load(options)

  },

  Auto_load: function (options) {
    if (options.type == 0) {
      var param1 = {};
      param1.url = GetGcypInfo;
      var paramData1 = {};
      paramData1.pzwh = options.pzwh;
      param1.data = paramData1;
      param1.success = this.successGetGcypInfo;
      param1.show_WarningCode = this.Show_WarningCode;
      param1.method = "POST";
      param1.param = {};
      util.NetRequest(param1);
    } else {
      var param2 = {};
      param2.url = GetJkypInfo;
      var paramData2 = {};
      paramData2.zczh = options.zczh;
      param2.data = paramData2;
      param2.success = this.successGetJkypInfo;
      param2.show_WarningCode = this.Show_WarningCode;
      param2.method = "POST";
      param2.param = {};
      util.NetRequest(param2);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
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

  successGetGcypInfo: function (result, param) {
    //console.log(result.Data);
    this.setData({
      detaildata1: result.Data
    })
  },
  successGetJkypInfo: function (result, param) {
    //console.log(result.Data);
    this.setData({
      detaildata2: result.Data
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

})
