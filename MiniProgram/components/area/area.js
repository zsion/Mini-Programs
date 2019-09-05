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
    dbtype: {
      type: String,
      value: '',
    },
  },
  data: {
    toggle_hide: true,
    item_name: "ATC",
    item_list: ["ATC", "CPHIIC"],
    ATC_List1: [],
    ATC_List2: [],
    ATC_List3: [],
    ATC_List4: [],
    ATC_List1_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    ATC_List2_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    ATC_List3_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    ATC_List4_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    PHIIC_List1: [],
    PHIIC_List2: [],
    PHIIC_List1_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    PHIIC_List2_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    index5: 0,
    index6: 0,
    ATC1: "",
    ATC2: "",
    ATC3: "",
    ATC4: "",
    zldl: "",
    zlxl: ""
  },
  ready: function () {
    //请求领域检索数据
    var param1 = {};
    param1.url = this.data.address;
    var paramData1 = {};
    paramData1.type = -1;
    paramData1.dbtype = this.data.dbtype;
    param1.data = paramData1;
    param1.success = this.success_GetSelectInfo;
    param1.method = "GET";
    param1.param = this,
    util.NetRequest(param1);
  },
  methods : {

    success_GetSelectInfo:  (result, param) => {
      for (var i = 0; i < result.Data.length; i++) {
        if (result.Data[i].type == 0) {
          param.creat_PHIIC_List1(result, param, i);
        } else if (result.Data[i].type == 1) {
          param.creat_PHIIC_List2(result, param, i);
        } else if (result.Data[i].type == 2) {
          param.creat_ATC_List1(result, param, i);
        } else if (result.Data[i].type == 3) {
          param.creat_ATC_List2(result, param, i);
        } else if (result.Data[i].type == 4) {
          param.creat_ATC_List3(result, param, i);
        } else if (result.Data[i].type == 5) {
          param.creat_ATC_List4(result, param, i);
        }
      }

    },

    creat_ATC_List1: function (result, param, num) {
      //console.log(result)
      var List1 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < result.Data[num].items.length; i++) {
        List1.push({
          item_title: result.Data[num].items[i].item_title,
          item_val: result.Data[num].items[i].item_val,
          pkey: result.Data[num].items[i].pkey,
          total: result.Data[num].items[i].total,
        });
      }
      this.setData({
        ATC_List1: List1,
        ATC_List1_use: List1,
      })
    },

    creat_ATC_List2: function (result, param, num) {
      this.setData({
        ATC_List2: result.Data[num].items,
      })
    },
    creat_ATC_List3: function (result, param, num) {
      this.setData({
        ATC_List3: result.Data[num].items,
      })
    },
    creat_ATC_List4: function (result, param, num) {
      this.setData({
        ATC_List4: result.Data[num].items,
      })
    },

    creat_PHIIC_List1: function (result, param, num) {
      var List5 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < result.Data[num].items.length; i++) {
        List5.push({
          item_title: result.Data[num].items[i].item_title,
          item_val: result.Data[num].items[i].item_val,
          pkey: result.Data[num].items[i].pkey,
          total: result.Data[num].items[i].total,
        });
      }
      this.setData({
        PHIIC_List1: List5,
        PHIIC_List1_use: List5,
      })
    },
    creat_PHIIC_List2: function (result, param, num) {
      this.setData({
        PHIIC_List2: result.Data[num].items,
      })
    },

    PickerChange1: function (e) {
      this.setData({
        index1: e.detail.value,
        ATC1: (this.data.ATC_List1_use[e.detail.value].item_title != "不限") ? this.data.ATC_List1_use[e.detail.value].item_val : "",
        ATC_List4_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        ATC_List3_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        ATC4: "",
        ATC3: "",
        ATC2: "",
        index4: 0,
        index3: 0,
        index2: 0,
      })
      var List2 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < this.data.ATC_List2.length; i++) {
        if (this.data.ATC_List2[i].pkey == this.data.ATC_List1_use[e.detail.value].item_val) {
          List2.push({
            item_title: this.data.ATC_List2[i].item_title,
            item_val: this.data.ATC_List2[i].item_val,
            pkey: this.data.ATC_List2[i].pkey,
            total: this.data.ATC_List2[i].total,
          });
        }
      }
      this.setData({
        ATC_List2_use: List2,
      })
      this.triggerEvent('ATC', {
        ATC1: this.data.ATC1,
        ATC2: this.data.ATC2,
        ATC3: this.data.ATC3,
        ATC4: this.data.ATC4,
      })
    },

    PickerChange2: function (e) {
      this.setData({
        index2: e.detail.value,
        ATC2: (this.data.ATC_List2_use[e.detail.value].item_title != "不限") ? this.data.ATC_List2_use[e.detail.value].item_val : "",
        ATC_List4_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        ATC4: "",
        ATC3: "",
        index4: 0,
        index3: 0,
      })
      var List3 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < this.data.ATC_List3.length; i++) {
        if (this.data.ATC_List3[i].pkey == this.data.ATC_List2_use[e.detail.value].item_val) {
          List3.push({ 
            item_title:this.data.ATC_List3[i].item_title,
            item_val: this.data.ATC_List3[i].item_val,
            pkey: this.data.ATC_List3[i].pkey,
            total: this.data.ATC_List3[i].total,
          });
        }
      }
      this.setData({
        ATC_List3_use: List3,
      })
      this.triggerEvent('ATC', {
        ATC1: this.data.ATC1,
        ATC2: this.data.ATC2,
        ATC3: this.data.ATC3,
        ATC4: this.data.ATC4,
      })
    },

    PickerChange3: function (e) {
      this.setData({
        index3: e.detail.value,
        ATC3: (this.data.ATC_List3_use[e.detail.value].item_title != "不限") ? this.data.ATC_List3_use[e.detail.value].item_val : "",
        ATC4: "",
        index4: 0,
      })
      var List4 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < this.data.ATC_List4.length; i++) {
        if (this.data.ATC_List4[i].pkey == this.data.ATC_List3_use[e.detail.value].item_val) {
          List4.push({ 
            item_title:this.data.ATC_List4[i].item_title,
            item_val: this.data.ATC_List4[i].item_val,
            pkey: this.data.ATC_List4[i].pkey,
            total: this.data.ATC_List4[i].total,
          });
        }
      }
      this.setData({
        ATC_List4_use: List4,
      })
      this.triggerEvent('ATC', {
        ATC1: this.data.ATC1,
        ATC2: this.data.ATC2,
        ATC3: this.data.ATC3,
        ATC4: this.data.ATC4,
      })
    },

    PickerChange4: function (e) {
      this.setData({
        index4: e.detail.value,
        ATC4: (this.data.ATC_List4_use[e.detail.value].item_title != "不限") ? this.data.ATC_List4_use[e.detail.value].item_val : "",
      })
      this.triggerEvent('ATC', {
        ATC1: this.data.ATC1,
        ATC2: this.data.ATC2,
        ATC3: this.data.ATC3,
        ATC4: this.data.ATC4,
      })
    },

    PickerChange5: function (e) {
      this.setData({
        index5: e.detail.value,
        zldl: (this.data.PHIIC_List1_use[e.detail.value].item_title != "不限") ? this.data.PHIIC_List1_use[e.detail.value].item_val : "",
        zlxl: "",
        index6: 0,
      })
      var List6 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < this.data.PHIIC_List2.length; i++) {
        if (this.data.PHIIC_List2[i].pkey == this.data.PHIIC_List1_use[e.detail.value].item_val) {
          List6.push({
            item_title: this.data.PHIIC_List2[i].item_title,
            item_val: this.data.PHIIC_List2[i].item_val,
            pkey: this.data.PHIIC_List2[i].pkey,
            total: this.data.PHIIC_List2[i].total,
          });
        }
      }
      this.setData({
        PHIIC_List2_use: List6,
      })
      this.triggerEvent('PHIIC', {
        zldl: this.data.zldl,
        zlxl: this.data.zlxl,
      })
    },

    PickerChange6: function (e) {
      this.setData({
        index6: e.detail.value,
        zlxl: (this.data.PHIIC_List2_use[e.detail.value].item_title != "不限") ? this.data.PHIIC_List2_use[e.detail.value].item_val : "",
      })
      this.triggerEvent('PHIIC', {
        zldl: this.data.zldl,
        zlxl: this.data.zlxl,
      })
    },

    ATC_reset: function () {
      this.setData({
        ATC_List2_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        ATC_List3_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        ATC_List4_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        ATC1: "",
        ATC2: "",
        ATC3: "",
        ATC4: "",
      })
      this.triggerEvent('ATC', {
        ATC1: this.data.ATC1,
        ATC2: this.data.ATC2,
        ATC3: this.data.ATC3,
        ATC4: this.data.ATC4,
      })
    },

    PHIIC_reset: function () {
      this.setData({
        PHIIC_List2_use: [{ item_title: "不限", item_val: "", pkey: null, total: 0 }],
        index5: 0,
        index6: 0,
        zldl: "",
        zlxl: "",
      })
      this.triggerEvent('PHIIC', {
        zldl: this.data.zldl,
        zlxl: this.data.zlxl,
      })
    },

    item_toggle_wrap: function (e) {
      if (this.data.toggle_hide == false){
        this.item_toggle()
      }
    },

    item_toggle: function (e) {
      //console.log(e)
      this.setData({
        toggle_hide: !this.data.toggle_hide,
      })
    },

    change_item: function (e) {
      //console.log(e)
      if (this.data.item_name != e.currentTarget.dataset.name) {
        if (e.currentTarget.dataset.name == "ATC"){
          this.PHIIC_reset()
        }else{
          this.ATC_reset()
        }
      }
      this.setData({
        toggle_hide: true,
        item_name: e.currentTarget.dataset.name,
      })
      
    },

    
  }

})




