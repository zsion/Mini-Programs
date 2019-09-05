var app = getApp();
const util = require('../util/util.js');

const GetTotalInfo = require('../config').Sales.GetTotalInfo

Page({
  data: {
    alpha: '',
    windowHeight: '',
    search_Type:"",
    search_Con:"",
    show0: true,
    show1: true,
    show3: true,
    show4: true,
    show_Type0: true,
    show_Type1: false,
    send_search_Type:"",
    total:"",
    list: [],
    total1: "",
    list1: [],
    total2: "",
    list2: [],
    data_length:"",
    con_null: false,
    All_options: {},
  },
  onLoad: function (options){
    
    this.setData({
      All_options: options,
      search_Type: options.search_Type,
      search_Con: decodeURIComponent(options.search_Con) || options.ATC4 || options.ATC3 || options.ATC2 || options.ATC1 || options.zlxl || options.zldl,
    })

    this.Auto_load(options)
    
  },

  Auto_load: function (options) {
    //请求统计页-关键字查询字典信息
    var param1 = {};
    param1.url = GetTotalInfo;
    var paramData1 = {};
    paramData1.keywords = decodeURIComponent(options.search_Con);
    paramData1.type = options.search_Type;
    param1.data = paramData1;
    param1.success = this.successGetTotalInfo;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
    try {
      var res = wx.getSystemInfoSync()
      this.pixelRatio = res.pixelRatio;
      // this.apHeight = 32 / this.pixelRatio;
      // this.offsetTop = 160 / this.pixelRatio;
      this.apHeight = 16;
      this.offsetTop = 80;
      this.setData({ windowHeight: (res.windowHeight - 60) + 'px' })
    } catch (e) {

    }
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
  },
  successGetTotalInfo: function (result, param) {
    //console.log(result.Data)
    if (result.Data.length == 0){
      this.setData({
        search_Type: 2,
        total: 0,
        con_null: true
      })
    }else{
      if (this.data.search_Type == 0) {
        this.setData({
          show0: true,
          show1: false,
          total: result.Data[0].total,
          list: result.Data[0].list,
          send_search_Type:0,
        })
      } else if (this.data.search_Type == 1) {
        this.setData({
          show0: false,
          show1: true,
          total: result.Data[0].total,
          list: result.Data[0].list,
          send_search_Type:1,
        })
      } else if (this.data.search_Type == -1) {
        if (result.Data.length == 1) {
          this.setData({
            data_length: 1,
            total: result.Data[0].total,
            list: result.Data[0].list,
          })
          if (result.Data[0].type == 0) {
            this.setData({
              show3: true,
              show4: false,
              send_search_Type: 0,
            })
          } else{
            this.setData({
              show3: false,
              show4: true,
              send_search_Type: 1,
            })
          }
        } else if (result.Data.length == 2) {
          this.setData({
            data_length: 2,
            total1: result.Data[0].total,
            list1: result.Data[0].list,
            total2: result.Data[1].total,
            list2: result.Data[1].list,
          })
          this.tab_touch0()
        }
      }
    }
  },

  tab_touch0: function () {
    //console.log(this.data.total)
    this.setData({
      show_Type0: true,
      show_Type1: false,
      total: this.data.total1,
      list: this.data.list1,
      send_search_Type: 0,
    })
  },
  tab_touch1: function () {
    //console.log(this.data.total1)
    this.setData({
      show_Type0: false,
      show_Type1: true,
      total: this.data.total2,
      list: this.data.list2,
      send_search_Type: 1,
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

  handlerAlphaTap(e) {
    let { ap } = e.target.dataset;
    if({ap}.ap != undefined){
      this.setData({
        alpha: ap
      });
    }
  },
  handlerMove(e) {
    let { list } = this.data;
    let moveY = e.touches[0].clientY;
    let rY = moveY - this.offsetTop;
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({ alpha: nonwAp.first });
      }
    }
  }
})


