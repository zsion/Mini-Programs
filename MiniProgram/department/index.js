var app = getApp();

//图片地址管理
var url_array = new Array(
  app.globalData.imgUrl + '/img/ksfb/1.png?v=1.0', //第一張
)

Page({
  data: {
    imgUrl: url_array,
  },
  onLoad: function () {
    
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
})
