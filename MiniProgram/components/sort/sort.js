var app = getApp();
const util = require('../../util/util.js');
Component({
  properties: {
    Address: {
      type: String,
      value: '',
    },
    Total: {
      type: String,
      value: '',
    },
    options_object:{
      type: Object,
      value: '',
    }
  },
  data: {
    Toggle_hide: true,
    Sort_item: [],
    Item_default: "--",
  },
  ready: function () {
    this.Auto_load();
  },
  methods: {

    Auto_load: function () {
      var param1 = {};
      param1.url = this.data.Address;
      var paramData1 = {};
      paramData1.type = 0;
      paramData1.pkey = "";
      paramData1.cond_1st = this.properties.options_object;
      paramData1.cond_2nd = { sort: ""};
      param1.data = paramData1;
      param1.success = this.SuccessResult;
      param1.show_WarningCode = this.Show_WarningCode;
      param1.method = "POST";
      param1.param = this;
      util.NetRequest(param1);
    },

    SuccessResult: function (result, param) {
      if (result.Data != undefined) {
        param.setData({
          Sort_item: result.Data[0].items,
          Item_default: result.Data[0].items[0].item_title,
        });
      }
    },

    Show_WarningCode: function (result, param) {
      this.triggerEvent('Show_WarningCode', result)
    },

    Item_toggle: function (e) {
      this.setData({
        Toggle_hide: !this.data.Toggle_hide,
      })
    },

    Change_item: function (e) {
      if (this.data.Item_default != e.currentTarget.dataset.name) {
        this.setData({
          Item_default: e.currentTarget.dataset.name,
          Toggle_hide: true,
        })
        this.triggerEvent('Change_item', e.currentTarget.dataset.value)
      }
    },

  }

})

