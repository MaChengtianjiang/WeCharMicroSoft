var Vector2 = require('../../../utils/vector2.js')

function instantce(pos, radius) {
  this.postion = pos;
  this.radius = radius;
  this.vector = new Vector2.Vector2(0,0);

  this.setVector = function (vector) {
    this.vector = vector;
  }
  this.showPostion = function () {
    console.log(this.postion);
  }
}

module.exports = {
  instantce: instantce
}