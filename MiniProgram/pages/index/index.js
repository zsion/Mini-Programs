// page/home.js
var app = getApp();
const util = require('../../util/util.js');

const GetKeywords_Drug = require('../../config').Index.GetKeywords_Drug
const GetKeywords_Company = require('../../config').Index.GetKeywords_Company
const GetRank_CDE = require('../../config').Zgsb.GetRank
const GetRank_CFDA = require('../../config').Zgss.GetRank
const GetRank_TOP = require('../../config').Index.GetSalesRank
const GetUpdateTime = require('../../config').Sales.GetUpdateTime

//图片地址管理
var url_array = {
  logo : app.globalData.imgUrl + '/img/home/logo.png', //logo图片
  bg : app.globalData.imgUrl + '/img/home/bg.png' //点这里的小灯
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Islock: "",
    imgUrl: url_array,
    scrollTop: 0,
    hidden: true,
    modal_title: ["全球在研", "全球上市", "中国临床", "全球临床", "全球销售", "GMP认证", "药品中标", "医保目录"],
    modal_content: ["该模块涵盖了全球50000多个非仿制药的基本信息以及靶点适应证关系等", 
    "该模块涵盖了全球主要国家（美国/欧盟/日本/加拿大/印度等）批准上市的2000多个通用名药物的基本信息", 
    "该模块涵盖了自2013年起中国批准临床的近6000个试验的基本信息",
    "该模块涵盖了全球多个国家几十万条临床试验的基本信息", 
    "该模块涵盖了自2008年起全球2000多个通用名药物的销售量和销售额", 
    "该模块涵盖了多个国际GMP认证的多个企业的基本信息", 
    "该模块涵盖了自2008年起全国31个地区及军区部队的10000多个通用名药物的招标采购信息",
    "该模块涵盖了国家及各地方最新版目录的6000多个通用名药物的基本信息"],
    title_index:0,
    content_index:0,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    currentsTab: 0,
    Keywords: [],
    Keywords_Company:[],
    CDE_List: [],
    CFDA_List: [],
    TOP_List: [],
    search_Con0:"",
    search_Con1:"",
    last_date: "",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.load_data()
  },

  load_data:function(){
    //请求热门藥品搜索词
    var param1 = {};
    param1.url = GetKeywords_Drug;
    var paramData1 = {};
    param1.data = paramData1;
    param1.success = this.successGetKeywords_Drug;
    param1.method = "GET";
      param1.param = {};
    util.NetRequest(param1);
    //请求热门公司搜索词
    var param5 = {};
    param5.url = GetKeywords_Company;
    var paramData5 = {};
    param5.data = paramData5;
    param5.success = this.successGetKeywords_Company;
    param5.method = "GET";
      param5.param = {};
    util.NetRequest(param5);
    //请求CDE最新受理
    var param2 = {};
    param2.url = GetRank_CDE;
    var paramData2 = {};
    param2.data = paramData2;
    param2.success = this.successGetRank_CDE;
    param2.method = "GET";
      param2.param = {};
    util.NetRequest(param2);
    //请求CFDA最新生产批件
    var param3 = {};
    param3.url = GetRank_CFDA;
    var paramData3 = {};
    param3.data = paramData3;
    param3.success = this.successGetRank_CFDA;
    param3.method = "GET";
      param3.param = {};
    util.NetRequest(param3);
    //请求国内销售TOP20
    var param4 = {};
    param4.url = GetRank_TOP;
    var paramData4 = {};
    param4.data = paramData4;
    param4.success = this.successGetRank_TOP;
    param4.method = "GET";
      param4.param = {};
    util.NetRequest(param4);

    //获取数据库最后更新时间
    var param6 = {};
    param6.url = GetUpdateTime;
    var paramData6 = {};
    param6.data = paramData6;
    param6.success = this.successGetUpdateTime;
    param6.method = "GET";
      param6.param = {};
    util.NetRequest(param6);
  },

  successGetKeywords_Drug: function(result, param) {
    this.setData({
      Keywords: result.Data
    })
  },
  successGetKeywords_Company: function (result, param) {
    this.setData({
      Keywords_Company: result.Data
    })
  },
  successGetRank_CDE: function(result, param) {
    //console.log(result)
    this.setData({
      CDE_List: result.Data
    })
  },
  successGetRank_CFDA: function(result, param) {
    //console.log(result)
    this.setData({
      CFDA_List: result.Data
    })
  },
  successGetRank_TOP: function(result, param) {
    //console.log(result)
    this.setData({
      TOP_List: result.Data
    })
  },
  successGetUpdateTime: function (result, param) {
    //console.log(result.Data)
    this.setData({
      last_date: result.Data
    })
  },

  //监听屏幕滚动 判断上下滚动  
  onPageScroll: function(ev) {
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
      wx.setNavigationBarTitle({
        title: ''
      })
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动   
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //console.log('向下滚动');
      wx.setNavigationBarTitle({
        title: '药分享'
      })
    } else {

    }
    //给scrollTop重新赋值    
    setTimeout(function() {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.Islock == true) {
      if (wx.getStorageSync('lockinfo').information != ""){
        wx.showModal({
          title: '温馨提示',
          content: wx.getStorageSync('lockinfo').information,
          showCancel: false
        });
      }
    }
    this.setData({
      Islock: app.globalData.Islock,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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

  show_modal:function(e){
    // console.log(e)
    // console.log(e.currentTarget.dataset.content)
    this.setData({
      hidden: false,
      title_index: e.detail.title_index,
      content_index: e.detail.content_index,
    });
  },
  confirm: function () {
    this.setData({
      hidden: true,
    });
  },
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.dataset.id;
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },  
  
  //第二个点击切换 
  tabNavs: function(e) {
    if (this.data.currentsTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentsTab: e.target.dataset.current,
        //isShow: showMode
      })
    }
  },
  //第二个滑动切换
  swiperTabs: function(e) {
    var that = this;
    that.setData({
      currentsTab: e.detail.current
    });
  },

  search_Con0_Input: function (e) {
    this.setData({
      search_Con0: e.detail.value
    })
  },
  search_Con1_Input: function (e) {
    this.setData({
      search_Con1: e.detail.value
    })
  },
  to_search0: function (e) {
    if (this.data.search_Con0.trim() != ""){
      wx.navigateTo({
        url: "/pages/all/list?search_Type=0&search_Con=" + encodeURIComponent(this.data.search_Con0)
      })
    }else{
      wx.showToast({
        title: '请输入药品名称',
        icon: 'none',
        duration: 2000
      });
    }
  },
  to_search1: function (e) {
    if(this.data.search_Con1.trim() != ""){
      wx.navigateTo({
        url: "/pages/all/list?search_Type=1&search_Con=" + encodeURIComponent(this.data.search_Con1)
      })
    }else{
      wx.showToast({
        title: '请输入企业名称',
        icon: 'none',
        duration: 2000
      });
    }
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