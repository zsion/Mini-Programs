import * as echarts from '../components/ec-canvas/echarts';
var app = getApp();
const util = require('../util/util.js');

const GetChart = require('../config').Sales.GetChart
const GetInfo = require('../config').Sales.GetInfo

//图片地址管理
var url_array = new Array(
  app.globalData.imgUrl + '/img/bar/1.png', //第一張
  app.globalData.imgUrl + '/img/search/1.png', //查看更多的眼睛
)

var barChart1 = {};
var barChart2 = {};
var barChart3 = {};
var barChart4 = {};
var barChart5 = {};
var barChart6 = {};
var barChart7 = {};

Page({
  data: {
    imgUrl: url_array,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    tabArray: {
      tabHdIndex: 0,
      tabBdIndex: 0
    },
    switch_con: [],
    click_type: "",
    tab_active: "",
    chart_hidden: true,
    hidden: true,
    Code_moadl: true,
    canvas_width: "",
    search_Type: "",
    search_Con: "",
    Drug: "",
    Company: "",
    ATC1: "",
    ATC2: "",
    ATC3: "",
    ATC4: "",
    Category: "",
    SubCategory: "",
    Dosage: "",
    Region: "",
    type: [],
    color:[],
    ecBar1: {
      onInit: function (canvas, width, height) {
        barChart1 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart1);
        return barChart1;
      }
    },
    ecBar2: {
      onInit: function (canvas, width, height) {
        barChart2 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart2);
        return barChart2;
      }
    },
    ecBar3: {
      onInit: function (canvas, width, height) {
        barChart3 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart3);
        return barChart3;
      }
    },
    ecBar4: {
      onInit: function (canvas, width, height) {
        barChart4 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart4);
        return barChart4;
      }
    },
    ecBar5: {
      onInit: function (canvas, width, height) {
        barChart5 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart5);
        return barChart5;
      }
    },
    ecBar6: {
      onInit: function (canvas, width, height) {
        barChart6 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart6);
        return barChart6;
      }
    },
    ecBar7: {
      onInit: function (canvas, width, height) {
        barChart7 = echarts.init(canvas, {}, {
          width: wx.getSystemInfoSync().windowWidth,
          height: wx.getSystemInfoSync().windowWidth
        });
        canvas.setChart(barChart7);
        return barChart7;
      }
    },

  },
  onLoad: function (options) {
    //console.log(options)
    //设置canvas的宽度和高度
    this.setData({
      canvas_width: wx.getSystemInfoSync().windowWidth,
      search_Type: options.search_Type,
      search_Con: (options.search_Con != undefined) ? decodeURIComponent(options.search_Con) : "",
    })
    if (options.search_Type == 0){
      this.setData({
        switch_con: ["剂型细分", "企业细分", "地区细分"], 
        type:[0, 1, 2, 3, 4],
        // Drug: options.search_Con
        Drug: decodeURIComponent(options.search_Con)
      })
    } else if (options.search_Type == 1){
      this.setData({
        switch_con: ["药品细分", "ATC一级分类", "地区细分"],
        type: [0, 1, 5, 6, 4],
        // Company: options.search_Con
        Company: decodeURIComponent(options.search_Con)
      })
    } else if (options.search_Type == 2){
      this.setData({
        switch_con: ["药品细分", "企业细分", "剂型细分"],
        type: [0, 1, 5, 3, 2],
        ATC1: options.ATC1,
        ATC2: options.ATC2,
        ATC3: options.ATC3,
        ATC4: options.ATC4,
      })
    } else if (options.search_Type == 3) {
      this.setData({
        switch_con: ["药品细分", "企业细分", "剂型细分"],
        type: [0, 1, 5, 3, 2],
        Category: options.zldl,
        SubCategory: options.zlxl,
      })
    }
    this.setData({
      tab_active: this.data.switch_con[0]
    })

    this.Load_data()

  },

  //加载列表
  Load_data: function () {
    // 统计次数
    var param1 = {};
    param1.url = GetInfo;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    param1.data = paramData1;
    param1.success = this.Success_GetInfo;
    param1.show_WarningCode = this.Show_WarningCode;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  Success_GetInfo: function (result, param){
    if (result.ResultType == 1){
      //中国销售-图表数据接口
      setTimeout(this.barChart1_getData, 110);
      setTimeout(this.barChart2_getData, 120);
      setTimeout(this.barChart3_getData, 130);
      setTimeout(this.barChart4_getData, 140);
      setTimeout(this.barChart5_getData, 150);
    }
  },

  Show_WarningCode: function (result, param) {
    this.setData({
      Code_moadl: false,
      Message: result.Message,
      Type: result.Data.type,
      Img: result.Data.code,
    });
    this.WarningCode.Init_WarningCode();
  },

  Get_WarningCode: function (e) {
    this.setData({
      Code_moadl: true,
    });
    this.Load_data()
  },

  onReady: function () {
    this.WarningCode = this.selectComponent('#WarningCode');
  },
  
  barChart1_getData: function () {
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    paramData1.type = this.data.type[0];
    param1.data = paramData1;
    param1.success = this.successGetChart1;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart2_getData: function () {
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    paramData1.type = this.data.type[1];
    param1.data = paramData1;
    param1.success = this.successGetChart2;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart3_getData: function () {
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    paramData1.type = this.data.type[2];
    param1.data = paramData1;
    param1.success = this.successGetChart3;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart4_getData: function () {
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    paramData1.type = this.data.type[3];
    param1.data = paramData1;
    param1.success = this.successGetChart4;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart5_getData: function () {
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    paramData1.Drug = this.data.Drug;
    paramData1.Company = this.data.Company;
    paramData1.ATC1 = this.data.ATC1;
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.Category = this.data.Category;
    paramData1.SubCategory = this.data.SubCategory;
    paramData1.Dosage = this.data.Dosage;
    paramData1.Region = this.data.Region;
    paramData1.type = this.data.type[4];
    param1.data = paramData1;
    param1.success = this.successGetChart5;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart6_getData: function (params, that) {
    this.setData({
      color: params.color
    })
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    if (this.data.tab_active == "剂型细分"){
      paramData1.Dosage = params.name;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "药品细分"){
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = params.name;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "企业细分"){
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = params.name;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "地区细分"){
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = params.name;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "ATC一级分类") {
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = params.name;
    }
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.type = 0;
    paramData1.Category = that.data.Category;
    paramData1.SubCategory = that.data.SubCategory;
    param1.data = paramData1;
    param1.success = that.successGetChart6;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  barChart7_getData: function (params, that) {
    this.setData({
      color: params.color
    })
    var param1 = {};
    param1.url = GetChart;
    var paramData1 = {};
    if (this.data.tab_active == "剂型细分") {
      paramData1.Dosage = params.name;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "药品细分") {
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = params.name;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "企业细分") {
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = params.name;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "地区细分") {
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = params.name;
      paramData1.ATC1 = this.data.ATC1;
    } else if (this.data.tab_active == "ATC一级分类") {
      paramData1.Dosage = this.data.Dosage;
      paramData1.Drug = this.data.Drug;
      paramData1.Company = this.data.Company;
      paramData1.Region = this.data.Region;
      paramData1.ATC1 = params.name;
    }
    paramData1.ATC2 = this.data.ATC2;
    paramData1.ATC3 = this.data.ATC3;
    paramData1.ATC4 = this.data.ATC4;
    paramData1.type = 1;
    paramData1.Category = that.data.Category;
    paramData1.SubCategory = that.data.SubCategory;
    param1.data = paramData1;
    param1.success = that.successGetChart7;
    param1.method = "POST";
    param1.param = {};
    util.NetRequest(param1);
  },

  successGetChart1: function (result, param) {
    barChart1.setOption(this.getBarOption1(result.Data));
  },
  successGetChart2: function (result, param) {
    barChart2.setOption(this.getBarOption2(result.Data));
  },
  successGetChart3: function (result, param) {
    barChart3.setOption(this.getBarOption3(result.Data));
    var that = this
    barChart3.on('click', function (params) {
      //console.log(params)
      if (params.name == "其他"){
        wx.showModal({
          title: '温馨提示',
          content: "该操作无效，请点击彩色部分",
          showCancel: false
        });
      }else{
        that.setData({
          chart_hidden:false,
        })
        that.barChart6_getData(params, that);
        that.barChart7_getData(params, that);
      }
    });
  },
  successGetChart4: function (result, param) {
    barChart4.setOption(this.getBarOption4(result.Data));
    var that = this
    barChart4.on('click', function (params) {
      //console.log(params);
      if (params.name == "其他") {
        wx.showModal({
          title: '温馨提示',
          content: "该操作无效，请点击彩色部分",
          showCancel: false
        });
      }else{
        that.setData({
          chart_hidden: false
        })
        that.barChart6_getData(params, that);
        that.barChart7_getData(params, that);
      }
    });
  },
  successGetChart5: function (result, param) {
    barChart5.setOption(this.getBarOption5(result.Data));
    var that = this
    barChart5.on('click', function (params) {
      //console.log(params);
      if (params.name == "其他") {
        wx.showModal({
          title: '温馨提示',
          content: "该操作无效，请点击彩色部分",
          showCancel: false
        });
      }else{
        that.setData({
          chart_hidden: false
        })
        that.barChart6_getData(params, that);
        that.barChart7_getData(params, that);
      }
    });
  },
  successGetChart6: function (result, param) {
    //console.log(result.Data)
    barChart6.clear();
    barChart6.setOption(this.getBarOption6(result.Data));
  },
  successGetChart7: function (result, param) {
    //console.log(result.Data)
    barChart7.clear();
    barChart7.setOption(this.getBarOption7(result.Data));
  },

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

  getBarOption1: function (Option_data) {
    if (Option_data.data == undefined || Option_data.data.length == 0) {
      return {}
    }
    var series_data = [];
    for (var i = 0; i < Option_data.data.length; i++) {
      series_data.push({
        name: Option_data.legend[i],
        type: 'bar',
        data: Option_data.data[i]
      })
    }
    var num = 0;
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (Option_data.data[0][i] != ""){
        if (Option_data.data[0][i] > 0) {
          num = Math.max.apply({}, Option_data.data[0]);
          break;
        } else {
          num = Math.min.apply({}, Option_data.data[0]);
        }
      }
    }
    return {
      color: ['#00B8FF'],
      legend: {
        data: Option_data.legend,
        top: "30px"
      },
      series: series_data,
      xAxis: [
        {
          type: 'category',
          splitLine: {
            show: false
          },
          data: Option_data.group
        }
      ],
      yAxis: [
        {
          //show: false,
          splitLine: {
            show: false
          },
          type: 'value',
          axisTick:{
            show: false,
          },
          axisLabel: {
            formatter: function (value,index) {
              if (num > 0){
                if (value >= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              } else if (num == 0){
                return " ";//返回值需要有个空格不然样式会乱掉
              }else{
                if (value <= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              }
            },
          },
        }
      ],
      grid: {
        left: 70
      },
    };
  },

  getBarOption2: function (Option_data) {
    if (Option_data.data == undefined || Option_data.data.length == 0) {
      return {}
    }
    var series_data = [];
    for (var i = 0; i < Option_data.data.length; i++) {
      series_data.push({
        name: Option_data.legend[i],
        type: 'bar',
        data: Option_data.data[i]
      })
    }
    var num = 0;
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (Option_data.data[0][i] != "") {
        if (Option_data.data[0][i] > 0) {
          num = Math.max.apply({}, Option_data.data[0]);
          break;
        } else {
          num = Math.min.apply({}, Option_data.data[0]);
        }
      }
    }
    return {
      color: ['#00B8FF'],
      legend: {
        data: Option_data.legend,
        top: "30px",
      },
      series: series_data,
      xAxis: [
        {
          //show: false,
          type: 'value',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              if (num > 0) {
                if (value >= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              } else if (num == 0) {
                return " ";//返回值需要有个空格不然样式会乱掉
              } else {
                if (value <= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              }
            },
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: Option_data.group
        }
      ],

    };
  },

  getBarOption3: function (Option_data) {
    //console.log(Option_data);
    var fordata = [];
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if(i == 0){
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: { 
            show: true,
            formatter: function (params) {
              return `${params.percent}%`
            }
          },
          labelLine: { 
            normal: { show: true }, 
            emphasis: { show: true } 
          }
        })
      }else{
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: { show: false },
          labelLine: {
            normal: { show: false },
            emphasis: { show: false }
          }
        })
      }
    }
    var series_data = [{
      name: "企业细分",
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: fordata
    }]
    return {
      title: {
        text: "   近一年细分市场分布",
        left: 'left',
        textStyle: {
          color: "#31363B",
          fontSize: "14",
          fontWeight: "normal"
        }
      },
      color: ['#8cbaf9', '#f9dc71', '#f2a385', '#babdc0'],
      legend: {
        top: "30px",
        data: Option_data.legend
      },
      series: series_data
    };
  },

  getBarOption4: function (Option_data) {
    //console.log(Option_data);
    var fordata = [];
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (i == 0) {
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: {
            show: true,
            formatter: function (params) {
              return `${params.percent}%`
            }
          },
          labelLine: {
            normal: { show: true },
            emphasis: { show: true }
          }
        })
      } else {
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: { show: false },
          labelLine: {
            normal: { show: false },
            emphasis: { show: false }
          }
        })
      }
    }
    var series_data = [{
      name: "剂型细分",
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: fordata
    }]
    return {
      title: {
        text: "   近一年细分市场分布",
        left: 'left',
        textStyle: {
          color: "#31363B",
          fontSize: "14",
          fontWeight: "normal"
        }
      },
      color: ['#8cbaf9', '#f9dc71', '#f2a385', '#babdc0'],
      legend: {
        top: "30px",
        data: Option_data.legend
      },
      series: series_data
    };
  },

  getBarOption5: function (Option_data) {
    //console.log(Option_data);
    var fordata = [];
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (i == 0) {
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: {
            show: true,
            formatter: function (params) {
              return `${params.percent}%`
            }
          },
          labelLine: {
            normal: { show: true },
            emphasis: { show: true }
          }
        })
      } else {
        fordata.push({
          value: Option_data.data[0][i],
          name: Option_data.legend[i],
          label: { show: false },
          labelLine: {
            normal: { show: false },
            emphasis: { show: false }
          }
        })
      }
    }
    var series_data = [{
      name: "地区细分",
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: fordata
    }]
    return {
      title: {
        text: "   近一年细分市场分布",
        left: 'left',
        textStyle: {
          color: "#31363B",
          fontSize: "14",
          fontWeight: "normal"
        }
      },
      color: ['#8cbaf9', '#f9dc71', '#f2a385', '#babdc0'],
      legend: {
        top: "30px",
        data: Option_data.legend
      },
      series: series_data
    };
  },

  getBarOption6: function (Option_data) {
    if (Option_data.data == undefined || Option_data.data.length == 0) {
      return {}
    }
    var series_data = [];
    for (var i = 0; i < Option_data.data.length; i++) {
      series_data.push({
        name: Option_data.legend[i],
        type: 'bar',
        data: Option_data.data[i]
      })
    }
    var num = 0;
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (Option_data.data[0][i] != "") {
        if (Option_data.data[0][i] > 0) {
          num = Math.max.apply({}, Option_data.data[0]);
          break;
        } else {
          num = Math.min.apply({}, Option_data.data[0]);
        }
      }
    }
    return {
      color: this.data.color,
      legend: {
        data: Option_data.legend,
        top: "30px"
      },
      series: series_data,
      title: {
        text: "近五年细分市场销售趋势",
        left: 'left',
        textStyle: {
          color: "#31363B",
          fontSize: "14",
          fontWeight: "normal",
        }
      },
      xAxis: [
        {
          type: 'category',
          data: Option_data.group
        }
      ],
      yAxis: [
        {
          //show: false
          splitLine: {
            show: false
          },
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              if (num > 0) {
                if (value >= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              } else if (num == 0) {
                return " ";//返回值需要有个空格不然样式会乱掉
              } else {
                if (value <= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              }

            },
          },
        }
      ],
      grid: {
        left: 70
      },

    };
  },

  getBarOption7: function (Option_data) {
    if (Option_data.data == undefined || Option_data.data.length == 0) {
      return {}
    }
    var series_data = [];
    for (var i = 0; i < Option_data.data.length; i++) {
      series_data.push({
        name: Option_data.legend[i],
        type: 'bar',
        data: Option_data.data[i]
      })
    }
    var num = 0;
    for (var i = 0; i < Option_data.data[0].length; i++) {
      if (Option_data.data[0][i] != "") {
        if (Option_data.data[0][i] > 0) {
          num = Math.max.apply({}, Option_data.data[0]);
          break;
        } else {
          num = Math.min.apply({}, Option_data.data[0]);
        }
      }
    }
    return {
      color: this.data.color,
      legend: {
        data: Option_data.legend,
        top: "30px"
      },
      series: series_data,
      title: {
        text: "近三年细分市场增长变化",
        left: 'left',
        textStyle: {
          color: "#31363B",
          fontSize: "14",
          fontWeight: "normal"
        }
      },
      xAxis: [
        {
          //show: false
          type: 'value',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              if (num > 0) {
                if (value >= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              } else if (num == 0) {
                return " ";//返回值需要有个空格不然样式会乱掉
              } else {
                if (value <= num) {
                  return value;
                } else {
                  return " ";//返回值需要有个空格不然样式会乱掉
                }
              }

            },
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: Option_data.group
        }
      ],

    };
  },
  
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.dataset.id;
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },  
  //tabNav切换
  tabNav: function (e) {
    var datacurrent = e.currentTarget.dataset.current;
    this.setData({
      tab_active: this.data.switch_con[datacurrent]
    })
    var obj = {};
    obj.tabHdIndex = datacurrent;
    obj.tabBdIndex = datacurrent;
    this.setData({
      tabArray: obj,
      chart_hidden: true
    })
  },  
  //tooltip
  tooltip:function(){
    //console.log("success")
  },
  show_modal: function (e) {
    this.setData({
      hidden: false,
    });
  },
  confirm: function () {
    this.setData({
      hidden: true,
    });
  },
  PhoneCall1: function () {
    wx.makePhoneCall({
      phoneNumber: '021-62477965',
      success: function () {
        //console.log("成功拨打电话")
      }
    })
  },
  PhoneCall2: function () {
    wx.makePhoneCall({
      phoneNumber: '021-62474272',
      success: function () {
        //console.log("成功拨打电话")
      }
    })
  },
  to_wjx: function () {
    wx.navigateToMiniProgram({
      appId: app.globalData.wjx_ID,
      path: 'pages/wjxqList/wjxqList?activityId=25480946',
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        console.log("跳转成功")
      },
      fail(res) {
        
      }
    })
  },

});





