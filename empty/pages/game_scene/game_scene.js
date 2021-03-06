var postData = require('../../data/post_data.js')
var prefixTapId = -1;
var prefixTapValue = -1;
var isTapBan = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (isTapBan) {
      return;
    }

    this.setData({
      column_index: [0, 1],
      post_key: postData.randomArray(),
      is_gameover: false,
    });
  },

  onReset: function (event) {
    this.setData({
      column_index: [0, 1],
      post_key: postData.randomArray(),
      is_gameover: false
    });
  },

  onPostTap: function (event) {

    if (isTapBan) {
      return;
    }

    var isAlive = event.currentTarget.dataset.is_alive;
    if (!isAlive) {
      return;
    }

    var id = event.currentTarget.dataset.id;
    var value = event.currentTarget.dataset.value;
    var icon = event.currentTarget.dataset.icon;

    console.log(icon);
    console.log("onPostTap:" + id + ",value:" + value);

    var currentKey = "post_key[" + id + "].img.post_image";
    var preKey = "post_key[" + prefixTapId + "].img.post_image";
    var currentFlagKey = "post_key[" + id + "].is_alive";
    var preShowFlagKey = "post_key[" + prefixTapId + "].is_alive";

    var that = this;

    if (prefixTapId == -1) {

      this.setData({
        [currentKey]: icon,
      });

      prefixTapId = id;
      prefixTapValue = value;
      return;
    }

    if (id != prefixTapId) {  //两次不是同一张卡
      this.setData({
        [currentKey]: icon,
      });

      if (value == prefixTapValue) {  //值相等
        //清空两个卡片的贴图
        isTapBan = true
        setTimeout(function () {

          //清掉图片
          that.setData({
            [currentKey]: '',
            [preKey]: '',
            [currentFlagKey]: false,
            [preShowFlagKey]: false,
          });
          resetValue();
          isTapBan = false;

          //还有存活的卡片没有
          var isThenAlive = false;
          var arr = that.data.post_key;
          for (var i = 0; i < arr.length; i++) {
            isThenAlive = arr[i].is_alive;
            if (isThenAlive) {
              break;
            }
          }
          if (!isThenAlive) {
            that.setData({
              'is_gameover': true
            });
          }

        }, 2000);
        resetValue();
      } else {
        //值不同
        isTapBan = true;
        setTimeout(function () {
          that.setData({
            [currentKey]: postData.pandaIcon,
            [preKey]: postData.pandaIcon,
          });
          resetValue();
          isTapBan = false;
        }, 2000);
      }


      /*wx.navigateTo({
        url: 'game_detail/game_detail',
      })*/
      console.log(this.data);
    }
  },
  onTapRanking: function() {
    wx.navigateTo({
      url: '../game_detail/game_detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

function resetValue() {
  //初始化上次点的卡片
  prefixTapValue = -1;
  prefixTapId = -1;
}

function showResetButton() {

}

