angular.module('myBtcPredictionsApp').factory('predictionsManager', function ($rootScope) {
  var predictionsManager = {predictions: []};

  predictionsManager.update = function (predictions) {
    this.predictions = predictions;
    this.broadcastUpdate();
  };

  predictionsManager.broadcastUpdate = function() {
    $rootScope.$broadcast('predictionsChanged');
  };

  return predictionsManager;
});