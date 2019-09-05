function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

var app = getApp();
function NetRequest({ url, data, success, show_WarningCode ,fail, complete, error ,method = "POST", param = {} }) {
  wx.showLoading({
    title: "加载中...",
    icon: "loading",
    mask: true,
    duration: 5000
  })
  setTimeout(function () {
    wx.hideLoading();
  }, 5000);
  url = app.globalData.http + url + app.globalData.sDParam;
  data.token = wx.getStorageSync('token');
  wx.request({
    url: url,
    method: method,
    data: data,
    header: app.globalData.reqHeader,
    success: function (res) {
      
      if (res.statusCode !== 200) {
        if (fail != undefined) {
          fail(res);
        }
        else {
          ajaxFail(res);
        }
        return;
      }

      let data = res.data
      if (data == undefined) {
        if (fail != undefined) {
          fail(res);
        }
        else {
          wx.showModal({
            title: '温馨提示',
            content: "请求失败",
            showCancel: false
          });
        }
        return;
      }

      //用户被锁定
      if (data.ResultType == 2002) {
        app.globalData.Islock = true
        wx.showModal({
          title: '温馨提示',
          content: data.Message,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
          }
        });
        return
      }

      //用户验证码
      if (data.ResultType == 2001) {
        if (show_WarningCode != undefined) {
          show_WarningCode(data, param)
        }
        return
      }

      //如果ResultType = 0
      if (data.ResultType == undefined || data.ResultType == 0) {
        var strMsg = "";
        if (data.Message == undefined || data.Message == "") {
          strMsg = "返回失败";
        }
        else {
          strMsg = data.Message;
        }
        wx.showModal({
          title: '温馨提示',
          content: strMsg,
          showCancel: false
        });
        //接口状态返回为0时，如果绑定了错误回调事件，则执行。
        if (fail != undefined) {
          fail(res);
        }
        //验证码确认错误-刷新验证码使用
        if (error != undefined) {
          error(res.data, param)
        }
        return;
      }
      
      //如果接口请求成功，并且Message ！= "" || null
      if (data.ResultType == 1 && data.Message != "" && data.Message != null){
        wx.showModal({
          title: '温馨提示',
          content: data.Message,
          showCancel: false
        });
      }
      
      //回调请求成功函数
      if (success != undefined) {
        success(data, param);
      }
    },
    fail: function (res) {
      console.log(res)
      fail == undefined ? ajaxFail(res) : fail(res);
    },
    complete: function(res){
      wx.hideLoading();
      if (complete != undefined) {
        complete();
      }
    }
  })
}

function ajaxFail(res) {
  wx.showModal({
    title: '温馨提示',
    content: "Fail:请求失败",
    showCancel: false
  });
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  NetRequest: NetRequest
}


