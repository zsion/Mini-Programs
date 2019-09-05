// ConsistencyProgress//high_search.js
const GetGenericNameTip = require('../config').ConsistencyProgress.GetGenericNameTip
const GetCompanyNameTip = require('../config').ConsistencyProgress.GetCompanyNameTip
const GetSelectInfo_Drug = require('../config').ConsistencyProgress.GetSelectInfo_Drug
const GetSelectInfo_Company = require('../config').ConsistencyProgress.GetSelectInfo_Company
const GetSelectInfo = require('../config').CommCategory.GetSelectInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Power: "",
    Isbind: "",
    Modal_hidden: true,
    currentsTab: 0,
    address_GenericName: GetGenericNameTip,//组件-枚举字典字典
    picker_address: GetSelectInfo_Drug,
    address_area: GetSelectInfo,//组件-治疗类别-配置数据请求地址
    dbtype: 5,//组件-数据库类型
    ATC: { ATC1: "", ATC2: "", ATC3: "", ATC4: "" },
    PHIIC: { zldl: "", zlxl: "" },
    GenericName: "",
    HighestProcessId: "",
    IsVariety289: "",
    NumberNeedEvaluate_Start: "",
    NumberNeedEvaluate_End: "",
    NumberApproval_Start: "",
    NumberApproval_End: "",
    NumberPass_Start: "",
    NumberPass_End: "",
    FirstUndertakeDate_Start: "",
    FirstUndertakeDate_End: "",
    FirstApprovalDate_Start: "",
    FirstApprovalDate_End: "",

    address_CompanyName: GetCompanyNameTip,//组件-枚举字典字典
    picker_address_Company: GetSelectInfo_Company,
    CompanyName: "",
    HighestProcessId_Company: "",
    IsVariety289_Company: "",
    NumberBE_Start: "",
    NumberBE_End: "",
    NumberApproval_Start_Company: "",
    NumberApproval_End_Company: "",
    NumberPass_Start_Company: "",
    NumberPass_End_Company: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //查品种
    this.nameTip_GenericName = this.selectComponent('#nameTip_GenericName');
    this.CustomPicker_HighestProcessId = this.selectComponent('#CustomPicker_HighestProcessId');
    this.CustomPicker_IsVariety289 = this.selectComponent('#CustomPicker_IsVariety289');
    this.Numberpicker_NumberNeedEvaluate = this.selectComponent('#Numberpicker_NumberNeedEvaluate');
    this.Numberpicker_NumberApproval = this.selectComponent('#Numberpicker_NumberApproval');
    this.Numberpicker_NumberPass = this.selectComponent('#Numberpicker_NumberPass');
    this.FirstUndertakeDate = this.selectComponent('#FirstUndertakeDate');
    this.FirstApprovalDate = this.selectComponent('#FirstApprovalDate');
    this.area_picker = this.selectComponent('#area_picker');
    //查企业
    this.nameTip_CompanyName = this.selectComponent('#nameTip_CompanyName');
    this.CustomPicker_HighestProcessId_Company = this.selectComponent('#CustomPicker_HighestProcessId_Company');
    this.CustomPicker_IsVariety289_Company = this.selectComponent('#CustomPicker_IsVariety289_Company');
    this.Numberpicker_NumberBE = this.selectComponent('#Numberpicker_NumberBE');
    this.Numberpicker_NumberApproval_Company = this.selectComponent('#Numberpicker_NumberApproval_Company');
    this.Numberpicker_NumberPass_Company = this.selectComponent('#Numberpicker_NumberPass_Company');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      Power: {
        ConsistencyProgress: wx.getStorageSync('auth').ConsistencyProgress,
        ConsistencyProgress_Co: wx.getStorageSync('auth').ConsistencyProgress_Co
      },
      Isbind: wx.getStorageSync('isbind'),
    })
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
  //点击切换
  tabNavs: function (e) {
    if (this.data.currentsTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentsTab: e.target.dataset.current
      })
    }
  },
  //输入药品通用名
  input_GenericName: function (e) {
    this.setData({
      GenericName: e.detail.value
    })
    this.nameTip_GenericName.show_NameTip();//唤起枚举字典
  },
  //获得枚举字典组件返回值
  Get_GenericName: function (e) {
    this.setData({
      GenericName: e.detail
    })
  },
  //获取最高进程-组件返回值
  Get_HighestProcessId: function (e) {
    this.setData({
      HighestProcessId: e.detail
    })
  },
  //获取289目录品-组件返回值
  Get_IsVariety289: function(e) {
    this.setData({
      IsVariety289: e.detail
    })
  },
  //待评价企业数-组件返回值
  Get_NumberNeedEvaluate_Start: function(e) {
    this.setData({
      NumberNeedEvaluate_Start: e.detail
    })
  },
  //待评价企业数-组件返回值
  Get_NumberNeedEvaluate_End: function (e) {
    this.setData({
      NumberNeedEvaluate_End: e.detail
    })
  },
  //申报企业数-组件返回值
  Get_NumberApproval_Start: function (e) {
    this.setData({
      NumberApproval_Start: e.detail
    })
  },
  //申报企业数-组件返回值
  Get_NumberApproval_End: function (e) {
    this.setData({
      NumberApproval_End: e.detail
    })
  },
  //通过企业数-组件返回值
  Get_NumberPass_Start: function (e) {
    this.setData({
      NumberPass_Start: e.detail
    })
  },
  //通过企业数-组件返回值
  Get_NumberPass_End: function (e) {
    this.setData({
      NumberPass_End: e.detail
    })
  },
  //首次承办时间开始
  Get_FirstUndertakeDate_Start: function (e) {
    this.setData({
      FirstUndertakeDate_Start: e.detail
    })
  },
  //首次承办时间结束
  Get_FirstUndertakeDate_End: function (e) {
    this.setData({
      FirstUndertakeDate_End: e.detail
    })
  },
  //首次批准时间开始
  Get_FirstApprovalDate_Start: function (e) {
    this.setData({
      FirstApprovalDate_Start: e.detail
    })
  },
  //首次批准时间结束
  Get_FirstApprovalDate_End: function (e) {
    this.setData({
      FirstApprovalDate_End: e.detail
    })
  },
  //获得治疗类别组件返回值
  Get_ATC: function (e) {
    this.setData({
      ATC: e.detail
    })
    //console.log(this.data.ATC)
  },
  //获得治疗类别组件返回值
  Get_PHIIC: function (e) {
    this.setData({
      PHIIC: e.detail
    })
    //console.log(this.data.PHIIC)
  },
  Reset_all_Drug: function (e) {
    this.setData({
      GenericName: "",//药品通用名
    });
    this.CustomPicker_HighestProcessId.custompicker_reset();//最高进程
    this.CustomPicker_IsVariety289.custompicker_reset();//289目录品
    this.Numberpicker_NumberNeedEvaluate.numberpicker_reset();//待评价企业数
    this.Numberpicker_NumberApproval.numberpicker_reset();//申报企业数
    this.Numberpicker_NumberPass.numberpicker_reset();//通过企业数
    this.FirstUndertakeDate.datepicker_reset();//首次承办时间
    this.FirstApprovalDate.datepicker_reset();//首次批准时间
    this.area_picker.ATC_reset();//治疗类别-ATC
    this.area_picker.PHIIC_reset();//治疗类别-PHIIC
  },

  Next_navigator_Drug: function (e) {
    if (this.data.GenericName.trim() == "" && this.data.HighestProcessId == "" && this.data.IsVariety289 == "" && this.data.NumberNeedEvaluate_Start == "" && this.data.NumberNeedEvaluate_End == "" && this.data.NumberApproval_Start == "" && this.data.NumberApproval_End == "" && this.data.NumberPass_Start == "" && this.data.NumberPass_End == "" && this.data.FirstUndertakeDate_Start == "" && this.data.FirstUndertakeDate_End == "" && this.data.FirstApprovalDate_Start == "" && this.data.FirstApprovalDate_End == "" && this.data.ATC.ATC1 == "" && this.data.ATC.ATC2 == "" && this.data.ATC.ATC3 == "" && this.data.ATC.ATC4 == "" && this.data.PHIIC.zldl == "" && this.data.PHIIC.zlxl == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ConsistencyProgress/DrugList?GenericName=${encodeURIComponent(this.data.GenericName)}&HighestProcessId=${this.data.HighestProcessId}&IsVariety289=${this.data.IsVariety289}&NumberNeedEvaluate_Start=${this.data.NumberNeedEvaluate_Start}&NumberNeedEvaluate_End=${this.data.NumberNeedEvaluate_End}&NumberApproval_Start=${this.data.NumberApproval_Start}&NumberApproval_End=${this.data.NumberApproval_End}&NumberPass_Start=${this.data.NumberPass_Start}&NumberPass_End=${this.data.NumberPass_End}&FirstUndertakeDate_Start=${this.data.FirstUndertakeDate_Start}&FirstUndertakeDate_End=${this.data.FirstUndertakeDate_End}&FirstApprovalDate_Start=${this.data.FirstApprovalDate_Start}&FirstApprovalDate_End=${this.data.FirstApprovalDate_End}&ATCCategoryId01=${encodeURIComponent(this.data.ATC.ATC1)}&ATCCategoryId02=${encodeURIComponent(this.data.ATC.ATC2)}&ATCCategoryId03=${encodeURIComponent(this.data.ATC.ATC3)}&ATCCategoryId04=${encodeURIComponent(this.data.ATC.ATC4)}&CategoryId=${encodeURIComponent(this.data.PHIIC.zldl)}&SubCategoryId=${encodeURIComponent(this.data.PHIIC.zlxl)}`
      })
    }
  },

  //输入企业名称
  input_CompanyName: function (e) {
    this.setData({
      CompanyName: e.detail.value
    })
    this.nameTip_CompanyName.show_NameTip();//唤起枚举字典
  },
  //获得枚举字典组件返回值
  Get_CompanyName: function (e) {
    this.setData({
      CompanyName: e.detail
    })
  },
  //获取最高进程-组件返回值
  Get_HighestProcessId_Company: function (e) {
    this.setData({
      HighestProcessId_Company: e.detail
    })
  },
  //获取289目录品-组件返回值
  Get_IsVariety289_Company: function (e) {
    this.setData({
      IsVariety289_Company: e.detail
    })
  },
  //BE备案品种数-组件返回值
  Get_NumberBE_Start: function (e) {
    this.setData({
      NumberBE_Start: e.detail
    })
  },
  //BE备案品种数-组件返回值
  Get_NumberBE_End: function (e) {
    this.setData({
      NumberBE_End: e.detail
    })
  },
  //申报品种数-组件返回值
  Get_NumberApproval_Start_Company: function (e) {
    this.setData({
      NumberApproval_Start_Company: e.detail
    })
  },
  //申报品种数-组件返回值
  Get_NumberApproval_End_Company: function (e) {
    this.setData({
      NumberApproval_End_Company: e.detail
    })
  },
  //通过品种数-组件返回值
  Get_NumberPass_Start_Company: function (e) {
    this.setData({
      NumberPass_Start_Company: e.detail
    })
  },
  //通过品种数-组件返回值
  Get_NumberPass_End_Company: function (e) {
    this.setData({
      NumberPass_End_Company: e.detail
    })
  },
  Reset_all_Company: function (e) {
    this.setData({
      CompanyName: "",//药品通用名
    });
    this.CustomPicker_HighestProcessId_Company.custompicker_reset();//最高进程
    this.CustomPicker_IsVariety289_Company.custompicker_reset();//289目录品
    this.Numberpicker_NumberBE.numberpicker_reset();//BE备案品种数
    this.Numberpicker_NumberApproval_Company.numberpicker_reset();//申报品种数
    this.Numberpicker_NumberPass_Company.numberpicker_reset();//通过品种数
  },

  Next_navigator_Company: function (e) {
    if (this.data.CompanyName.trim() == "" && this.data.HighestProcessId_Company == "" && this.data.IsVariety289_Company == "" && this.data.NumberBE_Start == "" && this.data.NumberBE_End == "" && this.data.NumberApproval_Start_Company == "" && this.data.NumberApproval_End_Company == "" && this.data.NumberPass_Start_Company == "" && this.data.NumberPass_End_Company == "") {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: `/ConsistencyProgress/CompanyList?CompanyName=${encodeURIComponent(this.data.CompanyName)}&HighestProcessId=${this.data.HighestProcessId_Company}&IsVariety289=${this.data.IsVariety289_Company}&NumberBE_Start=${this.data.NumberBE_Start}&NumberBE_End=${this.data.NumberBE_End}&NumberApproval_Start=${this.data.NumberApproval_Start_Company}&NumberApproval_End=${this.data.NumberApproval_End_Company}&NumberPass_Start=${this.data.NumberPass_Start_Company}&NumberPass_End=${this.data.NumberPass_End_Company}`
      })
    }
  },

  Close_NameTip: function (e) {
    if (this.nameTip_GenericName.data.prompt_hidden == false) {
      this.nameTip_GenericName.blur_NameTip();//关闭药品通用名枚举字典
    }
    if (this.nameTip_CompanyName.data.prompt_hidden == false) {
      this.nameTip_CompanyName.blur_NameTip();//关闭企业名枚举字典
    }
  },

  Show_modal: function (e) {
    this.setData({
      Modal_hidden: false,
    });
  },

})


