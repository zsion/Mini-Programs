var app = getApp();
const util = require('../../util/util.js');

const GetCond2Info = require('../../config').drugapproval.GetCond2Info

//图片地址管理
var url_array = {
  cbrq: '/image/sorth.png', //承办日期
  ypmc: '/image/sort.png', //药品名称
  qymc: '/image/sort.png', //企业名称
  blzt: '/image/sort.png', //办理状态
  ztkssj: '/image/sorth.png', //状态开始时间
}

Component({
  properties: {
    Power: {
      type: Boolean,//用户是否有此数据库权限
      value: '',
    },
    DosageId: {
      type: Array,
      value: '',
    },
    ListingSituation: {
      type: Array,
      value: '',
    },
    DrugTypeId: {
      type: Array,
      value: '',
    },
    ApplyType_NewId: {
      type: Array,
      value: '',
    },
    HandleState_CFDAId: {
      type: Array,
      value: '',
    },
    Conclusion: {
      type: Array,
      value: '',
    },
    ProjectType: {
      type: Array,
      value: '',
    },
    CategoryId: {
      type: Array,
      value: '',
    },
    SubCategoryId: {
      type: Array,
      value: '',
    },
    Use_SubCategoryId: {
      type: Array,
      value: '',
    },

    Update_DosageId: {
      type: Array,
      value: '',
    },
    Update_ListingSituation: {
      type: Array,
      value: '',
    },
    Update_DrugTypeId: {
      type: Array,
      value: '',
    },
    Update_ApplyType_NewId: {
      type: Array,
      value: '',
    },
    Update_HandleState_CFDAId: {
      type: Array,
      value: '',
    },
    Update_Conclusion: {
      type: Array,
      value: '',
    },
    Update_ProjectType: {
      type: Array,
      value: '',
    },
    Update_CategoryId: {
      type: Array,
      value: '',
    },
    Update_SubCategoryId: {
      type: Array,
      value: '',
    },
  },
  data: {
    content_width: wx.getSystemInfoSync().windowWidth,
    content_height: wx.getSystemInfoSync().windowHeight - 40,
    arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },

    Close_item: [
      { type: 2, title:"药品类型", open:true},
      { type: 3, title:"申请类型", open:false},
      { type: 4, title:"办理状态", open:false},
      { type: 5, title:"治疗大类", open:false},
      { type: 7, title:"审评结论", open:false},
      { type: 8, title:"特殊通道", open:false}
    ],

    send_DosageId: "",
    send_ListingSituation: "",
    send_DrugTypeId: "",
    send_ApplyType_NewId: "",
    send_HandleState_CFDAId: "",
    send_CategoryId: "",
    send_SubCategoryId: "",
    send_Conclusion: "",
    send_ProjectType: "",
    
    sort: [
      { value: "0", item_title: "承办日期", open: true, icon: false, img_address: url_array.cbrq},
      { value: "1", item_title: "药品名称", open: false, icon: true, img_address: url_array.ypmc},
      { value: "2", item_title: "企业名称", open: false, icon: true, img_address: url_array.qymc},
      { value: "3", item_title: "办理状态", open: false, icon: true, img_address: url_array.blzt},
      { value: "4", item_title: "状态开始时间", open: false, icon: false, img_address: url_array.ztkssj},
    ],
    send_sort: 0,

  },
  ready: function () {

  },
  methods: {
    //点击切换 
    tabNav: function (e) {

      var num = parseInt(e.target.dataset.current)
      switch (num) {
        case 0:
          this.setData({
            arrow: { arrow0: !this.data.arrow.arrow0, arrow1: false, arrow2: false, arrow3: false },
          })
          break;
        case 1:
          this.setData({
            arrow: { arrow0: false, arrow1: !this.data.arrow.arrow1, arrow2: false, arrow3: false },
          })
          if (this.data.arrow.arrow1 == true) {
            this.triggerEvent('Reset_item', { DosageId: this.properties.Update_DosageId})
          }
          break;
        case 2:
          this.setData({
            arrow: { arrow0: false, arrow1: false, arrow2: !this.data.arrow.arrow2, arrow3: false },
          })
          if (this.data.arrow.arrow2 == true) {
            this.triggerEvent('Reset_item', { ListingSituation: this.properties.Update_ListingSituation})
          }
          break;
        case 3:
          this.setData({
            arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: !this.data.arrow.arrow3 },
          })
          this.data.Close_item.forEach(function (value, index, array) {
            if (value.open == true) {
              if (value.type == 2) {
                this.triggerEvent('Reset_item', { DrugTypeId: this.properties.Update_DrugTypeId })
              } else if (value.type == 3) {
                this.triggerEvent('Reset_item', { ApplyType_NewId: this.properties.Update_ApplyType_NewId })
              } else if (value.type == 4) {
                this.triggerEvent('Reset_item', { HandleState_CFDAId: this.properties.Update_HandleState_CFDAId })
              } else if (value.type == 5) {
                this.triggerEvent('Reset_item', { CategoryId: this.properties.Update_CategoryId, Use_SubCategoryId: this.properties.Update_SubCategoryId})
              } else if (value.type == 7) {
                this.triggerEvent('Reset_item', { Conclusion: this.properties.Update_Conclusion })
              } else if (value.type == 8) {
                this.triggerEvent('Reset_item', { ProjectType: this.properties.Update_ProjectType })
              }
            }
          }, this);
          break;
      }

      this.triggerEvent('Is_arrow', this.data.arrow)

    },

    //重置和确定按钮请求数据通用方法
    Reset_and_Sure: function () {
      this.triggerEvent('Reset_and_Sure', {
        DosageId: this.data.send_DosageId,
        ListingSituation: this.data.send_ListingSituation,
        DrugTypeId: this.data.send_DrugTypeId,
        ApplyType_NewId: this.data.send_ApplyType_NewId,
        HandleState_CFDAId: this.data.send_HandleState_CFDAId,
        CategoryId: this.data.send_CategoryId,
        SubCategoryId: this.data.send_SubCategoryId,
        Conclusion: this.data.send_Conclusion,
        ProjectType: this.data.send_ProjectType,
        sort: this.data.send_sort,
      })
    },

    choice_sort: function (e) {
      this.data.sort.forEach(function (value, index, array) {
        if (e.currentTarget.dataset.index == value.value) {
          value.open = true
          this.setData({
            send_sort: value.value
          });
        } else {
          value.open = false
        }
      }, this);
      this.setData({
        sort: this.data.sort,
        arrow: { arrow0: !this.data.arrow.arrow0, arrow1: false, arrow2: false, arrow3: false },
      });
      this.triggerEvent('Choice_Sort', {
        DosageId: this.data.send_DosageId,
        ListingSituation: this.data.send_ListingSituation,
        DrugTypeId: this.data.send_DrugTypeId,
        ApplyType_NewId: this.data.send_ApplyType_NewId,
        HandleState_CFDAId: this.data.send_HandleState_CFDAId,
        CategoryId: this.data.send_CategoryId,
        SubCategoryId: this.data.send_SubCategoryId,
        Conclusion: this.data.send_Conclusion,
        ProjectType: this.data.send_ProjectType,
        sort: this.data.send_sort,
      })
    },

    //剂型二次筛选
    choice_DosageId: function (e) {
      if (this.data.DosageId[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
        this.data.DosageId[e.currentTarget.dataset.index].open = !this.data.DosageId[e.currentTarget.dataset.index].open
      }
      this.setData({
        DosageId: this.data.DosageId,
      });
    },
    //剂型重置
    cancel_all_arrow1: function () {
      this.data.DosageId.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        DosageId: this.data.DosageId,
        send_DosageId: "",
      });
      this.Reset_and_Sure()
    },
    //剂型确定
    make_sure_arrow1: function () {
      let use_array = []
      this.data.DosageId.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_DosageId: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //上市情况二次筛选
    choice_ListingSituation: function (e) {
      this.data.ListingSituation.forEach(function (value, index, array) {
        if (value.item_title == e.currentTarget.dataset.name) {
          value.open = true
        } else {
          value.open = false
        }
      }, this);
      this.setData({
        ListingSituation: this.data.ListingSituation,
      });
    },
    //上市情况重置
    cancel_all_arrow2: function () {
      this.data.ListingSituation.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        ListingSituation: this.data.ListingSituation,
        send_ListingSituation: "",
      });
      this.Reset_and_Sure()
    },
    //上市情况确定
    make_sure_arrow2: function () {
      let use_array = []
      this.data.ListingSituation.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_ListingSituation: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //药品类型二次筛选
    choice_DrugTypeId: function (e) {
      this.data.DrugTypeId.forEach(function (value, index, array) {
        if (value.item_title == e.currentTarget.dataset.name) {
          value.open = true
        } else {
          value.open = false
        }
      }, this);
      this.setData({
        DrugTypeId: this.data.DrugTypeId,
      });
    },
    //药品类型重置
    cancel_all_DrugTypeId: function () {
      this.data.DrugTypeId.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        DrugTypeId: this.data.DrugTypeId,
        send_DrugTypeId: "",
      });
      this.Reset_and_Sure()
    },
    //药品类型确定
    make_sure_DrugTypeId: function () {
      let use_array = []
      this.data.DrugTypeId.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_DrugTypeId: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //申请类型二次筛选
    choice_ApplyType_NewId: function (e) {
      if (this.data.ApplyType_NewId[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
        this.data.ApplyType_NewId[e.currentTarget.dataset.index].open = !this.data.ApplyType_NewId[e.currentTarget.dataset.index].open
      }
      this.setData({
        ApplyType_NewId: this.data.ApplyType_NewId,
      });
    },
    //申请类型重置
    cancel_all_ApplyType_NewId: function () {
      this.data.ApplyType_NewId.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        ApplyType_NewId: this.data.ApplyType_NewId,
        send_ApplyType_NewId: "",
      });
      this.Reset_and_Sure()
    },
    //申请类型确定
    make_sure_ApplyType_NewId: function () {
      let use_array = []
      this.data.ApplyType_NewId.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_ApplyType_NewId: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //办理状态二次筛选
    choice_HandleState_CFDAId: function (e) {
      if (this.data.HandleState_CFDAId[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
        this.data.HandleState_CFDAId[e.currentTarget.dataset.index].open = !this.data.HandleState_CFDAId[e.currentTarget.dataset.index].open
      }
      this.setData({
        HandleState_CFDAId: this.data.HandleState_CFDAId,
      });
    },
    //办理状态重置
    cancel_all_HandleState_CFDAId: function () {
      this.data.HandleState_CFDAId.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        HandleState_CFDAId: this.data.HandleState_CFDAId,
        send_HandleState_CFDAId: "",
      });
      this.Reset_and_Sure()
    },
    //办理状态确认
    make_sure_HandleState_CFDAId: function () {
      let use_array = []
      this.data.HandleState_CFDAId.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_HandleState_CFDAId: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //审评结论二次筛选
    choice_Conclusion: function (e) {
      if (this.data.Conclusion[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
        this.data.Conclusion[e.currentTarget.dataset.index].open = !this.data.Conclusion[e.currentTarget.dataset.index].open
      }
      this.setData({
        Conclusion: this.data.Conclusion,
      });
    },
    //审评结论重置
    cancel_all_Conclusion: function () {
      this.data.Conclusion.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        Conclusion: this.data.Conclusion,
        send_Conclusion: "",
      });
      this.Reset_and_Sure()
    },
    //审评结论确定
    make_sure_Conclusion: function () {
      let use_array = []
      this.data.Conclusion.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_Conclusion: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //特殊通道二次筛选
    choice_ProjectType: function (e) {
      this.data.ProjectType.forEach(function (value, index, array) {
        if (value.item_title == e.currentTarget.dataset.name) {
          value.open = true
        } else {
          value.open = false
        }
      }, this);
      this.setData({
        ProjectType: this.data.ProjectType,
      });
    },
    //特殊通道重置
    cancel_all_ProjectType: function () {
      this.data.ProjectType.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        ProjectType: this.data.ProjectType,
        send_ProjectType: "",
      });
      this.Reset_and_Sure()
    },
    //特殊通道确定
    make_sure_ProjectType: function () {
      let use_array = []
      this.data.ProjectType.forEach(function (value, index, array) {
        if (value.open == true) {
          use_array.push(value.item_val)
        }
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_ProjectType: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    //选择大类
    choice_CategoryId: function (e) {
      this.data.CategoryId.forEach(function (value, index, array) {
        if (value.item_title == e.currentTarget.dataset.name) {
          value.open = !value.open
        } else {
          value.open = false
        }
      });
      this.setData({
        CategoryId: this.data.CategoryId,
      });
      let use_array = [{ item_title: "全选", item_val: "", open: false, pkey: "", total: "" }]
      let dalei_array = this.data.CategoryId
      this.data.SubCategoryId.forEach(function (value, index, array) {
        if (value.pkey == dalei_array[e.currentTarget.dataset.index].item_val) {
          use_array.push({
            item_title: value.item_title,
            item_val: value.item_val,
            open: value.open,
            pkey: value.pkey,
            total: value.total
          })
        }
      });
      this.setData({
        Use_SubCategoryId: use_array,
      });
    },
    //选择小类
    choice_SubCategoryId: function (e) {
      if (e.currentTarget.dataset.index == 0) {
        if (this.data.Use_SubCategoryId[0].open == false) {
          this.data.Use_SubCategoryId.forEach(function (value, index, array) {
            value.open = true
          });
        } else {
          this.data.Use_SubCategoryId.forEach(function (value, index, array) {
            value.open = false
          });
        }
      } else {
        if (this.data.Use_SubCategoryId[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
          this.data.Use_SubCategoryId[e.currentTarget.dataset.index].open = !this.data.Use_SubCategoryId[e.currentTarget.dataset.index].open
        }
        let newarray = this.data.Use_SubCategoryId.slice(1);
        let use_array = newarray.every(function (item, index, array) {
          return item.open;
        })
        if (use_array == true) {
          this.data.Use_SubCategoryId[0].open = true
        } else {
          this.data.Use_SubCategoryId[0].open = false
        }
      }
      this.setData({
        Use_SubCategoryId: this.data.Use_SubCategoryId,
      });
    },
    //重置治疗领域
    cancel_all_CategoryId: function () {
      this.data.CategoryId.forEach(function (value, index, array) {
        value.open = false
      });
      this.data.Use_SubCategoryId.forEach(function (value, index, array) {
        value.open = false
      });
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        CategoryId: this.data.CategoryId,
        Use_SubCategoryId: this.data.Use_SubCategoryId,
        send_CategoryId: "",
        send_SubCategoryId: "",
      });
      this.Reset_and_Sure()
    },
    //治疗领域确定按钮
    make_sure_CategoryId: function () {
      let newarray = this.data.CategoryId;
      let some_array = newarray.every(function (item, index, array) {
        return item.open == false;
      })
      if (some_array == true) {
        this.setData({
          send_CategoryId: "",
        });
      } else {
        newarray.forEach(function (value, index, array) {
          if (value.open == true) {
            this.setData({
              send_CategoryId: value.item_val,
            });
          }
        }, this);
      }
      let use_array = []
      for (var r = 1; r < this.data.Use_SubCategoryId.length; r++) {
        if (this.data.Use_SubCategoryId[r].open == true) {
          use_array.push(this.data.Use_SubCategoryId[r].item_val)
        }
      }
      this.setData({
        arrow: { arrow0: false, arrow1: false, arrow2: false, arrow3: false },
        send_SubCategoryId: use_array.join(),
      });
      this.Reset_and_Sure()
    },

    change_item: function (e) {
      //console.log(e)
      this.data.Close_item.forEach(function (value, index, array) {
        if (e.currentTarget.dataset.type == value.type) {
          value.open = true
        } else {
          value.open = false
        }
      }, this);
      var num = parseInt(e.currentTarget.dataset.type)
      switch (num) {
        case 2:
          this.triggerEvent('Reset_item', { DrugTypeId: this.properties.Update_DrugTypeId })
          break;
        case 3:
          this.triggerEvent('Reset_item', { ApplyType_NewId: this.properties.Update_ApplyType_NewId })
          break;
        case 4:
          this.triggerEvent('Reset_item', { HandleState_CFDAId: this.properties.Update_HandleState_CFDAId })
          break;
        case 5:
          this.triggerEvent('Reset_item', { CategoryId: this.properties.Update_CategoryId, Use_SubCategoryId: this.properties.Update_SubCategoryId })
          break;
        case 7:
          this.triggerEvent('Reset_item', { Conclusion: this.properties.Update_Conclusion })
          break;
        case 8:
          this.triggerEvent('Reset_item', { ProjectType: this.properties.Update_ProjectType })
          break;
      }
      this.setData({
        Close_item: this.data.Close_item,
      });
    },

    Show_modal: function (e) {
      this.triggerEvent('Show_modal', e)
    },

  }

})
