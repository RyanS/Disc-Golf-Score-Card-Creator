//var debug = "Par,3,3,4,3,5,3,4,5,4\nPaul McBeth:-63,3,2,3,2,4,4,3,4,3\nRichard Wysocki:-63,4,2,4,2,4,3,5,3,3\nNathan Doss:-58,3,5,4,2,4,2,3,4,3\nPaul Ulibarri:-59,3,3,3,3,5,3,5,4,5".split("\n");

var Signal = signals.Signal;

//custom object that dispatch signals
var parsing = {
  completed: new Signal()
};

var course;

document.getElementById("csv-uploader").addEventListener("change", function(e) {
  var reader = new FileReader()
  reader.onload = function(e) {
    var results = e.target.result.split("\n"),
      rounds = [];

    results.pop();

    course = new Course(results[0].split(",").slice(1));
    rounds = results.slice(1).map(Round.csvToRound);
    parsing.completed.dispatch(rounds);
  }
  reader.readAsText(e.target.files[0]);
});

var FONT_SIZE = 60,
  LEADING = 30,
  DIMENSIONS = [1920, 1080],
  TXT_STARTING_POINT = DIMENSIONS[0] - DIMENSIONS[0]/2.3,
  H_OFFSET = DIMENSIONS[1]/3;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "bg.jpg";

ctx.font = "bold "+ FONT_SIZE +"px Arial";
ctx.textBaseline = "top";
ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.lineWidth = 3;

function onCompleted(rounds) {
  for (var i = 1; i <= course.numberOfHoles; i++) {
    ctx.drawImage(img, 0, 0);
    var txtPos = 0;
    rounds.forEach(function(r) {
      var tmp = r.getHoleScoreLine(i);

      ctx.strokeText(tmp.join(" "),TXT_STARTING_POINT,txtPos + H_OFFSET);
      ctx.fillText(tmp.join(" "),TXT_STARTING_POINT,txtPos + H_OFFSET);

      txtPos += FONT_SIZE + LEADING;
    });

    var link = document.createElement("a");
    link.href = canvas.toDataURL("img/png");
    link.innerHTML = "Link for hole " + i;
    link.target = "_blank";
    document.body.appendChild(link);

    ctx.clearRect(0,0,DIMENSIONS[0],DIMENSIONS[1]);
  }
}

parsing.completed.add(onCompleted);
