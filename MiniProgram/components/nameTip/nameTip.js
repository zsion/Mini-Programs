const util = require('../../util/util.js');
Component({
  properties: {
    address: {
      type: String,
      value: '',
    },
    PublicName:{
      type: String,
      value: '',
    }
  },
  data: {
    prompt_hidden: true,
    NameTip: [],
    Top: 0
  },
  ready: function () {
    
  },
  methods: {
    
    get_nametip: function () {
      //药品通用名枚举字典
      var param1 = {};
      param1.url = this.data.address;
      var paramData1 = {};
      paramData1.keywords = this.data.PublicName;
      param1.data = paramData1;
      param1.success = this.success_NameTip;
      param1.method = "GET";
      param1.param = this;
      util.NetRequest(param1);
    },
    success_NameTip: (result, param) => {
      param.setData({
        NameTip: [],
      })
      if (result.Data.length == 0) {
        param.setData({
          prompt_hidden: true,
        })
      } else {
        param.setData({
          prompt_hidden: false,
        })
      }
      param.setData({
        NameTip: result.Data,
        Top: 0,
      })
    },

    show_NameTip: function () {
      if (this.data.PublicName.trim() != "") {
        this.get_nametip()
        this.setData({
          prompt_hidden: false,
        })
      } else {
        this.setData({
          prompt_hidden: true,
        })
      }
    },

    blur_NameTip: function (e) {
      this.setData({
        prompt_hidden: true,
      })
    },

    click_NameTip: function (e) {
      this.triggerEvent('PublicName', e.target.dataset.index)
      this.setData({
        prompt_hidden: true,
      })
    },

  }

})