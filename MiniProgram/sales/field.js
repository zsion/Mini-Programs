var app = getApp();

const GetSelectInfo = require('../config').CommCategory.GetSelectInfo

Page({

  data: {
    address: GetSelectInfo,//配置数据请求地址
    address_ATC: "/sales/chart?search_Type=2&ATC1=",//配置页面-ATC搜索-跳转地址
    address_PHIIC: "/sales/chart?search_Type=3&zldl=",//配置页面-PHIIC搜索-跳转地址
    dbtype: 1,//数据库类型
  },

  onLoad: function (options) {

  },

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
  }

})
