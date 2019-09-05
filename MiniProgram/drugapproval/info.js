var app = getApp();
const util = require('../util/util.js');

var AcceptanceNo="";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    Isbind: "",
    Modal_hidden: true,
    windowHeight: "",
    Declaration: 0,
    item: {},
    TipShow:{
      hidden:true,
    },
    All_options: {},
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      All_options: options,
    })
    AcceptanceNo = options.AcceptanceNo; 
    try {
      var res = wx.getSystemInfoSync()
      this.setData({ windowHeight: (res.windowHeight - 45) + 'px' })
    } catch (e) {

    }
    this.Auto_load(options)
    
  },

  Auto_load: function (options) {
    var param1 = {};
    param1.url = "/api/DrugApproval/GetInfo";
    var paramData1 = {};
    paramData1.AcceptanceNo = options.AcceptanceNo;
    param1.data = paramData1;
    param1.success = this.successGetInfo;
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
  successGetInfo: function(data,param){
    var BaseInfo = data.Data;
    BaseInfo.TimeLine = JSON.parse(BaseInfo.TimeLine);
    // 时间轴的处理
    var tt = 0;
    var bb = 0;
    var cnum = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

    BaseInfo.TimeLine.sort(function (a, b) {
      return Date.parse(a.Mark) - Date.parse(b.Mark);//时间正序
    });
    for (var i = 0; i < BaseInfo.TimeLine.length; i++) {

      if (BaseInfo.TimeLine[i].Type == "SupplementEnter") {
        tt = tt + 1;
      }
    }

    var threeinone = 0;
    for (var i = 0; i < BaseInfo.TimeLine.length; i++) {
      BaseInfo.TimeLine[i].Mark = this.formatDate(BaseInfo.TimeLine[i].Mark);
      if (BaseInfo.TimeLine[i].Type == "UndertakeDate") {
        BaseInfo.TimeLine[i].Name = "CDE承办";
      } else if (BaseInfo.TimeLine[i].Type == "NewEnter") {
        BaseInfo.TimeLine[i].Name = "新报任务";
        BaseInfo.TimeLine[i].NameType = "进入审评序列";
      } else if (BaseInfo.TimeLine[i].Type == "SendNotification") {
        BaseInfo.TimeLine[i].Name = "CDE送达通知";
      } else if (BaseInfo.TimeLine[i].Type == "SelfCheckDate") {
        BaseInfo.TimeLine[i].Name = "进入SFDA药物临床试验数据自查核查公告";
      } else if (BaseInfo.TimeLine[i].Type == "PublishDate") {
        BaseInfo.TimeLine[i].Name = "进入CFDI药物临床试验数据现场核查计划公告";
      } else if (BaseInfo.TimeLine[i].Type == "NewExit") {
        BaseInfo.TimeLine[i].Name = "离开新报评审队列";
      } else if (BaseInfo.TimeLine[i].Type == "SupplementEnter") {
        if (tt > 1) {
          BaseInfo.TimeLine[i].Name = "补充资料任务第" + cnum[bb] + "轮";
          bb = bb + 1;
        } else {
          BaseInfo.TimeLine[i].Name = "补充资料任务";
        }
        BaseInfo.TimeLine[i].NameType = "进入评审队列";
      } else if (BaseInfo.TimeLine[i].Type == "SupplementExit") {
        BaseInfo.TimeLine[i].Name = "离开补充评审队列";
      } else if (BaseInfo.TimeLine[i].Type == "ConsistencyNewEnter") {
        BaseInfo.TimeLine[i].Name = "一致性评价任务";
        BaseInfo.TimeLine[i].NameType = "进入新报队列";
      } else if (BaseInfo.TimeLine[i].Type == "ConsistencyNewExit") {
        BaseInfo.TimeLine[i].Name = "离开一致性评审队列";
      } else if (BaseInfo.TimeLine[i].Type == "ConsistencySupplementEnter") {
        BaseInfo.TimeLine[i].Name = "一致性评价补充任务";
        BaseInfo.TimeLine[i].NameType = "一致性评价补充任务";
      } else if (BaseInfo.TimeLine[i].Type == "ConsistencySupplementExit") {
        BaseInfo.TimeLine[i].Name = "离开一致性补充队列";
      } else if (BaseInfo.TimeLine[i].Type == "SiteInspectionApplication") {
        if (threeinone == 0) {
          BaseInfo.TimeLine[i].TypeAdd = "triangle";
        }
        threeinone = threeinone + 1;
        BaseInfo.TimeLine[i].Name = "受理企业现场检查申请";
      } else if (BaseInfo.TimeLine[i].Type == "OnsiteInspection") {
        if (threeinone == 0) {
          BaseInfo.TimeLine[i].TypeAdd = "triangle";
        }
        threeinone = threeinone + 1;
        BaseInfo.TimeLine[i].Name = "通知生产现场检查";
      } else if (BaseInfo.TimeLine[i].Type == "ThreeInOneDate") {
        BaseInfo.TimeLine[i].Name = BaseInfo.TimeLine[i].Content;
      }

      if (BaseInfo.TimeLine[i].Type == "NewEnter" || BaseInfo.TimeLine[i].Type == "SupplementEnter" || BaseInfo.TimeLine[i].Type == "ConsistencyNewEnter" || BaseInfo.TimeLine[i].Type == "ConsistencySupplementEnter") {
        for (var t = 0; t < BaseInfo.TimeLine[i].Content.EnterQueues.length; t++) {
          if (BaseInfo.TimeLine[i].Content.EnterQueues[t].DrugType == null) {
            BaseInfo.TimeLine[i].Content.EnterQueues[t].DrugType = "";
          } else {
            BaseInfo.TimeLine[i].Content.EnterQueues[t].DrugType = BaseInfo.TimeLine[i].Content.EnterQueues[t].DrugType + "/";
          }
        }
      }

    }
    this.setData({
      "item": BaseInfo,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').DrugApproval,
      Isbind: wx.getStorageSync('isbind'),
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  //所有tab的切换
  swiperNav: function (e) {
    var Name = e.currentTarget.dataset.name;
    var current = e.currentTarget.dataset.current;
    var ctrl = this.data[Name];
    if (ctrl == current) {
      return false;
    } else {
      this.setData({
        [Name]: current,
      })
    }
  },
  //所有tab的滑动
  swiperTerm: function (e) {
    var Name = e.currentTarget.dataset.name;
    this.setData({
      [Name]: e.detail.current
    });
  },
  ShowTip: function () {
    this.setData({
      "TipShow.hidden": (!this.data.TipShow.hidden),
    });
  },
  //点击查看详情
  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },
  //对日期进行更改
  formatDate:function(date) {
   
    if (date != null && date != "-" && date != "") {
      var date = new Date(date);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    } 
}
})
