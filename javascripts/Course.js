var Course = function(parData) {
  this.parData = parData;
  this.numberOfHoles = parData.length;
};

Course.prototype = {
  getParForHole: function(hole) {
    return this.parData[hole - 1];
  }
};

Course.csvToCourse = function(csvRow) {
  var parData = csvRow.split(",").filter(function(cell) {
    return Number(cell) > 0;
  });
  return new Course(parData);
};
