// page/component/declare/AdvancedSearch.js 
var app = getApp();
const util = require('../util/util.js');

const GetDrugNameTip = require('../config').drugapproval.GetDrugNameTip

var Picker1=[];
//小类的重置
var Picker2 = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight,
    address: GetDrugNameTip,
    //modalshow: true,
    ShowMore: false,
    Jurisdiction: false,
    Isbind: "",
    Modal_hidden: true,
    Therapeutic: {
      hidden: true,
      data: "ATC",
      curHdIndex: 0,
    },
    open:false,
    //药品的枚举字典
    ctrldic: {
      hidden: true,
      nodata: true,
      data: {}
    },
    ctrlTime:{
      // 承办时间
      UndertakeDate: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      },
      // 状态开始时间
      HandleStartDate_CFDA: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      },
      IsReviewQueue: {
        disabled: true,
      },
      // 进入序列时间
      Date_EnterQueue: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      },
      // 离开序列时间
      Date_LeaveQueue: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      },
      // CFDA开始审批
      Date_CFDAStartReview: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      },
      // CFDA审批结束
      Date_CFDAEndReview: {
        MinDate: "请选择开始时间",
        MaxDate: "请选择结束时间"
      }
    },
    InputValue:{
      DrugName:"",
      CompanyName: "",
      AcceptanceNo: "",
      Dosage: "",
    },
    //原料制剂
    RawMaterialOrPreparation: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "原料" },
      { item_val: "1", item_title: "制剂" },
    ],
    RawMaterialOrPreparation_index: "0",
    //国产进口
    DomesticOrImport: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "国产" },
      { item_val: "1", item_title: "进口" },
    ],
    DomesticOrImport_index: "0",
    //申请类型
    ApplyType_New: [
      { item_val: "", item_title: "不限" }, 
      { item_val: "0", item_title: "临床申请" },
      { item_val: "1", item_title: "新药上市申请" },
      { item_val: "2", item_title: "仿制药注册申请" },
      { item_val: "3", item_title: "复审" },
      { item_val: "4", item_title: "一致性评价" },
      { item_val: "5", item_title: "补充申请及其它" },
    ],
    ApplyType_New_index: "0",
    //特殊审评
    SpecialProject: [
      { item_val: "", item_title: "不限" },
      { item_val: "1", item_title: "是" },
    ],
    SpecialProject_index: "0",
    //优先审评
    FirstProject: [
      { item_val: "", item_title: "不限" },
      { item_val: "1", item_title: "是" },
    ],
    FirstProject_index: "0",
    //重大专项
    MajorProject: [
      { item_val: "", item_title: "不限" },
      { item_val: "1", item_title: "是" },
    ],
    MajorProject_index: "0",
    //CDE审评系列
    ReviewQueue01: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "新报任务序列" },
      { item_val: "1", item_title: "补充任务序列" },
      { item_val: "2", item_title: "一致性评价审评序列" },
    ],
    ReviewQueue01_index: "0",
    //通用名国内最高进度
    HighestProgress_GenericName: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "批准上市" },
      { item_val: "1", item_title: "申报上市" },
      { item_val: "2", item_title: "临床研究" },
      { item_val: "3", item_title: "申报补充及其它" },
      { item_val: "4", item_title: "撤市" },
    ],
    HighestProgress_GenericName_index: "0",
    //品种国内最高进度
    HighestProgress_Variety: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "批准上市" },
      { item_val: "1", item_title: "申报上市" },
      { item_val: "2", item_title: "临床研究" },
      { item_val: "3", item_title: "申报补充及其它" },
      { item_val: "4", item_title: "撤市" },
    ],
    HighestProgress_Variety_index: "0",
    //品种批准国产企业数
    NumberApprovedDmEnterprise: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "0家" },
      { item_val: "1", item_title: "1家" },
      { item_val: "2", item_title: "2家" },
      { item_val: "3", item_title: "3～5家" },
      { item_val: "4", item_title: "6～10家" },
      { item_val: "5", item_title: "10家以上" },
    ],
    NumberApprovedDmEnterprise_index: "0",
    //品种申报企业数
    ApprovalCompanyNum: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "1家" },
      { item_val: "1", item_title: "2家" },
      { item_val: "2", item_title: "3～5家" },
      { item_val: "3", item_title: "6～10家" },
      { item_val: "4", item_title: "10家以上" },
    ],
    ApprovalCompanyNum_index: "0",
    //品种申报上市企业数
    NumberDeclareListingEnterprise: [
      { item_val: "", item_title: "不限" },
      { item_val: "0", item_title: "0家" },
      { item_val: "1", item_title: "1家" },
      { item_val: "2", item_title: "2家" },
      { item_val: "3", item_title: "3～5家" },
      { item_val: "4", item_title: "6～10家" },
      { item_val: "5", item_title: "10家以上" },
    ],
    NumberDeclareListingEnterprise_index: "0",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取下拉框选项
    var param = {};
    param.url = "/api/DrugApproval/GetSelectInfo";
    var paramdata = {};
    //参数
    paramdata.type = -1;
    param.data = paramdata;
    //成功回调函数
    param.success = this.successGetSelectInfo;
    //请求方法
    param.method = "GET",
      //辅助参数
      param.param = {};
    util.NetRequest(param);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.nameTip = this.selectComponent('#NameTip');
  },
  successGetSelectInfo: function (data,param){
    var resultdata = data.Data;
    var obj = [];
    obj.push({ item_val: "", item_title: "不限" });
    this.setData({
      'Genre5': obj,
      'Genre6': obj,
      'Genre7': obj,
      'Genre3': obj,
      'Genre9': obj,
    })
    for (var i = 0; i < resultdata.length; i++) {
      var obj = [];
      obj.push({ item_val: "", item_title: "不限" });
      
      obj = obj.concat(resultdata[i].items);

      //console.log(obj);
      var dd_name = resultdata[i].type;
      this.setData({
        ['Genre' + dd_name + '_index']: "0",
        ['Genre' +dd_name]: obj,
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      'Jurisdiction': wx.getStorageSync('auth').DrugApproval,
      Isbind: wx.getStorageSync('isbind'),
    });
    if (this.data.Jurisdiction) {
      this.setData({
        'ShowMore': true,
      });
    }
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
  
  btnCondOpen: function() {
    this.setData({
      "Therapeutic.hidden": (!this.data.Therapeutic.hidden) ,
      });
  },
  btnCategory: function (e) {
    //console.log(e)
    var DataIdndex = e.target.dataset.current;
    var name = e.target.dataset.name;
    this.setData({
      "Therapeutic.curHdIndex": DataIdndex,
      "Therapeutic.data": name,
      "Therapeutic.hidden": true,
    });
    if (e.target.dataset.current == 1){
      //Picker1 = [];
      this.setData({
        Genre7_index: 0,
        Genre6_index: 0,
        Genre5_index: 0,
        Genre4_index: 0,
      });
    }else{
      //Picker2 = [];
      this.setData({
        Genre3_index: 0,
        Genre2_index: 0,
      });
    }
  },
  bindKeyInput: function (e) {
    //console.log(e)
    var ctrl = e.target.dataset.name;
    this.setData({
      ['InputValue.' + ctrl]: e.detail.value
    })
    if (e.currentTarget.dataset.name == "DrugName"){
      this.nameTip.show_NameTip();
    }
  },
  Get_DrugName: function (e) {
    this.setData({
      'InputValue.DrugName': e.detail
    })
  },

  bindPickerChange: function (e) {
    if (e.currentTarget.dataset.switchinfo == 1){
      //以下switch开关按钮使用
      var that = this;
      var ctrl = e.target.dataset.name;
      that.setData({
        [ctrl + '_index']: (e.detail.value == true) ? 1 : 0,
      });
      if (e.detail.value != "" && e.detail.value != undefined) {
        var value = (e.detail.value == true) ? 1 : "";
        Picker1.push({ "type": 0, "Name": ctrl });
        //数组的去重 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
        var obj = {};
        Picker1 = Picker1.reduce(function (item, next) {
          obj[next.Name] ? '' : obj[next.Name] = true && item.push(next);
          return item;
        }, []);
      }
    }else{
      //以下picker下拉按钮使用
      var that = this;
      var ctrl = e.target.dataset.name;
      that.setData({
        [ctrl + '_index']: e.detail.value,
      });
      if (e.detail.value != "" && e.detail.value != undefined) {
        var type = e.target.dataset.type;
        var value = this.data[ctrl][e.detail.value].item_val;
        var param = e.target.dataset.param;
        if (param != undefined && param != null) {
          Picker1.push({ "type": 1, "param": param, "Name": ctrl });
        } else {
          Picker1.push({ "type": 0, "Name": ctrl });
        }
        //数组的去重 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
        var obj = {};
        Picker1 = Picker1.reduce(function (item, next) {
          obj[next.Name] ? '' : obj[next.Name] = true && item.push(next);
          return item;
        }, []);
        if (ctrl == "ReviewQueue01" && value == "") {
          this.setData({
            "ctrlTime.IsReviewQueue.disabled": true,
            "ctrlTime.Date_EnterQueue.MinDate": "请选择开始时间",
            "ctrlTime.Date_EnterQueue.MaxDate": "请选择结束时间",
            "ctrlTime.Date_LeaveQueue.MinDate": "请选择开始时间",
            "ctrlTime.Date_LeaveQueue.MinDate": "请选择结束时间",
          });
        }
        if (ctrl == "ReviewQueue01" && value != "") {
          this.setData({
            "ctrlTime.IsReviewQueue.disabled": false,
          });
        }
        if (type != undefined) {
          var obj = [];
          obj.push({ item_val: "", item_title: "不限" })
          //console.log(obj)
          if (type == 5) {
            this.setData({
              'Genre5': obj,
              'Genre6': obj,
              'Genre7': obj,
            })
          } else if (type == 6) {
            this.setData({
              'Genre6': obj,
              'Genre7': obj,
            })
          } else if (type == 7) {
            this.setData({
              'Genre7': obj,
            })
          } else if (type == 3) {
            this.setData({
              'Genre3': obj,
            })
          } else if (type == 9) {
            this.setData({
              'Genre9': obj,
            })
          }

          if (value != "") {
            //获取下拉框选项
            var param = {};
            param.url = "/api/DrugApproval/GetSelectInfo";
            var paramdata = {};
            //参数
            //console.log(value)
            paramdata.type = type;
            paramdata.pkey = value;
            param.data = paramdata;
            //成功回调函数
            param.success = this.successGetSelectInfoByType;
            //请求方法
            param.method = "GET",
              //辅助参数
              param.param = {};
            util.NetRequest(param);
          }
        }
      }
    }
  },
  successGetSelectInfoByType:function(data,param){
    var resultdata = data.Data;
    var dd_name = resultdata[0].type;
    var obj = [];
    obj.push({ item_val: "", item_title: "不限" })
    
    //赋值
    if (dd_name==9){
      
      resultdata[0].items.sort(function (a, b) {
        var aa = a.item_title;
        var bb = b.item_title;
        //去除汉字
        var reg = /[\u4e00-\u9fa5]/g;
        aa = aa.replace(reg, "");  
        bb = bb.replace(reg, "");  
        
        //注册的排序有分号，改为相加
        if (aa.indexOf(";") != -1) {
          aa = aa.replace(/\;/g, ".");
          aa = aa.replace(/\./g, "#");
          aa = aa.replace("#", ".");
          aa = aa.replace(/\#/g, "");
        }
        if (bb.indexOf(";") != -1) {
          bb = bb.replace(/\;/g, ".");
          bb = bb.replace(/\./g, "#");
          bb = bb.replace("#", ".");
          bb = bb.replace(/\#/g, "");
        }
        return aa - bb;//时间倒序
      });
    }
    obj = obj.concat(resultdata[0].items);
    Picker2.push('Genre'+dd_name);
    Picker2 = Array.from(new Set(Picker2));
    this.setData({
      ['Genre' + dd_name + '_index']: "0",
      ['Genre' + dd_name]: obj,
    })
  },
  bindDateChange: function (e) {
    
    var ctrl = e.target.dataset.name;
    var Time = e.target.dataset.time;
    this.setData({
      ['ctrlTime.' +ctrl + '.' + Time]: e.detail.value,
    })
  },
  //重置按钮
  btnCondReset: function (e) {
    this.nameTip.blur_NameTip();
    //日期控件的重置
    for (var skey in this.data.ctrlTime) {
      var obj = this.data.ctrlTime[skey];
      var MinDate = obj.MinDate;
      var MaxDate = obj.MaxDate;
      this.setData({
        ['ctrlTime.' + skey + '.MinDate']: "请选择开始时间",
        ['ctrlTime.' + skey + '.MaxDate']: "请选择结束时间",
      })
    }
    this.setData({
      "ctrlTime.IsReviewQueue.disabled": true,
    })
    //文本输入框的重置
    for (var skey in this.data.InputValue) {
      this.setData({
        ['InputValue.' + skey ]: "",
      })
    }
    //初始化可加载的选择控件的重置
    for (var i = 0; i < Picker1.length; i++) {  
      var dd_name = Picker1[i].Name;
      this.setData({
        [dd_name + '_index']: "0",
      })
    }
    //联动控件的重置
    for (var i = 0; i < Picker2.length; i++) {
      var dd_name = Picker2[i];
      if (!this.data.ctrlTime.IsReviewQueue.disabled){
        this.setData({
          "ctrlTime.IsReviewQueue.disabled": true,
          "ctrlTime.Date_EnterQueue.MinDate": "请选择开始时间",
          "ctrlTime.Date_EnterQueue.MaxDate": "请选择结束时间",
          "ctrlTime.Date_LeaveQueue.MinDate": "请选择开始时间",
          "ctrlTime.Date_LeaveQueue.MinDate": "请选择结束时间",
        });
      }
     
      this.setData({
        [dd_name]: "",
      })

    }
    Picker1 = [];
    Picker2=[];
    this.setData({
      open: false,
      SpecialProject_index: "0",
      FirstProject_index: "0",
      MajorProject_index: "0",
    })
  },
  btnCondSubmit: function (e) {
    var result ="";
    // input框取值
    for (var skey in this.data.InputValue) {
      var obj = this.data.InputValue[skey];
      if (obj != "" && obj != undefined){
         result += "&"+skey+"="+obj; 
      }
    }
    // 开始结束时间取值
    for (var skey in this.data.ctrlTime) {
      var obj = this.data.ctrlTime[skey];
      var MinDate = obj.MinDate;
      var MaxDate = obj.MaxDate;
      if (MinDate != "请选择开始时间" && MinDate != undefined){
       
        result += "&" + skey + "_Start=" + MinDate; 
      }
      if (MaxDate != "请选择结束时间" && MaxDate != undefined) {
        result += "&" + skey + "_End=" + MaxDate; 
      }
    }
    //控件的取值
    for (var i = 0; i < Picker1.length; i++) {
      var type = Picker1[i].type;
      var dd_name = Picker1[i].Name;
      var index = this.data[dd_name + '_index'];
      if (index != 0 && index != "" && index != undefined && this.data[dd_name].length>1){
        var obj = this.data[dd_name][index].item_val;
        if (obj != "" && obj != undefined) {
          if (type==0){
            result += "&" + dd_name + "=" + obj; 
          }else{
            var dd_param = Picker1[i].param;
            result += "&" + dd_param + "=" + obj; 
          }
        }
      }
    }
    
    result=result.substr(1);

    const balance = { MinDate: "请选择开始时间", MaxDate: "请选择结束时间" }
    
    if (this.data.InputValue.DrugName.trim() == "" && this.data.InputValue.CompanyName.trim() == "" && this.data.InputValue.AcceptanceNo.trim() == "" && this.data.InputValue.Dosage.trim() == "" && JSON.stringify(this.data.ctrlTime.UndertakeDate) == JSON.stringify(balance) && JSON.stringify(this.data.ctrlTime.HandleStartDate_CFDA) == JSON.stringify(balance) && JSON.stringify(this.data.ctrlTime.Date_EnterQueue) == JSON.stringify(balance) && JSON.stringify(this.data.ctrlTime.Date_LeaveQueue) == JSON.stringify(balance) && JSON.stringify(this.data.ctrlTime.Date_CFDAStartReview) == JSON.stringify(balance) && JSON.stringify(this.data.ctrlTime.Date_CFDAEndReview) == JSON.stringify(balance) && JSON.stringify(obj) == JSON.stringify(balance)) {
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.navigateTo({
        url: "list?" + result,
      })
    }
  },
  //没权限出更多
  ToggleMore: function (e) {
   
    if (!this.data.ShowMore){
      this.setData({
        Modal_hidden: false,
      });
    }

    this.setData({
      "ShowMore": !this.data.ShowMore,
    });
   
  },

  Close_NameTip: function (e) {
    if (this.nameTip.data.prompt_hidden == false) {
      this.nameTip.blur_NameTip();
    }
  },
  
})
