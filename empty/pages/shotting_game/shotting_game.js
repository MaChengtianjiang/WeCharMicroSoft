// pages/shotting_game/shotting_game.js

let Player = require('../shotting_game/item/player.js')
let Vector2 = require('../../utils/vector2.js')

const startPos = new Vector2.Vector2(150, 450);
//半径
const playerRadius = 64;
//玩家 id，坐标，半径
let player = new Player.instantce(startPos, playerRadius);
console.log(player);
//敌人
let enemies = [];
//帧数
let fps = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameover:false,
    currentFps: fps,
    player:{
      postion:{
        x: player.postion.x,
        y: player.postion.y
      }
    },
    enemies: {

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
        console.log(that.data);
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.interval = setInterval(this.update, 17);
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

  //更新方法
  update: function () {
    fps++;
    //console.log(fps);
    //刷新敌人(秒单位)
    if (fps% 60 == 0) {
        enemies.push(
          {
            id: enemies.length + 1,
            is_alive: true,
            postion: {
              x: Math.round(Math.random() * 300),
              y: Math.round(Math.random() * 100)
            }
          }
        );
      console.log('敌人列表：' + this.data.enemies);
      }

    enemies.forEach(function (value, index){
      value.postion.y+= 2;
      //出界 =》判定死亡
      value.is_alive = !(value.postion.y >= 500);
      //清除死亡的敌人
      if (!value.is_alive) {
        enemies.splice(index,1);
      }
    });

    //加载数据
    this.setData({
      enemies: enemies,
      currentFps: fps
    });
  }, 
  //玩家触摸移动事件
  onPlayerMoveEvent :function(e) {

    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;

    //防止坐标越界,view宽高的限制
    //左右
    if (pageY < playerRadius) return;
    if (this.data.screenHeight - pageY <= playerRadius/2) return;
    //上下
    if (pageX < playerRadius) return;
    if (pageX > this.data.screenWidth - playerRadius/2) return;

    
    //console.log('pageX: ' + pageX)
    //console.log('pageY: ' + pageY)
    
    //TODO 更新玩家坐标(用于做碰撞判断)

    //移动
    this.setData( {
      player: {
        postion: {
          // 减掉半径
          x: pageX - playerRadius/2,
          y: pageY - playerRadius
        },
      },

    });
    //console.log(this.data.player);
  },
  //玩家点击事件
  onPlayerClickEvent: function (e) {
    console.log("onPlayerClickEvent")
  }

})

