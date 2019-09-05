import * as echarts from '../components/ec-canvas/echarts';
var app = getApp();
const util = require('../util/util.js');

var GetChart=[]
var barChart0 = null;
// var barChart1 = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Jurisdiction:false,
    windowHeight: "",
    listarr: [],//创建数组
    keydown_number: 0,//检测input框内是否有内容
    input_value: "",//value值
    hostarr: [],//热门搜索接收请求存储数组  
    ctrldic: {
      hidden: true,
    },
    isShow: true,
    currentTab: 0,
    togglenum: 0,
    currentsTab123: 0,
    Declaration: 0,
    Application: 0,
    UndertakeInfo: {
      Data:[],
      index:0,
    },
   
  
    EnterTopInfo: {
      Data: [],
      index: 0,
    },
    BrandInfo: {
      Data: [],
      index: 0,
    },

    canvas_width: "",
    
    ecBar0: {
      onInit: function (canvas, width, height) {
        barChart0 = echarts.init(canvas, null, {
          width: wx.getSystemInfoSync().windowWidth*0.95,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart0);
        return barChart0;
      }
    },

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var res = wx.getSystemInfoSync()
      this.setData({ windowHeight: (res.windowHeight - 185) + 'px' })
    } catch (e) {

    }
    this.setData({
      canvas_width: wx.getSystemInfoSync().windowWidth,
      // 'ctrllistscroll.hidden': false,
    })
   
    //读取缓存历史搜索记录
    let This = this;
    wx.getStorage({
      key: 'list_arr',
      success: function (res) {
        This.setData({
          listarr: res.data
        })
      }
    })
    
    this.Undertake();
    this.EnterTop();
    this.BrandConcern();
    this.HotKeywords();

    this.setData({
      'Jurisdiction': wx.getStorageSync('auth').DrugApproval,

    })
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
   
  },
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
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
  /**
   * 药品通用名获得焦点
   */
  yptymFocus: function (e) {
    this.setData({
      'ctrldic.hidden': false,
    })
  },
  // 键盘输入的事件
  yptymInput: function (e) {
    var input = e.detail.value; // 获取当前表单元素输入框内容
    this.setData({
      'ctrldic.hidden': false,
      "input_value": e.detail.value
    })
  },

  /**
  * 药品通用名取消按钮操作
  */
  yptymCancel: function (e) {   
    this.setData({
      'ctrldic.hidden': true,
     
    })
  },
  tabNavs: function (e) {
    if (this.data.currentsTab123 === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentsTab123: e.currentTarget.dataset.current,
      })
    }
  },

  // 获取承办/审批趋势
  Undertake: function () {

    //获取下拉框选项
    var param = {};
    param.url = "/api/DrugApproval/GetTendencyChart";

    var paramdata = {};
    //参数
    paramdata.type=-1;
    param.data = paramdata;
    //成功回调函数
    param.success = this.successGetUndertake;
    //请求方法
    param.method = "GET",
      //辅助参数
    param.param = {};
    util.NetRequest(param);

  }, 
  successGetUndertake: function (data, param) {
    var UndertakeInfo = data.Data;
    var UndertakeData = [];
    var num1=0;
    var num2 = 0;
    var list1 = [{ type: -1 }, { type: -1 }, { type: -1}];
    var list2 = [{ type: -1 }, { type: -1 }, { type: -1}];
    for (var i = 0; i < UndertakeInfo.length; i++) {
      UndertakeInfo[i].index = 0;
       
        if (UndertakeInfo[i].type == 0 || UndertakeInfo[i].type == 3) {
          UndertakeInfo[i].title = "申报时间趋势";
          if (UndertakeInfo[i].type == 0) {
            num1++;
            list1[0] = UndertakeInfo[i];
          } else {
            num2++;
            list2[0] = UndertakeInfo[i];
          }
        } else if (UndertakeInfo[i].type == 1 || UndertakeInfo[i].type == 4) {
          for (var t = 0; t < UndertakeInfo[i].charts.length; t++) {
            var MoreCount = [];
            
            for (var s = 0; s < UndertakeInfo[i].charts[t].group.length; s++) {
              if (UndertakeInfo[i].charts[t].group[s]=="一致性评价"){
                UndertakeInfo[i].charts[t].group[s] = {
                  "Name":UndertakeInfo[i].charts[t].group[s],
                  "istrue":true,
                }
              }else{
                UndertakeInfo[i].charts[t].group[s] = {
                  "Name": UndertakeInfo[i].charts[t].group[s],
                  
                }
              }
            
            }


            for (var s = 0; s < UndertakeInfo[i].charts[t].data.length; s++) {
            
              MoreCount = MoreCount.concat(UndertakeInfo[i].charts[t].data[s])
            }
            //为数据添加最大值
            var max = Math.max.apply(null, MoreCount);
            UndertakeInfo[i].charts[t].max = max;
          }
          UndertakeInfo[i].title = "申请类型分布";
          if (UndertakeInfo[i].type == 1) {
            num1++;
            list1[1] = UndertakeInfo[i];
          } else {
            num2++;
            list2[1] = UndertakeInfo[i];
          }
        } else if (UndertakeInfo[i].type == 2 || UndertakeInfo[i].type == 5) {
          //对数据进行排序
          for (var t = 0; t < UndertakeInfo[i].charts.length; t++) {
            var MoreCount = [];
            for (var s = 0; s < UndertakeInfo[i].charts[t].data.length; s++) {
              //根据数字大小倒序
              UndertakeInfo[i].charts[t].data[s].TypeList.sort(function (a, b) {
                var aa = a.Code;
                var bb = b.Code;
                //去除汉字
                var reg = /[\u4e00-\u9fa5]/g;
                aa = aa.replace(reg, "");
                bb = bb.replace(reg, "");  

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
                return aa - bb;
              });
              for (var f = 0; f < UndertakeInfo[i].charts[t].data[s].TypeList.length; f++) {
                MoreCount.push(UndertakeInfo[i].charts[t].data[s].TypeList[f].Count);
              }
            }
            //为数据添加最大值
            var max = Math.max.apply(null, MoreCount);
            UndertakeInfo[i].charts[t].max = max;
          }
          UndertakeInfo[i].title = "注册类型分布";
          if (UndertakeInfo[i].type == 2){
            num1++;
            list1[2] = UndertakeInfo[i];
          }else{
            num2++;
            list2[2] = UndertakeInfo[i];
          }
        }        
      
    };
    if (num1 >= 1) {
      UndertakeData.push({
        list: list1,
        tabtitle: "最新承办",
      })
    }
    if (num2>= 1) {
      UndertakeData.push({
        list: list2,
        tabtitle: "最新审结",
      })
    }
    this.setData({
      "UndertakeInfo.Data": UndertakeData,
      // 'ctrllistscroll.hidden': true,
    })

    this.BindChart();
  },
  //企业TOP榜
  EnterTop: function () {
    //获取下拉框选项
    var param = {};
    param.url = "/api/DrugApproval/GetCompanyTop";

    var paramdata = {};
    //参数
    param.data = paramdata;
    //成功回调函数
    param.success = this.successGetEnterTopData;
    //请求方法
    param.method = "GET",
    //辅助参数
    param.param = {};
    util.NetRequest(param);
  }, 
  successGetEnterTopData: function (data, param) {
    var EnterTopData = data.Data;
    for (var i = 0; i < EnterTopData.length; i++) {
      //对申请类型进行处理
      var listArr = [];
      var Controlment2 = [].concat(EnterTopData[i].list);
      Controlment2.forEach(function (el, index) {
        for (var s = 0; s < listArr.length; s++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr[s].cate1 == el.cate1) {
            listArr[s].listInfo.push({
              cate2: el.cate2,
              name: el.name,
              no: el.no,
              total: el.total,
            });
            return;
          }
        }
        listArr.push({
          cate1: el.cate1,
          listInfo: [{
            cate2: el.cate2,
            name: el.name,
            no: el.no,
            total: el.total,
          }]
        });
      });

      //对药品类型进行处理
      for (var t = 0; t < listArr.length; t++) {
        var listArr2 = [];
        var Controlment3 = [].concat(listArr[t].listInfo);

        Controlment3.forEach(function (el, index) {
          for (var s = 0; s < listArr2.length; s++) {
            // 对比相同的字段key，相同放入对应的数组
            if (listArr2[s].cate2 == el.cate2) {
              listArr2[s].listInfo.push({
                name: el.name,
                no: el.no,
                total: el.total,
              });
              return;
            }
          };
          listArr2.push({
            cate2: el.cate2,
            listInfo: [{
              name: el.name,
              no: el.no,
              total: el.total,
            }],
          });
        });
        for (var s = 0; s < listArr2.length; s++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr2[s].listInfo.length > 10) {
            listArr2[s].ShowMore = 0;
          } else {
            listArr2[s].ShowMore = 2;
          }
        };

        listArr[t].listInfo = listArr2;
        listArr[t].index = 0;
        listArr[t].hidden = true;
      }
      EnterTopData[i].list = listArr;
    }
    
    this.setData({
      "EnterTopInfo.Data": EnterTopData,
    })
  },
  //品牌关注榜
  BrandConcern: function () {
    //获取下拉框选项
    var param = {};
    param.url = "/api/DrugApproval/GetDurgTop";

    var paramdata = {};
    //参数
    paramdata.type = -1;
    param.data = paramdata;
    //成功回调函数
    param.success = this.successGetBrandConcern;
    //请求方法
    param.method = "GET",
    //辅助参数
    param.param = {};
    util.NetRequest(param);
  },
  successGetBrandConcern: function (data, param) {
    var BrandData = [];
    var BrandDataInfo = data.Data;
    var list1 = [];
    var list2 = [];
    for (var i = 0; i < BrandDataInfo.length; i++) {
      BrandDataInfo[i].index = 0;
      if (BrandDataInfo[i].type == 0 || BrandDataInfo[i].type == 1 || BrandDataInfo[i].type == 2 || BrandDataInfo[i].type == 3) {
        list1.push(BrandDataInfo[i])
      } else {
        list2.push(BrandDataInfo[i])
      }
    };
    if (list1.length >= 1) {
      BrandData.push({
        list: list1,
        tabtitle: "最新承办",
      })
    }

    if (list2.length >= 1) {
      BrandData.push({
        list: list2,
        tabtitle: "最新审结",
      })
    }
    this.setData({
      "BrandInfo.Data": BrandData,
    })
  },
  //获取热门的关键词
  HotKeywords: function () {
    var param1 = {};
    param1.url = "/api/DrugApproval/GetKeywords";
    var paramData = {};
    param1.data = paramData;
    param1.success = this.successGetKeywords;
    param1.method = "GET",
    param1.param = {};
    util.NetRequest(param1);
  }, 
  successGetKeywords: function (result, param) {
    this.setData({
      hostarr: result.Data
    })
  },
  //内容的切换，外层如最新承办、最新审结
  TitleChange:function(e){
    var num = e.currentTarget.dataset.num;
    var value = e.currentTarget.dataset.open;
    
    if (this.data[value].index === num) {
      return false;
    } else {
      
      this.setData({
        [value + '.index']: num,
      })
      if (value == "UndertakeInfo") {
        this.BindChart();
      }
    }
  }, 
  //药品的展开
  btnCondOpen: function (e) {
    var num = e.currentTarget.dataset.num;
    var EnterTopData = this.data.EnterTopInfo.Data;
    var Index = this.data.EnterTopInfo.index;
    for (var i = 0; i < EnterTopData[Index].list.length; i++) {
      if (num==i){
        EnterTopData[Index].list[i].hidden = !EnterTopData[Index].list[i].hidden;
      }
    }
    this.setData({
      "EnterTopInfo.Data": EnterTopData,
    });
  },
  //内容的统一切换
  btnCategory:function(e) {
    var num = e.currentTarget.dataset.num;
    var father_index = e.currentTarget.dataset.father;
    var Type = e.currentTarget.dataset.type;
    var Name = e.currentTarget.dataset.open;
    var ValueData = this.data[Name].Data;
    var Index = this.data[Name].index;
    for (var i = 0; i < ValueData[Index].list.length; i++) {
      if (father_index == i) {
        if (ValueData[Index].list[i].index == num){
          return false;
        }else{
          ValueData[Index].list[i].index = num;
          if (Name == "EnterTopInfo") {
            ValueData[Index].list[i].hidden = true;
          } else if (Name == "UndertakeInfo" && Type !="type3") {
            this.BindChart();
          }
        }
      }
    }
    this.setData({
      [Name + '.Data']: ValueData,
    });
  },
  //chart的绑定
  BindChart:function() {
    var UndertakeData = this.data.UndertakeInfo.Data[this.data.UndertakeInfo.index].list; 
   
    for (var i = 0; i < UndertakeData.length; i++) {
      if (UndertakeData[i].type == 0 || UndertakeData[i].type == 3){
    
        barChart0.setOption(this.getBarOption0(UndertakeData[i].charts[UndertakeData[i].index]));
        var that = this;

      } 

    }
  },
  getBarOption0: function (OptionData) {
    var series_data = [];
    var colors = ['#89A6FF', '#F5A623', '#FF9786', '#8CD1F9', '#54C399'];  
    
    for (var i = 0; i < OptionData.data.length; i++) {

        series_data.push({
          name: OptionData.legend[i],
          type: 'line',
          data: OptionData.data[i],
          itemStyle: {
            normal: {
              color: colors[i],//折线点的颜色
              lineStyle: {
                width: 4,
                color: colors[i],//折线的颜色
              }
            }
          },
        })
    }
    var option= {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: OptionData.legend,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: OptionData.group,
        }
      ],
      yAxis: [
        {
          type: 'value',
        }
      ],
      series: series_data,
    };
    return option;
  },
  getBarOption1: function (OptionData){
    var series_data = [];
    for (var i = 0; i < OptionData.data.length; i++) {
      if (i==0){
        series_data.push({
          name: OptionData.legend[i],
          type: 'bar',
          data: OptionData.data[i],
          barWidth: 15,
          barGap: '4%',/*多个并排柱子设置柱子之间的间距*/
          barCategoryGap: '2%',/*多个并排柱子设置柱子之间的间距*/
          itemStyle: {
            normal: {
              color: '#55BEC1',
              lineStyle: {
                width: 4,
                color: '#55BEC1',//折线的颜色
              }
            }
          },
        })
      }else{
        series_data.push({
          name: OptionData.legend[i],
          type: 'bar',
          data: OptionData.data[i],
          barWidth: 15,
          barGap: '4%',/*多个并排柱子设置柱子之间的间距*/
          barCategoryGap: '2%',/*多个并排柱子设置柱子之间的间距*/
          itemStyle: {
            normal: {
              color: '#4A90E2'
            }
          },
        })
      }
    }
    
 
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: OptionData.legend,
      },

      calculable: true,
      xAxis: [
        {
          type: 'value',
          axisLine: {
            show: false
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: OptionData.group,
          axisLabel: {
            interval: 0,
            rotate: 90,
            margin: 2,
            textStyle: {
              color: "#222"
            }
          },
        }
        
      ],
      series: series_data,
    };
    ;
    return option;
  },
  //大于十条切换展开更多
  ToggleMore: function (e) {
    var father_index = e.currentTarget.dataset.father;
    var Name = e.currentTarget.dataset.open;
    var ValueData = this.data[Name].Data;
    var Index = this.data[Name].index;
    for (var i = 0; i < ValueData[Index].list.length; i++) {
      if (father_index == i) {
        if (ValueData[Index].list[i].listInfo[ValueData[Index].list[i].index].ShowMore==0){
          ValueData[Index].list[i].listInfo[ValueData[Index].list[i].index].ShowMore = 1
        }else{
          ValueData[Index].list[i].listInfo[ValueData[Index].list[i].index].ShowMore = 0
        }
        
      }
    }
    this.setData({
      [Name + '.Data']: ValueData,
    });
  },
  //搜索方法
  docha: function () {

    if (this.data.input_value.trim() != ""){
      let This = this;
      //把获取的input值插入数组里面
      let arr = this.data.listarr;
      let arr_num = arr.indexOf(this.data.input_value);
 
      if (arr_num != -1) {
        arr.splice(arr_num, 1)
        arr.unshift(this.data.input_value);
      } else {
        arr.unshift(this.data.input_value);
      }
      //大于五条删除
      if (arr.length > 5) {
        var marr = [];
        for (var i = 0; i < 5; i++) {
          marr.push(arr[i]);
        }
        //存储搜索记录
        wx.setStorage({
          key: "list_arr",
          data: marr
        })
      } else {
        //存储搜索记录
        wx.setStorage({
          key: "list_arr",
          data: arr
        })
      }
    
      wx.navigateTo({
        url: "list?O_Keywords=" + encodeURIComponent(this.data.input_value),
      })
    }else{
      wx.showToast({
        title: '请输入检索条件',
        icon: 'none',
        duration: 2000
      });
    }
 
  },
  //点击键盘上完成按钮
  yptymConfirm: function () {
    this.docha();
  },
  //点击赋值到input框
  this_value: function (e) {
    let value = e.currentTarget.dataset.text;
    this.setData({
      input_value: value,
    })
    this.docha();
  },


})
