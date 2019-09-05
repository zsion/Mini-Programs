const util = require('../../util/util.js');
Component({
  properties: {
    Power: {
      type: Boolean,
      value: '',
    },
    address: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: '',
    },
    addwidth: {
      type: Boolean,
      value: '',
    },
  },
  data: {
    Public_value: "",
    Public_array: [],
    Public_index: 0,
  },
  ready: function () {
    this.load_data();
  },
  methods: {
    
    load_data: function () {
      // 取得下拉框选项
      var param1 = {};
      param1.url = this.data.address;
      var paramData1 = {};
      paramData1.type = this.data.type;
      paramData1.pkey = "";
      param1.data = paramData1;
      param1.success = this.success_Public_array;
      param1.method = "GET";
      param1.param = this;
      util.NetRequest(param1);
    },

    //制造下拉框数组
    success_Public_array: function (result, param) {
      result.Data[0].items.unshift({ pkey: null, item_val: "", item_title: "不限", total: 0 })
      param.setData({
        Public_array: result.Data[0].items
      })
    },

    //选择picker的值
    bind_Public_value: function (e) {
      this.setData({
        Public_index: e.detail.value,
        Public_value: this.data.Public_array[e.detail.value].item_val
      })
      this.triggerEvent('Public_value', this.data.Public_array[e.detail.value].item_val)
    },

    //重置
    custompicker_reset: function () {
      this.setData({
        Public_index: 0,
      })
      this.triggerEvent('Public_value', this.data.Public_array[0].item_val)
    },

  }

})

