var Vector2 = require('../../../utils/vector2.js')

function instantce(index, pos, radius) {
  this.id = index;
  this.postion = pos;
  this.radius = radius;

  this.move = function (vector) {
    this.postion.add(vector)
  }
  this.showPostion = function () {
    console.log(this.postion);
  }
}

module.exports = {
  instantce: instantce
}