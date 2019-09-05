var app = getApp();
const util = require('../util/util.js');

const GetCond2Info = require('../config').drugapproval.GetCond2Info
const GetList = require('../config').drugapproval.GetList


Page({
  /**
   * 页面的初始数据
   */
  data: {
    content_width: wx.getSystemInfoSync().windowWidth,
    content_height: wx.getSystemInfoSync().windowHeight - 40,
    Power: "",
    Isbind: "",
    Modal_hidden: true,

    According: true,

    topNum: 0,

    options_object: {},

    send_DosageId: "",
    send_ListingSituation: "",
    send_DrugTypeId: "",
    send_ApplyType_NewId: "",
    send_HandleState_CFDAId: "",
    send_CategoryId: "",
    send_SubCategoryId: "",
    send_Conclusion: "",
    send_ProjectType: "",
    
    send_sort: 0,

    DosageId: [],
    ListingSituation: [],
    DrugTypeId: [],
    ApplyType_NewId: [],
    HandleState_CFDAId: [],
    Conclusion: [],
    ProjectType: [],
    CategoryId: [],
    SubCategoryId: [],
    Use_SubCategoryId: [],

    Update_DosageId: [],
    Update_ListingSituation: [],
    Update_DrugTypeId: [],
    Update_ApplyType_NewId: [],
    Update_HandleState_CFDAId: [],
    Update_Conclusion: [],
    Update_ProjectType: [],
    Update_CategoryId: [],
    Update_SubCategoryId: [],

    is_search_1st: true,
    is_search_2nd: false,
    is_changepage: false,
    cond_2nd: {},

    page: 0,
    Maxpage: 46,//46

    logid: "",
    total: "",
    return_list: [],

    have_more: true,
    con_null: false,

    ShowMore:false,


  },
  /*** 生命周期函数--监听页面加载 ***/
  onLoad: function (options) {
    
    if (options.search_Type==0){
      options.O_DrugName = decodeURIComponent(options.search_Con);
      delete options.search_Con;//删除属性
      delete options.search_Type;//删除属性
    }
    if (decodeURIComponent(options.O_Keywords) != "" && options.O_Keywords!=undefined){
      options.O_Keywords = decodeURIComponent(options.O_Keywords);
    }
    if (options.search_Type == 1){
      options.O_CompanyName = decodeURIComponent(options.search_Con);
      delete options.search_Con;//删除属性
      delete options.search_Type;//删除属性
    }
    if (options.O_Tab_Type != "" && options.O_Tab_Type != undefined && wx.getStorageSync('auth').DrugApproval == false){
      this.setData({
        ShowMore: true,
      })
    }
    
    this.setData({
      options_object : options
    });
    
    this.Load_Cond2Info()
    this.Load_data()

  },
  Load_Cond2Info:function(){

    //取得二次筛选项
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
    param1.success = this.success_GetCond2Info;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  success_GetCond2Info: function (data, param) {
    //console.log(data.Data)
    data.Data.forEach(function (value, index, array) {
      if (value.type == 0) {
        this.setData({
          DosageId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length0 = this.data.send_DosageId.split(",")
        for (var j = 0; j < use_length0.length; j++) {
          for (var k = 0; k < this.data.DosageId.length; k++) {
            if (use_length0[j] == this.data.DosageId[k].item_val) {
              this.data.DosageId[k].open = true
              break
            }
          }
        }
        this.setData({
          DosageId: this.data.DosageId,
          Update_DosageId: this.data.DosageId,
        })
      } else if (value.type == 1) {
        this.setData({
          ListingSituation: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length1 = this.data.send_ListingSituation.split(",")
        for (var j = 0; j < use_length1.length; j++) {
          for (var k = 0; k < this.data.ListingSituation.length; k++) {
            if (use_length1[j] == this.data.ListingSituation[k].item_val) {
              this.data.ListingSituation[k].open = true
              break
            }
          }
        }
        this.setData({
          ListingSituation: this.data.ListingSituation,
          Update_ListingSituation: this.data.ListingSituation,
        })
      } else if (value.type == 2){
        this.setData({
          DrugTypeId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length0 = this.data.send_DrugTypeId.split(",")
        for (var j = 0; j < use_length0.length; j++) {
          for (var k = 0; k < this.data.DrugTypeId.length; k++) {
            if (use_length0[j] == this.data.DrugTypeId[k].item_val) {
              this.data.DrugTypeId[k].open = true
              break
            }
          }
        }
        this.setData({
          DrugTypeId: this.data.DrugTypeId,
          Update_DrugTypeId: this.data.DrugTypeId,
        })
      } else if (value.type == 3){
        this.setData({
          ApplyType_NewId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length1 = this.data.send_ApplyType_NewId.split(",")
        for (var j = 0; j < use_length1.length; j++) {
          for (var k = 0; k < this.data.ApplyType_NewId.length; k++) {
            if (use_length1[j] == this.data.ApplyType_NewId[k].item_val) {
              this.data.ApplyType_NewId[k].open = true
              break
            }
          }
        }
        this.setData({
          ApplyType_NewId: this.data.ApplyType_NewId,
          Update_ApplyType_NewId: this.data.ApplyType_NewId,
        })
      } else if (value.type == 4){
        this.setData({
          HandleState_CFDAId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length1 = this.data.send_HandleState_CFDAId.split(",")
        for (var j = 0; j < use_length1.length; j++) {
          for (var k = 0; k < this.data.HandleState_CFDAId.length; k++) {
            if (use_length1[j] == this.data.HandleState_CFDAId[k].item_val) {
              this.data.HandleState_CFDAId[k].open = true
              break
            }
          }
        }
        this.setData({
          HandleState_CFDAId: this.data.HandleState_CFDAId,
          Update_HandleState_CFDAId: this.data.HandleState_CFDAId,
        })
      } else if (value.type == 5){
        this.setData({
          CategoryId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length1 = this.data.send_CategoryId.split(",")
        for (var x = 0; x < use_length1.length; x++) {
          for (var y = 0; y < this.data.CategoryId.length; y++) {
            if (use_length1[x] == this.data.CategoryId[y].item_val) {
              this.data.CategoryId[y].open = true
              break
            }
          }
        }
        this.setData({
          CategoryId: this.data.CategoryId,
          Update_CategoryId: this.data.CategoryId,
        })
      } else if (value.type == 6){
        this.setData({
          SubCategoryId: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length2 = this.data.send_SubCategoryId.split(",")
        let use_array = [{ item_title: "全选", item_val: "", open: false, pkey: "", total: "" }]
        if (this.data.send_SubCategoryId != "") {
          for (var m = 0; m < use_length2.length; m++) {
            for (var n = 0; n < this.data.SubCategoryId.length; n++) {
              if (use_length2[m] == this.data.SubCategoryId[n].item_val) {
                use_array.push({
                  item_title: this.data.SubCategoryId[n].item_title,
                  item_val: this.data.SubCategoryId[n].item_val,
                  open: true,
                  pkey: this.data.SubCategoryId[n].pkey,
                  total: this.data.SubCategoryId[n].total
                })
                break
              }
            }
          }
          if (use_array.length - 1 == this.data.SubCategoryId.length) {
            use_array[0].open = true
          }
        } else {
          for (var l = 0; l < this.data.SubCategoryId.length; l++) {
            use_array.push({
              item_title: this.data.SubCategoryId[l].item_title,
              item_val: this.data.SubCategoryId[l].item_val,
              open: false,
              pkey: this.data.SubCategoryId[l].pkey,
              total: this.data.SubCategoryId[l].total
            })
          }
        }
        this.setData({
          Use_SubCategoryId: use_array,
          Update_SubCategoryId: use_array,
        });
      } else if (value.type == 7){
        this.setData({
          Conclusion: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length1 = this.data.send_Conclusion.split(",")
        for (var j = 0; j < use_length1.length; j++) {
          for (var k = 0; k < this.data.Conclusion.length; k++) {
            if (use_length1[j] == this.data.Conclusion[k].item_val) {
              this.data.Conclusion[k].open = true
              break
            }
          }
        }
        this.setData({
          Conclusion: this.data.Conclusion,
          Update_Conclusion: this.data.Conclusion,
        })
      } else if (value.type == 8){
        this.setData({
          ProjectType: value.items.map(item => {
            return {
              pkey: item.pkey,
              item_val: item.item_val,
              item_title: item.item_title,
              total: item.total,
              open: false
            }
          }),
        })
        let use_length0 = this.data.send_ProjectType.split(",")
        for (var j = 0; j < use_length0.length; j++) {
          for (var k = 0; k < this.data.ProjectType.length; k++) {
            if (use_length0[j] == this.data.ProjectType[k].item_val) {
              this.data.ProjectType[k].open = true
              break
            }
          }
        }
        this.setData({
          ProjectType: this.data.ProjectType,
          Update_ProjectType: this.data.ProjectType,
        })
      }
    }, this);
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
      this.Load_data(); //加载列表
    }
  },

  //列表的加载
  Load_data: function () {

    //取得列表
    var param1 = {};
    param1.url = GetList;
    var paramData1 = {};

    paramData1.cond_1st = this.data.options_object;
    paramData1.cond_2nd = this.data.cond_2nd;
    // paramData1.sort = this.data.send_sort;
    paramData1.page = this.data.page;
    paramData1.is_search_1st = (this.data.is_changepage == true) ? false : this.data.is_search_1st;
    paramData1.is_search_2nd = (this.data.is_changepage == true) ? false : this.data.is_search_2nd;
    paramData1.is_changepage = (this.data.page != 0) ? true : false;
    paramData1.logid = this.data.logid;

    param1.data = paramData1;
    param1.success = this.success_GetList;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  success_GetList: function (result, param){
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

  Load_more: function () {
    //console.log("加载")
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
        this.Load_data()
      }
    }
  },

  /*** 生命周期函数--监听页面初次渲染完成 ***/
  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
  },
  /*** 生命周期函数--监听页面显示 ***/
  onShow: function () {
    this.setData({
      Power: wx.getStorageSync('auth').DrugApproval,
      Isbind: wx.getStorageSync('isbind'),
    })
  },
  /*** 生命周期函数--监听页面隐藏 ***/
  onHide: function () {
  },
  /*** 生命周期函数--监听页面卸载 ***/
  onUnload: function () {
  },
  /*** 页面相关事件处理函数--监听用户下拉动作 ***/
  onPullDownRefresh: function () {
  },
  /*** 页面上拉触底事件的处理函数 ***/
  onReachBottom: function () {
  },
  /*** 用户点击右上角分享 ***/
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

  Get_Reset_item:function(e){
    this.setData(e.detail)
  },

  Get_Is_arrow:function(e){
    //console.log(e.detail)
    if (e.detail.arrow0 == false && e.detail.arrow1 == false && e.detail.arrow2 == false && e.detail.arrow3 == false){
      this.setData({
        According: true,
      })
    }else{
      this.setData({
        According: false,
      })
    }
  },

  set_condition: function () {
    this.setData({
      is_search_1st: false,
      is_search_2nd: true,
      is_changepage: false,
      page: 0,
    })
  },

  Get_Reset_and_Sure: function(e) {

    this.setData({
      According: true,
      cond_2nd: e.detail,
      send_DosageId: e.detail.DosageId,
      send_ListingSituation: e.detail.ListingSituation,
      send_DrugTypeId: e.detail.DrugTypeId,
      send_ApplyType_NewId: e.detail.ApplyType_NewId,
      send_HandleState_CFDAId: e.detail.HandleState_CFDAId,
      send_CategoryId: e.detail.CategoryId,
      send_SubCategoryId: e.detail.SubCategoryId,
      send_Conclusion: e.detail.Conclusion,
      send_ProjectType: e.detail.ProjectType,
      send_sort: e.detail.sort,
    });
    this.set_condition()
    this.Load_Cond2Info()
    this.Load_data()
  },

  Get_Choice_Sort:function(e){
    this.setData({
      According: true,
      cond_2nd: e.detail,
    });
    this.set_condition()
    this.Load_data()
  },

  //列表的点击跳转
  btnListInfo: function (e) {
    var value = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: "info?AcceptanceNo=" + value,
    })
  },

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },

})
