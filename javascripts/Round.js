var Round = function(player, scores, tournamentTotalAtStart) {
  this.scores = scores;
  this.player = player;
  this.roundTotals = [];
  this.tournamentTotalAtStart = tournamentTotalAtStart;

  for (var i = 0; i < course.numberOfHoles; i++) {
    this.roundTotals[i] = this.getScoreForHole(i+1);
  }
};

Round.prototype = {
  getScoreForHole: function(hole) {
    var par = course.getParForHole(hole),
      holeStrokes = this.scores[hole - 1];

    return holeStrokes - par;
  },
  getTotalForRoundAtHole: function(hole) {
    return this.roundTotals.slice(0, course.numberOfHoles - (course.numberOfHoles - hole)).reduce(function(prev, curr) {
      return prev + curr;
    });
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

  var name = row[0].split(":")[0],
    tournamentTotalAtStart = row[0].split(":")[1],
    scores = row.slice(1).map(function(score) {return Number(score)});

  return new Round(name, scores, Number(tournamentTotalAtStart));
};

Round.formatScore = function(score) {
  return score > 0 ? "+" + score : score.toString();
}
