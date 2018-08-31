var Vector2 = require('../../../utils/vector2.js')

function instantce(pos, radius) {
  this.postion = pos;
  this.radius = radius;

  this.setPostion = function (vector) {
    this.postion = vector;
  }
  this.showPostion = function () {
    console.log(this.postion);
  }
}

module.exports = {
  instantce: instantce
}