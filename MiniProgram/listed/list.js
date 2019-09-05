var app = getApp();
const util = require('../util/util.js');

const GetList = require('../config').Zgss.GetList //国产药品

//图片地址管理
var url_array = new Array(
  app.globalData.imgUrl + '/img/zgxs/1.png', //白色的搜索按钮
)

Page({
  data: {
    imgUrl: url_array,
    search_Con:"",
    type:0,
    is_changepage: false,
    page: 0,
    moment_list:[],
    have_more:true,
    con_null: false,
    Maxpage: 99,//99
  },

  onLoad: function () {
    this.Load_data()
  },

  Load_data:function(){
    //中国上市
    var param1 = {};
    param1.url = GetList;
    var paramData1 = {};
    paramData1.keywords = this.data.search_Con;
    paramData1.type = this.data.type;
    paramData1.page = this.data.page;
    paramData1.is_changepage = (this.data.page != 0) ? true : false;
    param1.data = paramData1;
    param1.success = this.SuccessGetList;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },
  
  SuccessGetList: function (result, param) {
    if (this.data.page == 0) {
      if (result.Data.length != 0) {
        this.setData({
          moment_list: result.Data,
          con_null: false
        })
      }else{
        this.setData({
          moment_list: [],
          con_null: true
        })
      }
    }else{
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
      
    }

    this.data.page++

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
    if (this.data.is_changepage == true) {
      this.Load_more(); //列表翻页
    } else {
      this.Load_data(); //加载列表
    }
  },

  search_Con_Input: function (e) {
    this.setData({
      search_Con: e.detail.value
    })
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
    this.Load_data(); //加载列表
  },

  Load_more:function(){
    if (this.data.page >= this.data.Maxpage) {
      wx.showModal({
        title: '温馨提示',
        content: "页面已经无法显示更多数据，您可以尝试换个筛选条件！",
        showCancel: false
      });
    } else {
      if (this.data.have_more == true) {
        this.setData({
          is_changepage: true,
        });
        this.Load_data();
      }
    }
  },

  onReachBottom: function () {
    this.Load_more(); //列表翻页
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

})
