const util = require('../../util/util.js');
Component({
  properties: {
    Address: {
      type: String,
      value: '',
    },
    RegistrationNo: {
      type: String,
      value: '',
    },
    Type:{
      type: String,
      value: '',
    },
  },
  data: {
    color_array: ["color_bg0", "color_bg1", "color_bg2"],
    page: 0,
    DataList: [],
    have_more: true,
  },
  ready: function () {
    this.Load_data();//加载列表
  },
  methods: {

    //加载列表
    Load_data: function () {
      var param1 = {};
      param1.url = this.data.Address;
      var paramData1 = {};
      paramData1.RegistrationNo = this.data.RegistrationNo;
      paramData1.page = this.data.page;
      param1.data = paramData1;
      param1.success = this.Success_DataList;
      param1.method = "POST";
      param1.param = this;
      util.NetRequest(param1);
    },

    Success_DataList: function (result, param) {
      console.log(result.Data)
      if (param.data.page == 0) {
        if (result.Data.length != 0) {
          param.setData({
            have_more: true,
            DataList: result.Data,
          });
        } else {
          param.setData({
            DataList: [],
          });
        }
      } else {
        if (param.data.have_more == true) {
          var DataList = param.data.DataList;
          if (result.Data.length != 0) {
            for (var i = 0; i < result.Data.length; i++) {
              DataList.push(result.Data[i]);
            }
            // 设置数据
            param.setData({
              DataList: param.data.DataList,
            })
          } else {
            param.setData({
              have_more: false
            })
          }
        } else {
          param.setData({
            have_more: false
          })
        }
      }
    },

    //触底加载更多函数
    Load_more: function () {
      if (this.data.have_more == true) {
        this.data.page++
        this.Load_data();//加载列表
      }
    },
  }

})

