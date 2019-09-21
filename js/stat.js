'use strict';

var cloud = {
  width: 420,
  height: 270,
  x: 100,
  y: 10,
  gap: 10
}

var bar = {
  width: 40,
  height: 150,
  gap: 50
}

var color = {
  cloudColor: '#fff',
  cloudShadowColor: 'rgba(0, 0, 0, 0.7)',
  fontColor: '#000',
  yourColor: 'rgba(255, 0, 0, 1)'
};

var generate = {
  hue: 240,
  minSaturation: 20,
  maxSaturation: 90,
  lightness: '50%'
};

var getColor = function (hue, minSaturation, maxSaturation, lightness) {
  var saturation = Math.floor(Math.random() * (maxSaturation - minSaturation) + minSaturation) + '%';
  return ('hsl(' + hue + ', ' + saturation + ', ' + lightness + ')');
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.width, cloud.height);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, cloud.x + cloud.gap, cloud.y + cloud.gap, color.cloudShadowColor);
  renderCloud(ctx, cloud.x, cloud.y, color.cloudColor);

  var textGap = cloud.x + 2 * cloud.gap;

  ctx.fillStyle = color.fontColor;
  ctx.textBaseline = 'hanging';
  ctx.fillText(
    'Ура вы победили!',
    textGap,
    cloud.y + 2 * cloud.gap
  );
  ctx.fillText(
    'Список результатов:',
    textGap,
    cloud.y + 4 * cloud.gap
  );

  ctx.textBaseline = 'alphabetic';
  for (var i = 0; i < names.length; i++) {
    var maxTime = getMaxElement(times);
    var barHeight = (bar.height * times[i]) / maxTime;
    var barGap = cloud.x + bar.gap * (i + 1) + bar.width * i;

    ctx.fillStyle = color.fontColor;
    ctx.fillText(
      Math.floor(times[i]),
      barGap,
      cloud.height - cloud.gap * 3 - barHeight
    );

    ctx.fillStyle = (names[i] === 'Вы') ? color.yourColor : getColor(generate.hue, generate.minSaturation, generate.maxSaturation, generate.lightness);
    ctx.fillRect(
      barGap,
      cloud.height - cloud.gap * 2 - barHeight,
      bar.width,
      barHeight
    );

    ctx.fillStyle = color.fontColor;
    ctx.fillText(
      names[i],
      barGap,
      cloud.height
    );
  };
};
