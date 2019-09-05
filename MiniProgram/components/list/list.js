var app = getApp();
//图片地址管理
var url_array = {
  hzgxs : app.globalData.imgUrl + '/img/public/hzgxs.png', //中国销售-黄
  lzgxs: app.globalData.imgUrl + '/img/public/lzgxs.png', //中国销售-蓝
  hzgsb: app.globalData.imgUrl + '/img/public/hzgsb.png', //中国申报-黄
  lzgsb : app.globalData.imgUrl + '/img/public/lzgsb.png', //中国申报-蓝
  hyzxpj : app.globalData.imgUrl + '/img/public/hyzxpj.png', //一致性评价-黄
  lyzxpj : app.globalData.imgUrl + '/img/public/lyzxpj.png', //一致性评价-蓝
  hcbzjml: app.globalData.imgUrl + '/img/public/hcbzjml.png', //参比制剂目录-黄
  lcbzjml: app.globalData.imgUrl + '/img/public/lcbzjml.png', //参比制剂目录-蓝
  hzgss: app.globalData.imgUrl + '/img/public/hzgss.png', //中国上市-黄
  lzgss : app.globalData.imgUrl + '/img/public/lzgss.png', //中国上市-蓝
  hzgcps : app.globalData.imgUrl + '/img/public/hzgcps.png', //中国橙皮书-黄
  lzgcps : app.globalData.imgUrl + '/img/public/lzgcps.png', //中国橙皮书-蓝
  hqqzy : app.globalData.imgUrl + '/img/public/hqqzy.png', //全球在研-黄
  lqqzy : app.globalData.imgUrl + '/img/public/lqqzy.png', //全球在研-黄
  hksfb : app.globalData.imgUrl + '/img/public/hksfb.png', //科室分布-黄
  lksfb : app.globalData.imgUrl + '/img/public/lksfb.png', //科室分布-蓝
  hqqss : app.globalData.imgUrl + '/img/public/hqqss.png', //全球上市-黄
  lqqss: app.globalData.imgUrl + '/img/public/lqqss.png', //全球上市-蓝
  hzglc : app.globalData.imgUrl + '/img/public/hzglc.png', //中国临床-黄
  lzglc : app.globalData.imgUrl + '/img/public/lzglc.png', //中国临床-蓝
  hqqlc : app.globalData.imgUrl + '/img/public/hqqlc.png', //全球临床-黄
  lqqlc : app.globalData.imgUrl + '/img/public/lqqlc.png', //全球临床-蓝
  hqqxs : app.globalData.imgUrl + '/img/public/hqqxs.png', //全球销售-黄
  lqqxs : app.globalData.imgUrl + '/img/public/lqqxs.png', //全球销售-蓝
  hgmprz : app.globalData.imgUrl + '/img/public/hgmprz.png', //GMP认证-黄
  lgmprz : app.globalData.imgUrl + '/img/public/lgmprz.png', //GMP认证-蓝
  hclxx : app.globalData.imgUrl + '/img/public/hclxx.png', //产量信息-黄
  lclxx : app.globalData.imgUrl + '/img/public/lclxx.png', //产量信息-蓝
  hypzb : app.globalData.imgUrl + '/img/public/hypzb.png', //药品中标-黄
  lypzb : app.globalData.imgUrl + '/img/public/lypzb.png', //药品中标-蓝
  hybml : app.globalData.imgUrl + '/img/public/hybml.png', //医保目录-黄
  lybml : app.globalData.imgUrl + '/img/public/lybml.png', //医保目录-蓝
  zk : app.globalData.imgUrl + '/img/home/zk.png', //展开按钮
  sq : app.globalData.imgUrl + '/img/home/sq.png', //收起按钮
}

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    
  },
  data: {
    imgUrl: url_array,
    toggle: true,
    title_index: 0,
    content_index: 0,
  },
  ready: function () {
    
  },
  methods : {

    show_modal: function (e) {
      //console.log(e)
      this.triggerEvent('show_modal', {
        title_index: e.currentTarget.dataset.title,
        content_index: e.currentTarget.dataset.content,
      })
    },

    //展开收起按钮
    click_toggle: function (e) {
      this.setData({
        toggle: !this.data.toggle
      })
    },
    
  }

})

