// pages/shotting_game/shotting_game.js

let Player = require('../shotting_game/item/player.js')
let Vector2 = require('../../utils/vector2.js')
//半径
const playerRadius = 32;
//玩家 id，坐标，半径
let player = new Player.instantce(new Vector2.Vector2(150, 450), playerRadius);

//点击位置
var touch_postion = new Vector2.Vector2(150, 450);

//碰撞检测
var collider = new Vector2.Vector2(0, 0).isCollision;
//敌人
let enemies = [];
const enemy_speed = 5;
//帧数
let fps = 0;
var is_gameover = false;
var create_emnemy_interval = 60;
var initializationData = {
  gameover: false,
  currentFps: fps,
  player: {
    postion: {
      x: player.postion.x,
      y: player.postion.y
    }
  },
  enemies: {
  }
}

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
    is_gameover = false;
    this.setData(initializationData);
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

    if (is_gameover) {
      return;
    }
    //console.log(fps);
    //刷新敌人(秒单位)
    if (fps % create_emnemy_interval == 0) {
      //随机 30度-180度角敌人移动
      var vx = (Math.cos((30 + Math.random() * (150 - 30 + 1)) * Math.PI / 180) * enemy_speed);
      var vy = (Math.sin((30 + Math.random() * (150 - 30 + 1)) * Math.PI / 180) * enemy_speed);
      enemies.push({
        id: enemies.length + 1,
        is_alive: true,
        postion: {
          x: Math.round(Math.random() * 300),
          y: Math.round(Math.random() * 100)
        },
        vector: new Vector2.Vector2(vx, vy),
      });
      if (create_emnemy_interval > 10) {
        create_emnemy_interval--;
      }

      console.log('敌人列表：' + this.data.enemies);
    }

    enemies.forEach(function (value, index) {
      value.postion.x += value.vector.x;
      value.postion.y += value.vector.y;

      //出界 =》判定死亡
      value.is_alive = !(value.postion.y >= 500);
      //清除死亡的敌人
      if (!value.is_alive) {
        enemies.splice(index, 1);
      }

      if (collider(value, player)) {
        console.log("敌坐标X:" + value.postion.x + ",Y:" + value.postion.y);
        console.log("我坐标X:" + player.postion.x + ",Y:" + value.postion.y);
        is_gameover = true;
      }

    });

    //向点击目标移动
    var toTouchPointDistance = new Vector2.Vector2(player.postion.x - touch_postion.x, player.postion.y - touch_postion.y);
    if (toTouchPointDistance.length() > 2) {
      player.postion.x += player.vector.x * 5;
      player.postion.y += player.vector.y * 5;
    }

    //加载数据
    this.setData({
      enemies: enemies,
      currentFps: fps,
      gameover: is_gameover,
      player: {
        postion: {
          x: player.postion.x,
          y: player.postion.y
        }
      },
    });
  },
  // // TODO 拖动移动废弃 用点击方式移动
  // //玩家触摸移动事件
  // onPlayerMoveEvent: function (e) {

  //   if (is_gameover) {
  //     return;
  //   }
  //   var touchs = e.touches[0];
  //   var pageX = touchs.pageX;
  //   var pageY = touchs.pageY;

  //   //防止坐标越界,view宽高的限制
  //   //左右
  //   if (pageX < playerRadius) return;
  //   if (pageX > this.data.screenWidth - playerRadius / 2) return;

  //   //上下
  //   if (pageY < playerRadius) return;
  //   if (this.data.screenHeight - pageY <= playerRadius / 2) return;

  //   //console.log('pageX: ' + pageX)
  //   //console.log('pageY: ' + pageY)

  //   //TODO 更新玩家坐标(用于做碰撞判断)
  //   player.postion.x = pageX;
  //   player.postion.y = pageY;


  //   //移动
  //   this.setData({
  //     player: {
  //       postion: {
  //         // 为了贴合素材正中心 减掉半径
  //         x: pageX - playerRadius,
  //         y: pageY - playerRadius * 2
  //       },
  //     },

  //   });
  //   //console.log(this.data.player);
  // },

 
  // //玩家点击事件
  // onPlayerClickEvent: function (e) {
  //   console.log("onPlayerClickEvent")
  // },
  //玩家点击事件
  onNewPlayerClickEvent: function (e) {

    //向目标点移动
    var touchs = e.touches[0];
    touch_postion = new Vector2.Vector2(touchs.pageX - playerRadius / 2, touchs.pageY - playerRadius);

    //求模长
    var vn = new Vector2.Vector2(touch_postion.x - player.postion.x, touch_postion.y - player.postion.y);
    player.setVector(vn.normalize());
  },
  onRestartClickEvent: function (e) {

    //初始化
    player = new Player.instantce(new Vector2.Vector2(150, 450), playerRadius);
    enemies = [];
    is_gameover = false;
    this.data = {};
    this.setData(initializationData);
  }

})