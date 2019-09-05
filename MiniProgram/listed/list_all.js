var app = getApp();
const util = require('../util/util.js');

const GetList = require('../config').Zgss.GetList //国产药品

Page({
  data: {
    search_Con:"",
    type:0,
    page: 0,
    moment_list:[],
    have_more:true,
    con_null: false,
    Maxpage: 99,//99
  },

  onLoad: function (options) {
    //console.log(options.search_Con)
    this.setData({
      search_Con: decodeURIComponent(options.search_Con) || options.ATC4 || options.ATC3 || options.ATC2 || options.ATC1 || options.zlxl || options.zldl,
    })
    //中国上市
    var param1 = {};
    param1.url = GetList;
    var paramData1 = {};
    paramData1.keywords = this.data.search_Con;
    paramData1.type = this.data.type;
    paramData1.page = this.data.page;
    param1.data = paramData1;
    param1.success = this.successGetList;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },
  successGetList: function (result, param) {
    //console.log(result.Data);
    if (result.Data.length != 0) {
      this.setData({
        moment_list: result.Data,
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

  tab_touch0: function () {
    //console.log(this.data.total)
    this.setData({
      type: 0,
    })
    this.search_data()
  },
  tab_touch1: function () {
    //console.log(this.data.total1)
    this.setData({
      type: 1,
    })
    this.search_data()
  },

  search_data: function () {
    this.setData({
      page: 0,
      have_more: true,
      moment_list: [],
    })
    var param3 = {};
    param3.url = GetList;
    var paramData3 = {};
    paramData3.keywords = this.data.search_Con;
    paramData3.type = this.data.type;
    paramData3.page = this.data.page;
    param3.data = paramData3;
    param3.success = this.successGetList;
    param3.show_WarningCode = this.Show_WarningCode;
    param3.method = "POST";
    param3.param = {};
    util.NetRequest(param3);
  },


  onReachBottom: function () {
    if (this.data.page >= this.data.Maxpage) {
      wx.showModal({
        title: '温馨提示',
        content: "页面已经无法显示更多数据，您可以尝试换个筛选条件！",
        showCancel: false
      });
    } else {
      if (this.data.have_more == true) {
        var param2 = {};
        param2.url = GetList;
        var paramData2 = {};
        paramData2.keywords = this.data.search_Con;
        paramData2.type = this.data.type;
        paramData2.page = this.data.page;
        param2.data = paramData2;
        param2.success = this.successGetList2;
        param2.show_WarningCode = this.Show_WarningCode;        
        param2.method = "POST";
        param2.param = {};
        util.NetRequest(param2);
      }
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

  successGetList2: function (result, param) {
    if(this.data.have_more == true){
      
      var moment_list = this.data.moment_list;

      if (result.Data.length > 0) {
        for (var i = 0; i < result.Data.length; i++) {
          moment_list.push(result.Data[i]);
        }
        // 设置数据
        this.setData({
          moment_list: this.data.moment_list
        })
      } else {
        this.setData({
          have_more: false
        })
      }
      
    }else{
      this.setData({
        have_more: false
      })
    }
    this.data.page++
  },


})
