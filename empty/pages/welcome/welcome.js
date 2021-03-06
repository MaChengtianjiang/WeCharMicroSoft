
var timer = 0
var fpsSpeed = 17
var loadTime = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    callback: '进入游戏'
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: 'Loading...' })
    this.interval = setInterval(this.countUp, this.data.fpsSpeed)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
  onShareAppMessage: function () {
    
  },

    // Event handler.
  viewTap: function (event) {
    wx.navigateTo({
      url: '../game_scene/game_scene',
    })
  },
  countUp: function () {
    timer += fpsSpeed;
    if (timer > loadTime) {
      wx.hideLoading();
      clearInterval(this.interval);
      timer= 0;
    }
  },


  
})


