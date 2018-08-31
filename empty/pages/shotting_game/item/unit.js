var Vector2 = require('../../../utils/vector2.js')

function instantce(index, pos) {
  var id = index;
  var postion = pos;

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