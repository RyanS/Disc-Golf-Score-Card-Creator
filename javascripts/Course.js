var Course = function(parData) {
  this.parData = parData;
  this.numberOfHoles = parData.length;
};

Course.prototype = {
  getParForHole: function(hole) {
    return this.parData[hole - 1];
  }
};
