
var pandaIcon = '/src/images/panda.jpeg';
var cardIcon = '/src/icons/Icon_Tribe_0';

function randomFrom (lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

function randomArray() {

  var gameItemData = [];
  var array = [1,1,2,2,3,3,4,4];

  for (var i = 0; i < array.length; i++) 
  {
    var temp = array[i];
    var randomDigit = randomFrom(0, array.length - 1);
    array[i] = array[randomDigit];
    array[randomDigit] = temp;
  }

  for (var i = 0; i < array.length; i++) {
    gameItemData.push(
      {
        id: i,
        value: array[i],
        img: {
          post_image: pandaIcon,
          icon: cardIcon + array[i]+".png",
        },
        is_alive: true,
      }
    );
  }
  return gameItemData;
}

module.exports = {
  randomArray: randomArray,
  pandaIcon: pandaIcon,
}