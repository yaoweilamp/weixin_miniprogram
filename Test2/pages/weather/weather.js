// pages/weather/weather.js
var app = getApp();//获取当前小程序实例，方便使用全局方法和属性
Page({
  //1、页面数据部分,将绑定到视图wxml中
  data: { cur_id: app.curid, basic: "", now: "" },//设置页面数据，后面空值将在页面显示时通过请求服务器获取
  //2、系统事件部分
  onShow: function () {
    var that = this;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })//设置加载模态框
    that.getnow(function (d) {//回调函数，根据数据设置页面data，更新到视图
      wx.hideToast();//隐藏加载框
      d.now.cond.src = "http://files.heweather.com/cond_icon/" + d.now.cond.code + ".png";
      that.setData({ basic: d.basic, now: d.now })//更新数据，视图将同步更新
    })
  },
  //3、自定义页面方法：获取当前天气API
  getnow: function (fn) {
    wx.request({//请求服务器，类似ajax
      url: 'https://free-api.heweather.com/v5/now',
      data: { city: app.curid, key: '01a7798b060b468abdad006ea3de4713' },//和风天气提供用户key，可自行注册获得
      header: { 'Content-Type': 'application/json' },
      success: function (res) { fn(res.data.HeWeather5[0]); }//成功后将数据传给回调函数执行
    })
  },
  //4、页面事件绑定部分
  bindViewTap: function () { wx.switchTab({ url: '../city/city' }) }//跳转菜单页面 
})