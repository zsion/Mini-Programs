const Http = require('/config').Http
const ImgUrl = require('/config').ImgUrl
const LoginMiniProgram = require('/config').Member.LoginMiniProgram
App({
  onLaunch: function () {
    //console.log('App Launch')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  onShow: function () {
    //console.log('App Show')
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: that.globalData.http + LoginMiniProgram,
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data.Data)
              that.globalData.order = res.data.Data.token;
              that.globalData.Islock = res.data.Data.lockinfo.islock;
              try {
                wx.setStorageSync('token', res.data.Data.token)
                wx.setStorageSync('auth', res.data.Data.auth)
                wx.setStorageSync('isbind', res.data.Data.isbind)
                wx.setStorageSync('information', res.data.Data.information)
                wx.setStorageSync('lockinfo', res.data.Data.lockinfo)
              } catch (e) {

              }
              
              if (that.orderCallback) {
                that.orderCallback()
              }

            },
            fail: function (res) {
              wx.showModal({
                title: '温馨提示',
                content: "Fail:请求失败",
                showCancel: false
              });
            },
            complete: function (res) {
              //console.log("完成了")
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onHide: function () {
    //console.log('App Hide')
  },
  globalData: {
    ShareApp_title:'药分享Plus',
    ShareApp_path:'/pages/index/start',
    PDB_ID: "wx59827abee0291a0e",
    wjx_ID: "wxd947200f82267e58",
    order: "",
    Islock: "",
    hasLogin: false,
    openid: null,
    userInfo: null,
    http: Http,
    imgUrl: ImgUrl,
    reqHeader: { "content-type": "application/json", "Cookie": "" },
    sDParam: "",
  },

})

