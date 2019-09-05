var app = getApp();
Component({
  properties: {
    Modal_hidden: {
      type: Boolean,
      value: '',
    },
    Isbind: {
      type: Boolean,
      value: '',
    },
  },
  data: {
    
  },
  ready: function () {
    
  },
  methods : {
    confirm: function () {
      this.setData({
        Modal_hidden: true,
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
  }
})

