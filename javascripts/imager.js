var FONT_SIZE = 60,
  LEADING = 30,
  DIMENSIONS = [1920, 1080],
  TXT_STARTING_POINT = DIMENSIONS[0] - DIMENSIONS[0]/2.3,
  H_OFFSET = DIMENSIONS[1]/3;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();

if (app.debug) {
  canvas.style.display = "block";
  img.onload = function() {
    parseCsvData(debug);
  };
}

img.src = "bg.jpg";

ctx.font = "bold "+ FONT_SIZE +"px Arial";
ctx.textBaseline = "top";
ctx.fillStyle = "white";
ctx.strokeStyle = "rgba(0,0,0,.8)";
ctx.lineWidth = 3;

ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 1;
ctx.shadowBlur = 4;
ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'

function onCompleted(rounds) {
  for (var i = app.debug ? app.course.numberOfHoles : 1; i <= app.course.numberOfHoles; i++) {
    ctx.drawImage(img, 0, 0);
    var txtPos = 0;
    rounds.forEach(function(r) {
      drawScoreLine(r.getHoleScoreLine(i), txtPos + H_OFFSET, r.getScoreForHole(i));

      txtPos += FONT_SIZE + LEADING;
    });

    var link = document.createElement("a");
    link.href = canvas.toDataURL("img/png");
    link.innerHTML = "Link for hole " + i;
    link.target = "_blank";
    document.body.appendChild(link);

    if (!app.debug) {
      ctx.clearRect(0,0,DIMENSIONS[0],DIMENSIONS[1]);
    }
  }
}

function drawScoreLine(line, vPos, score) {
  var stPnt = TXT_STARTING_POINT,
    color = "white";

  if (score > 0) {
    color = "#0071FF";
  } else if (score < 0) {
    color = "#FF1800";
  }

  ctx.strokeText(line[0], stPnt, vPos);
  ctx.fillText(line[0], stPnt, vPos);

  ctx.fillStyle = color;
  stPnt += ctx.measureText(line[0]).width + 20;
  ctx.strokeText(line[1], stPnt, vPos);
  ctx.fillText(line[1], stPnt, vPos);

  stPnt += ctx.measureText(line[1]).width + 20;
  ctx.strokeText(line[2], stPnt, vPos);
  ctx.fillText(line[2], stPnt, vPos);

  ctx.fillStyle = "white";
}
