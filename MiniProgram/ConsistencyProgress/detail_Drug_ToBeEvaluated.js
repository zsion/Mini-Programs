// ConsistencyProgress//detail_Drug_ToBeEvaluated.js
var app = getApp();
const util = require('../util/util.js');

const GetCond2Info_Drug_NeedEvaluate = require('../config').ConsistencyProgress.GetCond2Info_Drug_NeedEvaluate
const GetList_Drug_NeedEvaluate = require('../config').ConsistencyProgress.GetList_Drug_NeedEvaluate

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    Isbind: "",
    Modal_hidden: true,
    Width_Array: [{ Width: 25 }, { Width: 35 }, { Width: 40 }],
    Name_Array: [],
    Tool_Name_Array: [],

    content_height: wx.getSystemInfoSync().windowHeight - 40,

    options_object: {},//从其它页面带过来的参数

    Sent_DosageId: [],
    Sent_CompanyNameRank: [],
    Sent_Status: [],

    topNum: 0,//置顶使用

    is_search_1st: true,
    is_search_2nd: false,
    is_changepage: false,

    page: 0,
    Maxpage: 37,//37

    cond_2nd: {},

    logid: "",
    total: "--",
    return_list: [],

    have_more: true,
    con_null: false,

    According: true,

    Target: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options_object: {
        SubstanceDrug: (options.SubstanceDrug != undefined) ? options.SubstanceDrug : "",//药品名
        Dosage: (options.Dosage != undefined) ? options.Dosage : "",//剂型
      }
    })
    this.Load_Cond2Info(); //取得二次筛选项
    this.Load_List();//加载列表
  },

  //取得二次筛选项
  Load_Cond2Info: function () {
    this.setData({
      cond_2nd: {
        DosageId: this.data.Sent_DosageId,
        CompanyNameRank: this.data.Sent_CompanyNameRank,
        Status: this.data.Sent_Status,
      }
    });

    var param1 = {};
    param1.url = GetCond2Info_Drug_NeedEvaluate;
    var paramData1 = {};
    paramData1.type = -1;
    paramData1.pkey = "";
    paramData1.cond_1st = this.data.options_object;
    paramData1.cond_2nd = this.data.cond_2nd;
    paramData1.is_search_1st = this.data.is_search_1st;
    paramData1.is_search_2nd = this.data.is_search_2nd;
    param1.data = paramData1;
    param1.success = this.Success_GetCond2Info;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  Success_GetCond2Info: function (result, param) {
    //外层循环tab选项
    result.Data.forEach(function (value, index, array) {
      value.Open = false //外层循环tab选项，初始值默认关闭
      value.Width = this.data.Width_Array[index].Width //外层循环tab选项，设置tab选项宽度

      //内层循环items（具体的选项）
      value.items.forEach(function (values, indexs, arrays) {
        values.open = false //内层循环items（具体的选项），初始值默认关闭
      }, this);
      //4个IF渲染选中状态的选项
      if (value.type == 0) {
        for (var j = 0; j < this.data.Sent_DosageId.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_DosageId[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      } else if (value.type == 1) {
        for (var j = 0; j < this.data.Sent_CompanyNameRank.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_CompanyNameRank[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      } else if (value.type == 2) {
        for (var j = 0; j < this.data.Sent_Status.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_Status[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      }
    }, this);
    this.setData({
      Name_Array: result.Data,
      Tool_Name_Array: result.Data,
    });
  },

  Show_WarningCode: function (result, param) {
    this.setData({
      According: false,
      Message: result.Message,
      Type: result.Data.type,
      Img: result.Data.code,
    });
    this.WarningCode.Init_WarningCode();
  },

  Get_WarningCode: function (e) {
    this.setData({
      According: true,
    });
    if (this.data.is_changepage == true) {
      this.Load_more(); //列表翻页
    } else {
      this.Load_Cond2Info(); //取得二次筛选项
      this.Load_List(); //加载列表
    }
  },

  //加载列表
  Load_List: function () {
    this.setData({
      cond_2nd: {
        DosageId: this.data.Sent_DosageId,
        CompanyNameRank: this.data.Sent_CompanyNameRank,
        Status: this.data.Sent_Status,
      }
    });

    //取得列表
    var param2 = {};
    param2.url = GetList_Drug_NeedEvaluate;
    var paramData2 = {};

    paramData2.cond_1st = this.data.options_object;
    paramData2.cond_2nd = this.data.cond_2nd;
    paramData2.page = this.data.page;
    paramData2.is_search_1st = (this.data.is_changepage == true) ? false : this.data.is_search_1st;
    paramData2.is_search_2nd = (this.data.is_changepage == true) ? false : this.data.is_search_2nd;
    paramData2.is_changepage = (this.data.page != 0) ? true : false;
    paramData2.logid = this.data.logid;

    param2.data = paramData2;
    param2.success = this.Success_GetList;
    param2.show_WarningCode = this.Show_WarningCode;
    param2.method = "POST";
    param2.param = {};
    util.NetRequest(param2);
  },

  Success_GetList: function (result, param) {
    //console.log(result.Data.list)
    if (this.data.page == 0) {
      if (result.Data.list != null) {
        this.setData({
          topNum: 0,
          logid: result.Data.logid,
          total: result.Data.total,
          con_null: false,
          have_more: true,
          return_list: result.Data.list,
        });
      } else {
        this.setData({
          return_list: [],
          total: 0,
          con_null: true,
        })
      }
    } else {
      if (this.data.have_more == true) {
        var return_list = this.data.return_list;
        if (result.Data.list != null) {
          for (var i = 0; i < result.Data.list.length; i++) {
            return_list.push(result.Data.list[i]);
          }
          // 设置数据
          this.setData({
            return_list: this.data.return_list,
          })
        } else {
          this.setData({
            have_more: false
          })
        }
      } else {
        this.setData({
          have_more: false
        })
      }
    }
    this.data.page++
  },

  //触底加载更多函数
  Load_more: function () {
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
        this.Load_List();//加载列表
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').ConsistencyProgress,
      Target: wx.getStorageSync('auth').Listed,
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

  //监听组件展开/收起状态-控制列表显示/隐藏
  Get_Name_Array: function (e) {
    this.setData({
      Name_Array: e.detail,
      According: !e.detail.some((v, i) => (v.Open == true)),//阻止scroll-view穿透
    });
  },

  //组件点击确定按钮-重新加载二次筛选项
  Get_Field: function (e) {
    this.setData({
      According: true,//阻止scroll-view穿透
      is_search_1st: false,
      is_search_2nd: true,
      is_changepage: false,
      page: 0,
    });
    let Use_array = []
    e.detail.Field_Array.forEach(function (value, index, array) {
      Use_array.push(value.item_val)
    }, this);
    if (e.detail.Field_Type == 0) {
      this.setData({
        Sent_DosageId: Use_array,
      });
    } else if (e.detail.Field_Type == 1) {
      this.setData({
        Sent_CompanyNameRank: Use_array,
      });
    } else if (e.detail.Field_Type == 2) {
      this.setData({
        Sent_Status: Use_array,
      });
    }
    this.Load_Cond2Info();//取得二次筛选项
    this.Load_List();//加载列表
  },

  //组件点击重置按钮-重新加载二次筛选项
  Get_Reset: function (e) {
    this.setData({
      According: true,//阻止scroll-view穿透
      is_search_1st: false,
      is_search_2nd: true,
      is_changepage: false,
      page: 0,
    });
    if (e.detail == 0) {
      this.setData({
        Sent_DosageId: [],
      });
    } else if (e.detail == 1) {
      this.setData({
        Sent_CompanyNameRank: [],
      });
    } else if (e.detail == 2) {
      this.setData({
        Sent_Status: [],
      });
    }
    this.Load_Cond2Info(); //取得二次筛选项
    this.Load_List();//加载列表
  },

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },

})