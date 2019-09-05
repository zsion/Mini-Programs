Component({
  properties: {
    Power: {
      type: Boolean,//用户是否有此数据库权限
      value: '',
    },
    Name_Array: {
      type: Array,//二次筛选内容
      value: '',
    },
    Tool_Name_Array: {
      type: Array,//点击任意tab重置则重置二次筛选内容
      value: '',
    },
    SubCategoryId: {
      type: Array,//治疗小类
      value: '',
    },
    Special_CategoryId: {
      type: String,//此数据库接口中，大类对应的type值
      value: '',
    },
    Special_SubCategoryId:{
      type: String,//此数据库接口中，小类对应的type值
      value: '',
    },
    Top: {
      type: String,//二次筛选有没有副标题（例如中国橙皮书）
      value: '',
    },
  },
  data: {
    content_height: wx.getSystemInfoSync().windowHeight - 40,
    Field: {},//点击的确定按钮是哪个
  },
  ready: function () {
    
  },
  methods: {

    //切换
    tabNav:function(e){
      this.setData({
        Name_Array: this.properties.Tool_Name_Array,
      });
      this.properties.Name_Array.forEach(function (value, index, array) {
        if (index == e.currentTarget.dataset.current) {
          value.Open = !value.Open
        } else {
          value.Open = false
        }
      }, this);
      this.setData({
        Name_Array: this.properties.Name_Array,
      });
      this.triggerEvent('Name_Array', this.properties.Name_Array)
    },

    //选择大类
    Choice_CategoryId:function(e){
      
      this.properties.Name_Array.forEach(function (value, index, array) {
        if (e.currentTarget.dataset.type == value.type) {
          value.items.forEach(function (values, indexs, arrays) {
            if (values.item_title == e.currentTarget.dataset.name) {
              values.open = !values.open
            } else {
              values.open = false
            }
          },this);
        }
      }, this);

      let Use_array = [{ item_title: "全选", item_val: "", open: false, pkey: "", total: "" }]
      this.properties.Name_Array.forEach(function (value, index, array) {
        if (value.type == this.properties.Special_SubCategoryId) {
          value.items.forEach(function (values, indexs, arrays) {
            if (values.pkey == e.currentTarget.dataset.item_val) {
              if (indexs == 0){
                Use_array[0].open = values.open
              }
              Use_array.push({
                item_title: values.item_title,
                item_val: values.item_val,
                open: values.open,
                pkey: values.pkey,
                total: values.total
              })
            }
          }, this);
          
        }
      }, this);

      this.setData({
        Name_Array: this.properties.Name_Array,
        SubCategoryId: Use_array,
      });
    },

    //选择小类
    Choice_SubCategoryId:function(e){
      if (e.currentTarget.dataset.index == 0) {
        if (this.properties.SubCategoryId[0].open == false) {
          this.properties.SubCategoryId.forEach(function (value, index, array) {
            value.open = true
          });
        } else {
          this.properties.SubCategoryId.forEach(function (value, index, array) {
            value.open = false
          });
        }
      } else {
        if (this.properties.SubCategoryId[e.currentTarget.dataset.index].item_title == e.currentTarget.dataset.name) {
          this.properties.SubCategoryId[e.currentTarget.dataset.index].open = !this.properties.SubCategoryId[e.currentTarget.dataset.index].open
        }
        let newarray = this.properties.SubCategoryId.slice(1);
        let use_array = newarray.every(function (item, index, array) {
          return item.open;
        })
        if (use_array == true) {
          this.properties.SubCategoryId[0].open = true
        } else {
          this.properties.SubCategoryId[0].open = false
        }
      }
      this.setData({
        SubCategoryId: this.properties.SubCategoryId,
      });
      this.triggerEvent('SubCategoryId', this.properties.SubCategoryId)
    },

    //非大类小类则使用此方法
    Choice: function (e) {
      this.properties.Name_Array.forEach(function (value, indexs, array) {
        if (e.currentTarget.dataset.type == value.type){
          if (e.currentTarget.dataset.control_type == 1){
            value.items[e.currentTarget.dataset.index].open = !value.items[e.currentTarget.dataset.index].open
          } else if (e.currentTarget.dataset.control_type == 0){
            value.items.forEach(function (values, indexs, arrays) {
              values.open = false
            }, this);
            value.items[e.currentTarget.dataset.index].open = !value.items[e.currentTarget.dataset.index].open
          } else if (e.currentTarget.dataset.control_type == 2){
            value.items.forEach(function (values, indexs, arrays) {
              values.open = false
            }, this);
            value.items[e.currentTarget.dataset.index].open = !value.items[e.currentTarget.dataset.index].open
            this.setData({
              Field: {
                Field_Type: value.type,
                Field_Array: value.items.filter((v, i) => (v.open == true)),
              }
            });
            this.triggerEvent('Field', this.data.Field)
          }
        }
      }, this);
      this.setData({
        Name_Array: this.properties.Name_Array,
      });
    },

    //确定
    Sure: function (e) {
      this.properties.Name_Array.forEach(function (value, indexs, array) {
        if (e.currentTarget.dataset.type == value.type) {
          this.setData({
            Field:{
              Field_Type: value.type,
              Field_Array: value.items.filter((v, i) => (v.open == true)),
            }
          });
        }
      }, this);
      this.triggerEvent('Field', this.data.Field)
    },

    //重置
    Reset: function (e) {
      this.properties.Name_Array.forEach(function (value, indexs, array) {
        if (e.currentTarget.dataset.type == value.type) {
          this.triggerEvent('Reset', e.currentTarget.dataset.type)
        }
      }, this);
    },

    Show_modal: function (e) {
      this.triggerEvent('Show_modal', e)
    },

  }
  
})