// page/pages/zgxs/zgxs.js
var app = getApp();
const util = require('../util/util.js');

const GetKeywords = require('../config').Sales.GetKeywords
const GetRank = require('../config').Sales.GetRank
const GetUpdateTime = require('../config').Sales.GetUpdateTime


//图片地址管理
var url_array = new Array(
  app.globalData.imgUrl + '/img/zgxs/1.png', //白色的搜索按钮
  app.globalData.imgUrl + '/img/zgxs/2.png', //奖杯图片
  app.globalData.imgUrl + '/img/search/1.png', //查看更多的眼睛
)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: url_array,
    scrollTop: 0,
    hidden: true,
    windowHeight: '',
    Keywords: [],
    search_Con: "",
    data_title: "",
    data_list: [],
    last_date:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    try {
      var res = wx.getSystemInfoSync()
      this.setData({ windowHeight: (res.windowHeight - 175) + 'px' })
    } catch (e) {

    }

    //中国销售-热门搜索词
    var param1 = {};
    param1.url = GetKeywords;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.successGetKeywords;
    param1.method = "GET";
    param1.param = {};
    util.NetRequest(param1);

    //中国销售排名前50
    var param2 = {};
    param2.url = GetRank;
    var paramData2 = {};
    param2.data = paramData2;
    param2.success = this.successGetRank;
    param2.method = "GET";
    param2.param = {};
    util.NetRequest(param2);

    //获取数据库最后更新时间
    var param3 = {};
    param3.url = GetUpdateTime;
    var paramData3 = {};
    param3.data = paramData3;
    param3.success = this.successGetUpdateTime;
    param3.method = "GET";
    param3.param = {};
    util.NetRequest(param3);

  },
  successGetKeywords: function (result, param) {
    this.setData({
      Keywords: result.Data
    })
  },
  successGetRank: function (result, param) {
    //console.log(result.Data)
    this.setData({
      data_title: result.Data.title,
      data_list: result.Data.list
    })
  },
  successGetUpdateTime: function (result, param){
    //console.log(result.Data)
    this.setData({
      last_date: result.Data
    })
  },

  search_Con_Input: function (e) {
    this.setData({
      search_Con: e.detail.value
    })
  },

  to_list: function (e) {
    if (this.data.search_Con.trim() != "") {
      wx.navigateTo({
        url: "/sales/dic?search_Type=-1&search_Con=" + encodeURIComponent(this.data.search_Con)
      })
    } else {
      wx.showToast({
        title: '请输入药品/企业名称',
        icon: 'none',
        duration: 2000
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
  show_modal: function (e) {
    this.setData({
      hidden: false,
    });
  },
  confirm: function () {
    this.setData({
      hidden: true,
    });
  },
  PhoneCall1: function () {
    wx.makePhoneCall({
      phoneNumber: '021-62477965',
      success: function () {
        //console.log("成功拨打电话")
      }
    })
  },
  PhoneCall2: function () {
    wx.makePhoneCall({
      phoneNumber: '021-62474272',
      success: function () {
        //console.log("成功拨打电话")
      }
    })
  },
  to_wjx: function () {
    wx.navigateToMiniProgram({
      appId: app.globalData.wjx_ID,
      path: 'pages/wjxqList/wjxqList?activityId=25480946',
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        console.log("跳转成功")
      },
      fail(res) {
        
      }
    })
  },
})