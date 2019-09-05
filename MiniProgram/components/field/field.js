const util = require('../../util/util.js');
Component({
  properties: {
    address: {
      type: String,
      value: '',
    },
    address_ATC: {
      type: String,
      value: '',
    },
    address_PHIIC: {
      type: String,
      value: '',
    },
    dbtype: {
      type: String,
      value: '',
    },
  },
  data: {
    currentTab: 0,
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
      //console.log(param.data.address)
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
      var List1 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < result.Data[num].items.length; i++) {
        List1.push({
          item_title:result.Data[num].items[i].item_title,
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
        ATC1: (this.data.ATC_List1_use[e.detail.value].item_title != "不限") ? this.data.ATC_List1_use[e.detail.value].item_title : "",
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
    },

    PickerChange2: function (e) {
      this.setData({
        index2: e.detail.value,
        ATC2: (this.data.ATC_List2_use[e.detail.value].item_title != "不限") ? this.data.ATC_List2_use[e.detail.value].item_title : "",
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
            item_title: this.data.ATC_List3[i].item_title,
            item_val: this.data.ATC_List3[i].item_val,
            pkey: this.data.ATC_List3[i].pkey,
            total: this.data.ATC_List3[i].total,
          });
        }
      }
      this.setData({
        ATC_List3_use: List3,
      })
    },

    PickerChange3: function (e) {
      this.setData({
        index3: e.detail.value,
        ATC3: (this.data.ATC_List3_use[e.detail.value].item_title != "不限") ? this.data.ATC_List3_use[e.detail.value].item_title : "",
        ATC4: "",
        index4: 0,
      })
      var List4 = [{ item_title: "不限", item_val: "", pkey: null, total: 0 }];
      for (var i = 0; i < this.data.ATC_List4.length; i++) {
        if (this.data.ATC_List4[i].pkey == this.data.ATC_List3_use[e.detail.value].item_val) {
          List4.push({
            item_title: this.data.ATC_List4[i].item_title,
            item_val: this.data.ATC_List4[i].item_val,
            pkey: this.data.ATC_List4[i].pkey,
            total: this.data.ATC_List4[i].total,
          });
        }
      }
      this.setData({
        ATC_List4_use: List4,
      })
    },

    PickerChange4: function (e) {
      this.setData({
        index4: e.detail.value,
        ATC4: (this.data.ATC_List4_use[e.detail.value].item_title != "不限") ? this.data.ATC_List4_use[e.detail.value].item_title : "",
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
    },

    ATC_search: function () {
      if (this.data.ATC1 == "" && this.data.ATC2 == "" && this.data.ATC3 == "" && this.data.ATC4 == "") {
        wx.showToast({
          title: 'ATC一级是必选项',
          icon: 'none',
          duration: 2000
        });
      } else {
        wx.navigateTo({
          url: this.data.address_ATC + this.data.ATC1 + "&ATC2=" + this.data.ATC2 + "&ATC3=" + this.data.ATC3 + "&ATC4=" + this.data.ATC4
        })
      }
    },

    PickerChange5: function (e) {
      this.setData({
        index5: e.detail.value,
        zldl: (this.data.PHIIC_List1_use[e.detail.value].item_title != "不限") ? this.data.PHIIC_List1_use[e.detail.value].item_title : "",
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
    },

    PickerChange6: function (e) {
      this.setData({
        index6: e.detail.value,
        zlxl: (this.data.PHIIC_List2_use[e.detail.value].item_title != "不限") ? this.data.PHIIC_List2_use[e.detail.value].item_title : "",
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
    },

    PHIIC_search: function () {
      if (this.data.zldl == "" && this.data.zlxl == "") {
        wx.showToast({
          title: '治疗大类是必选项',
          icon: 'none',
          duration: 2000
        });
      } else {
        wx.navigateTo({
          url: this.data.address_PHIIC + this.data.zldl + "&zlxl=" + this.data.zlxl
        })
      }
    },

    //点击切换 
    tabNav: function (e) {
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        var showMode = e.target.dataset.current == 0;
        this.setData({
          currentTab: e.target.dataset.current,
          isShow: showMode
        })
      }
    },
    //滑动切换 
    swiperTab: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current
      });
    },
  }

})




