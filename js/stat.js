'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10
};

var Bar = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50
};

var Colors = {
  WHITE: '#fff',
  GRAY: 'rgba(0, 0, 0, 0.7)',
  BLACK: '#000',
  RED: 'rgba(255, 0, 0, 1)'
};

var Hsl = {
  HUE: 240,
  MIN_SATURATION: 20,
  MAX_SATURATION: 90,
  LIGHTNESS: '50%'
};

var TITLE = 'Ура вы победили!\nСписок результатов:';

// Отрисовка облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

// Отрисовка текста заголовка
var renderTitle = function (ctx, text, x, y) {
  ctx.fillStyle = Colors.BLACK;
  ctx.textBaseline = 'hanging';

  var lines = text.split('\n');

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, (i + 1) * y);
  }
};

// Отрисовка текста легенды
var renderLegend = function (ctx, text, x, y) {
  ctx.fillStyle = Colors.BLACK;
  ctx.fillText(text, x, y);
};

// Генерация заливики для столбцов статистики
var getColor = function (hue, minSaturation, maxSaturation, lightness) {
  var saturation = Math.floor(Math.random() * (maxSaturation - minSaturation) + minSaturation) + '%';
  return ('hsl(' + hue + ', ' + saturation + ', ' + lightness + ')');
};

// Отрисовка столбцов статистики
var renderBar = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    var maxTime = Math.max.apply(null, times);
    var barHeight = (Bar.HEIGHT * times[i]) / maxTime;
    var barGap = Cloud.X + Bar.GAP * (i + 1) + Bar.WIDTH * i;

    renderLegend(ctx, Math.floor(times[i]), barGap, Cloud.HEIGHT - Cloud.GAP * 3 - barHeight);
    ctx.fillStyle = (names[i] === 'Вы') ? Colors.RED : getColor(Hsl.HUE, Hsl.MIN_SATURATION, Hsl.MAX_SATURATION, Hsl.LIGHTNESS);
    ctx.fillRect(barGap, Cloud.HEIGHT - Cloud.GAP * 2 - barHeight, Bar.WIDTH, barHeight);
    renderLegend(ctx, names[i], barGap, Cloud.HEIGHT);
  }
};

// Отрисовка статистики
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Colors.GRAY);
  renderCloud(ctx, Cloud.X, Cloud.Y, Colors.WHITE);
  renderTitle(ctx, TITLE, Cloud.X + 2 * Cloud.GAP, Cloud.Y + 1.5 * Cloud.GAP);
  renderBar(ctx, names, times);
};
