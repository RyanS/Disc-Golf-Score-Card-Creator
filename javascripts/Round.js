var Round = function(player, scores, tournamentTotalAtStart, roundTotalAtStart) {
  this.scores = scores;
  this.player = player;
  this.roundTotals = [];
  this.tournamentTotalAtStart = tournamentTotalAtStart;
  this.roundTotalAtStart = roundTotalAtStart;

  for (var i = 0; i < app.course.numberOfHoles; i++) {
    this.roundTotals[i] = this.getScoreForHole(i+1);
  }
};

Round.prototype = {
  getScoreForHole: function(hole) {
    var par = app.course.getParForHole(hole),
      holeStrokes = this.scores[hole - 1];

    return holeStrokes - par;
  },
  getTotalForRoundAtHole: function(hole) {
    return this.roundTotals.slice(0, app.course.numberOfHoles - (app.course.numberOfHoles - hole)).reduce(function(prev, curr) {
      return prev + curr;
    }, this.roundTotalAtStart);
  },
  getTotalForTournamentAtHole: function(hole) {
    return this.tournamentTotalAtStart + this.getTotalForRoundAtHole(hole);
  },
  getHoleScoreLine: function(hole) {
    return [this.player, Round.formatScore(this.getTotalForRoundAtHole(hole)), Round.formatScore(this.getTotalForTournamentAtHole(hole))]; 
  }
};

Round.csvToRound = function(row) {
  row = row.split(",");

  var name = row[0],
    tournamentTotalAtStart = Number(row[1]),
    roundTotalAtStart = Number(row[2]),
    scores = row.slice(3).map(function(score) {return Number(score)});

  return new Round(name, scores, tournamentTotalAtStart, roundTotalAtStart);
};

Round.formatScore = function(score) {
  return score > 0 ? "+" + score : score.toString();
}
