var debug = {
  target: {
    result: ",,Par,3,3,4,3,5,3,4,5,4\n,,,,,,,,,,,\nName,Tourn. Score at Start,Rnd Score at Start,,,,,,,,,\nPaul McBeth,-10,0,3,3,4,3,5,3,4,5,4\nRichard Wysocki,-10,0,2,2,3,2,4,2,3,4,3\nNathan Doss,-10,0,4,4,5,4,6,4,5,6,5\nPaul Ulibarri,-10,0,3,3,3,3,5,3,5,4,5"
  }
};

var Signal = signals.Signal;

//custom object that dispatch signals
var parsing = {
  completed: new Signal()
};
parsing.completed.add(onCompleted);

function parseCsvData(e) {
  var results = e.target.result.split("\n"),
    rounds = [];

  app.course = Course.csvToCourse(results[0]);
  rounds = results.slice(3).map(Round.csvToRound);
  parsing.completed.dispatch(rounds);
}

document.getElementById("csv-uploader").addEventListener("change", function(e) {
  var reader = new FileReader()
  reader.addEventListener("load", parseCsvData);
  reader.readAsText(e.target.files[0]);
});
