var debug = {
  target: {
    result: ",,Par,3,3,4,3,5,3,4,5,4\n,,,,,,,,,,,\nName,Tourn. Score at Start,Rnd Score at Start,,,,,,,,,\nPaul McBeth,-63,-10,3,2,3,2,4,4,3,4,3\nRichard Wysocki,-63,-10,4,2,4,2,4,3,5,3,3\nNathan Doss,-58,5,3,5,4,2,4,2,3,4,3\nPaul Ulibarri,-59,-3,3,3,3,3,5,3,5,4,5"
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
