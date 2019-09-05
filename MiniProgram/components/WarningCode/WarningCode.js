var app = getApp();
const util = require('../../util/util.js');

const WarningCodeConfirm = require('../../config').Member.WarningCodeConfirm
const WarningCodeReset = require('../../config').Member.WarningCodeReset

Component({
  properties: {
    Message: {
      type: String,
      value: '',
    },
    Type: {
      type: String,
      value: '',
    },
    Img: {
      type: String,
      value: '',
    },
  },
  data: {
    WarningCode: false,
    Code: "",
    Num1:"",
    Num2:"",
    Num3:"",
    Num4:"",
    space: 100,
    IsFocus: true,
  },
  ready: function () {
    
  },
  methods : {
    Reset_WarningCode:function(){
      // 验证码刷新
      var param1 = {};
      param1.url = WarningCodeReset;
      var paramData1 = {};
      paramData1.type = this.properties.Type;
      param1.data = paramData1;
      param1.success = this.Success_Reset;
      param1.method = "GET";
      param1.param = this;
      util.NetRequest(param1);
    },

    Success_Reset: function (result, param) {
      if (result.ResultType == 1) {
        param.setData({
          Img: result.Data.code,
          Code: "",
          Num1: "",
          Num2: "",
          Num3: "",
          Num4: "",
          IsFocus: true,
        });
      }else{
        wx.showToast({
          title: '刷新失败',
          icon: 'none',
          duration: 2000
        })
      }
    },

    Sure_WarningCode: function () {
      // 验证码确认
      var param1 = {};
      param1.url = WarningCodeConfirm;
      var paramData1 = {};
      paramData1.code = this.data.Code;
      paramData1.type = this.properties.Type;
      param1.data = paramData1;
      param1.success = this.Success_WarningCode;
      param1.error = this.Error_WarningCode;
      param1.method = "GET";
      param1.param = this;
      util.NetRequest(param1);
    },

    Success_WarningCode: function (result, param){
      if (result.ResultType == 1){
        param.setData({
          WarningCode: false,
          Code: "",
          Num1: "",
          Num2: "",
          Num3: "",
          Num4: "",
        });
        param.triggerEvent('WarningCode', "")
      }
    },

    Error_WarningCode: function (result, param){
      if (result.Data != "" && result.Data != null){
        param.setData({
          Img: result.Data.code,
          Code: "",
          Num1: "",
          Num2: "",
          Num3: "",
          Num4: "",
          IsFocus: true,
        });
      }
    },

    WarningCode_Confirm: function () {
      if (this.data.Code.trim() == ""){
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.data.Code.length != 4){
        wx.showToast({
          title: '验证码长度为4',
          icon: 'none',
          duration: 2000
        })
      } else if (this.data.Code.trim() != "" && this.data.Code.length == 4){
        this.Sure_WarningCode()
      }
    },

    Input_WarningCode: function (e) {
      this.setData({
        Code: e.detail.value,
        Num1: e.detail.value.substring(0, 1),
        Num2: e.detail.value.substring(1, 2),
        Num3: e.detail.value.substring(2, 3),
        Num4: e.detail.value.substring(3, 4),
      });
      if (this.data.Code.length == 4) {
        this.WarningCode_Confirm()
      }
    },

    Init_WarningCode:function(){
      this.setData({
        WarningCode: true,
      });
    },

    Get_Focus:function(e){
      this.setData({
        IsFocus: true,
      });
    },
    
  }
})

