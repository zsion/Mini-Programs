// ClinicalRegistration//list.js
var app = getApp();
const util = require('../util/util.js');

const GetCond2Info = require('../config').ClinicalRegistration.GetCond2Info
const GetList = require('../config').ClinicalRegistration.GetList

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    Isbind: "",
    Modal_hidden: true,
    Width_Array: [{ Width: 24 }, { Width: 24 }, { Width: 22 }, { Width: 30}],
    Name_Array: [],
    Tool_Name_Array: [],
    
    content_height: wx.getSystemInfoSync().windowHeight - 40,
    
    options_object: {},//从其它页面带过来的参数

    TestStateId: [],
    TestStagingId: [],
    IsBeTestRecord: [],
    ApplicantNameRank: [],

    Sent_TestStateId: [],
    Sent_TestStagingId: [],
    Sent_IsBeTestRecord: [],
    Sent_ApplicantNameRank: [],

    topNum: 0,//置顶使用

    is_search_1st: true,
    is_search_2nd: false,
    is_changepage: false,
    
    page: 0,
    Maxpage: 37,//37

    cond_2nd: {},

    logid: "",
    total: "",
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
          DrugName: (options.DrugName != undefined) ? decodeURIComponent(options.DrugName) : "",
          ApplicantName: (options.ApplicantName != undefined) ? decodeURIComponent(options.ApplicantName) : "",
          Indications: (options.Indications != undefined) ? decodeURIComponent(options.Indications) : "",
          Dosage: (options.Dosage != undefined) ? decodeURIComponent(options.Dosage) : "",
          DrugTypeId: (options.DrugTypeId != undefined) ? decodeURIComponent(options.DrugTypeId) : "",
          DrugHighestPhase: (options.DrugHighestPhase != undefined) ? decodeURIComponent(options.DrugHighestPhase) : "",
          ATCCategoryId01: (options.ATCCategoryId01 != undefined) ? decodeURIComponent(options.ATCCategoryId01) : "",
          ATCCategoryId02: (options.ATCCategoryId02 != undefined) ? decodeURIComponent(options.ATCCategoryId02) : "",
          ATCCategoryId03: (options.ATCCategoryId03 != undefined) ? decodeURIComponent(options.ATCCategoryId03) : "",
          ATCCategoryId04: (options.ATCCategoryId04 != undefined) ? decodeURIComponent(options.ATCCategoryId04) : "",
          CategoryId: (options.CategoryId != undefined) ? decodeURIComponent(options.CategoryId) : "",
          SubCategoryId: (options.SubCategoryId != undefined) ? decodeURIComponent(options.SubCategoryId) : "",          
          TestState: (options.TestState != undefined) ? decodeURIComponent(options.TestState) : "",
          TestStaging: (options.TestStaging != undefined) ? decodeURIComponent(options.TestStaging) : "",
          IsBeTestRecord: (options.IsBeTestRecord != undefined) ? decodeURIComponent(options.IsBeTestRecord) : "",
          TestType: (options.TestType != undefined) ? decodeURIComponent(options.TestType) : "",
          TestRange: (options.TestRange != undefined) ? decodeURIComponent(options.TestRange) : "",
          FundsSource: (options.FundsSource != undefined) ? decodeURIComponent(options.FundsSource) : "",
          DateTestPublictiy_Start: (options.DateTestPublictiy_Start != undefined) ? options.DateTestPublictiy_Start : "",
          DateTestPublictiy_End: (options.DateTestPublictiy_End != undefined) ? options.DateTestPublictiy_End : "",
          DateFirstCaseEnrollment_Start: (options.DateFirstCaseEnrollment_Start != undefined) ? options.DateFirstCaseEnrollment_Start : "",
          DateFirstCaseEnrollment_End: (options.DateFirstCaseEnrollment_End != undefined) ? options.DateFirstCaseEnrollment_End : "",
          DateTestEnd_Start: (options.DateTestEnd_Start != undefined) ? options.DateTestEnd_Start : "",
          DateTestEnd_End: (options.DateTestEnd_End != undefined) ? options.DateTestEnd_End : "",
          O_ConsistencyDump: (options.O_ConsistencyDump != undefined) ? options.O_ConsistencyDump : "",
        }
      })
    }

    this.Load_Cond2Info(); //取得二次筛选项
    this.Load_data();//加载列表

  },

  //取得二次筛选项
  Load_Cond2Info: function () {
    this.setData({
      cond_2nd: {
        TestStateId: this.data.Sent_TestStateId,
        TestStagingId: this.data.Sent_TestStagingId,
        IsBeTestRecord: this.data.Sent_IsBeTestRecord,
        ApplicantNameRank: this.data.Sent_ApplicantNameRank,
      }
    });

    var param1 = {};
    param1.url = GetCond2Info;
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

  Success_GetCond2Info: function (result, param){
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
        for (var j = 0; j < this.data.Sent_TestStateId.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_TestStateId[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      } else if (value.type == 1) {
        for (var j = 0; j < this.data.Sent_TestStagingId.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_TestStagingId[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      } else if (value.type == 2) {
        for (var j = 0; j < this.data.Sent_IsBeTestRecord.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_IsBeTestRecord[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      } else if (value.type == 3) {
        for (var j = 0; j < this.data.Sent_ApplicantNameRank.length; j++) {
          for (var k = 0; k < value.items.length; k++) {
            if (this.data.Sent_ApplicantNameRank[j] == value.items[k].item_val) {
              value.items[k].open = true
              break
            }
          }
        }
      }
    },this);
    this.setData({
      Name_Array: result.Data,
      Tool_Name_Array: result.Data,
    });
  },

  Show_WarningCode: function (result, param){
    this.setData({
      According: false,
      Message: result.Message,
      Type: result.Data.type,
      Img: result.Data.code,
    });
    this.WarningCode.Init_WarningCode();
  },

  Get_WarningCode:function(e){
    this.setData({
      According: true,
    });
    if (this.data.is_changepage == true){
      this.Load_more(); //列表翻页
    }else{
      this.Load_Cond2Info(); //取得二次筛选项
      this.Load_data(); //加载列表
    }
  },

  //加载列表
  Load_data: function () {
    this.setData({
      cond_2nd: {
        TestStateId: this.data.Sent_TestStateId,
        TestStagingId: this.data.Sent_TestStagingId,
        IsBeTestRecord: this.data.Sent_IsBeTestRecord,
        ApplicantNameRank: this.data.Sent_ApplicantNameRank,
      }
    });

    //取得列表
    var param2 = {};
    param2.url = GetList;
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

  Success_GetList:function(result, param){
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
        this.Load_data();//加载列表
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
      Power: wx.getStorageSync('auth').ClinicalRegistration,
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

  //监听组件展开/收起状态-控制列表显示/隐藏
  Get_Name_Array:function(e){
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
        Sent_TestStateId: Use_array,
      });
    } else if (e.detail.Field_Type == 1){
      this.setData({
        Sent_TestStagingId: Use_array,
      });
    } else if (e.detail.Field_Type == 2) {
      this.setData({
        Sent_IsBeTestRecord: Use_array,
      });
    } else if (e.detail.Field_Type == 3) {
      this.setData({
        Sent_ApplicantNameRank: Use_array,
      });
    }
    this.Load_Cond2Info();//取得二次筛选项
    this.Load_data();//加载列表
  },

  //组件点击重置按钮-重新加载二次筛选项
  Get_Reset:function(e){
    this.setData({
      According: true,//阻止scroll-view穿透
      is_search_1st: false,
      is_search_2nd: true,
      is_changepage: false,
      page: 0,
    });
    if (e.detail == 0) {
      this.setData({
        Sent_TestStateId: [],
      });
    } else if (e.detail == 1) {
      this.setData({
        Sent_TestStagingId: [],
      });
    } else if (e.detail == 2) {
      this.setData({
        Sent_IsBeTestRecord: [],
      });
    } else if (e.detail == 3) {
      this.setData({
        Sent_ApplicantNameRank: [],
      });
    }
    this.Load_Cond2Info(); //取得二次筛选项
    this.Load_data();//加载列表
  },

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },



})