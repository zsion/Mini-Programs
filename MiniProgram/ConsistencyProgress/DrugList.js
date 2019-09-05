// ConsistencyProgress//DrugList.js
var app = getApp();
const util = require('../util/util.js');

const GetCond2Info_Drug = require('../config').ConsistencyProgress.GetCond2Info_Drug
const GetList_Drug = require('../config').ConsistencyProgress.GetList_Drug

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content_height: wx.getSystemInfoSync().windowHeight - 40,

    Toogle_progress: false,
    Toogle_progress_detail: false,

    address_sort: GetCond2Info_Drug,//组件-排序组件地址
    Total: "--",//组件-显示条数
    options_object: {},//从其它页面带过来的参数
    
    Sent_Sort: "",
    
    topNum: 0,//置顶使用

    is_search_1st: true,
    is_search_2nd: false,
    is_changepage: false,

    page: 0,
    Maxpage: 39,//39

    cond_2nd: {},

    logid: "",
    return_list: [],

    have_more: true,
    con_null: false,

    According: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.search_Type != undefined) {
      if (options.search_Type == 0) {
        this.setData({
          options_object: {
            O_DrugName: (options.search_Con != undefined) ? decodeURIComponent(options.search_Con) : "",
          }
        })
      } else if (options.search_Type == 1) {
        this.setData({
          options_object: {
            O_CompanyName: (options.search_Con != undefined) ? decodeURIComponent(options.search_Con) : "",
          }
        })
      } else if (options.search_Type == 2) {
        this.setData({
          options_object: {
            O_ATCCategory01: (options.O_ATCCategory01 != undefined) ? decodeURIComponent(options.O_ATCCategory01) : "",
            O_ATCCategory02: (options.O_ATCCategory02 != undefined) ? decodeURIComponent(options.O_ATCCategory02) : "",
            O_ATCCategory03: (options.O_ATCCategory03 != undefined) ? decodeURIComponent(options.O_ATCCategory03) : "",
            O_ATCCategory04: (options.O_ATCCategory04 != undefined) ? decodeURIComponent(options.O_ATCCategory04) : "",
          }
        })
      } else if (options.search_Type == 3) {
        this.setData({
          options_object: {
            O_Category: (options.O_Category != undefined) ? decodeURIComponent(options.O_Category) : "",
            O_SubCategory: (options.O_SubCategory != undefined) ? decodeURIComponent(options.O_SubCategory) : "",
          }
        })
      }
    } else {
      this.setData({
        options_object: {
          GenericName: (options.GenericName != undefined) ? decodeURIComponent(options.GenericName) : "",//药品通用名
          HighestProcessId: (options.HighestProcessId != undefined) ? options.HighestProcessId : "",//最高进程
          IsVariety289: (options.IsVariety289 != undefined) ? options.IsVariety289 : "",//289目录品种
          NumberNeedEvaluate_Start: (options.NumberNeedEvaluate_Start != undefined) ? options.NumberNeedEvaluate_Start : "",//需评价企业数开始
          NumberNeedEvaluate_End: (options.NumberNeedEvaluate_End != undefined) ? options.NumberNeedEvaluate_End : "",//需评价企业数结束
          NumberApproval_Start: (options.NumberApproval_Start != undefined) ? options.NumberApproval_Start : "",//申报企业数开始
          NumberApproval_End: (options.NumberApproval_End != undefined) ? options.NumberApproval_End : "",//申报企业数结束
          NumberPass_Start: (options.NumberPass_Start != undefined) ? options.NumberPass_Start : "",//通过企业数开始
          NumberPass_End: (options.NumberPass_End != undefined) ? options.NumberPass_End : "",//通过企业数结束
          FirstUndertakeDate_Start: (options.FirstUndertakeDate_Start != undefined) ? options.FirstUndertakeDate_Start : "",//首次承办时间开始
          FirstUndertakeDate_End: (options.FirstUndertakeDate_End != undefined) ? options.FirstUndertakeDate_End : "",//首次承办时间结束
          FirstApprovalDate_Start: (options.FirstApprovalDate_Start != undefined) ? options.FirstApprovalDate_Start : "",//首次批准时间开始
          FirstApprovalDate_End: (options.FirstApprovalDate_End != undefined) ? options.FirstApprovalDate_End : "",//首次批准时间结束
          ATCCategoryId01: (options.ATCCategoryId01 != undefined) ? decodeURIComponent(options.ATCCategoryId01) : "",
          ATCCategoryId02: (options.ATCCategoryId02 != undefined) ? decodeURIComponent(options.ATCCategoryId02) : "",
          ATCCategoryId03: (options.ATCCategoryId03 != undefined) ? decodeURIComponent(options.ATCCategoryId03) : "",
          ATCCategoryId04: (options.ATCCategoryId04 != undefined) ? decodeURIComponent(options.ATCCategoryId04) : "",
          CategoryId: (options.CategoryId != undefined) ? decodeURIComponent(options.CategoryId) : "",
          SubCategoryId: (options.SubCategoryId != undefined) ? decodeURIComponent(options.SubCategoryId) : "",
        }
      })
    }
    this.Load_List();//加载列表
  },

  //加载列表
  Load_List: function () {
    this.setData({
      cond_2nd: {
        sort: this.data.Sent_Sort,
      }
    });

    //取得列表
    var param2 = {};
    param2.url = GetList_Drug;
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
        result.Data.list.forEach(function (values, indexs, arrays) {
          values.open = false //初始值默认关闭
        }, this);
        this.setData({
          topNum: 0,
          logid: result.Data.logid,
          Total: result.Data.total,
          con_null: false,
          have_more: true,
          return_list: result.Data.list,
        });
      } else {
        this.setData({
          return_list: [],
          Total: 0,
          con_null: true,
        })
      }
    } else {
      if (this.data.have_more == true) {
        var return_list = this.data.return_list;
        if (result.Data.list != null) {
          for (var i = 0; i < result.Data.list.length; i++) {
            result.Data.list[i].open = false
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
    this.sort_DrugList = this.selectComponent('#sort_DrugList');
    this.WarningCode = this.selectComponent('#WarningCode');
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
  onShareAppMessage: function () {

  },

  Get_Change_item: function (e) {
    this.setData({
      Sent_Sort: e.detail,//获得排序组件的返回值
      is_search_1st: false,
      is_search_2nd: true,
      is_changepage: false,
      page: 0,
    });
    this.Load_List();//加载列表
  },

  Item_toggle: function (e) {
    if (this.sort_DrugList.data.Toggle_hide == false){
      this.sort_DrugList.Item_toggle();//关闭排序弹窗
    }
  },

  Dosage_toogle: function (e) {
    this.data.return_list.forEach(function (values, indexs, arrays) {
      if (indexs == e.currentTarget.dataset.index) {
        values.open = !values.open
      } else {
        values.open = false
      }
    }, this);
    this.setData({
      return_list: this.data.return_list,
    })
  },

  Get_Show_WarningCode: function (e) {
    this.setData({
      According: false,
      Message: e.detail.Message,
      Type: e.detail.Data.type,
      Img: e.detail.Data.code,
    });
    this.WarningCode.Init_WarningCode();
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
      this.Load_List(); //加载列表
    }
  },

})