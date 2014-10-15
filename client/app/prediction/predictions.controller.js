'use strict';

angular.module('myBtcPredictionsApp')
  .controller('PredictionsCtrl', function ($scope, Prediction, predictionsManager) {
    $scope.predictions = predictionsManager.predictions;

    $scope.save = function (predictions) {
      Prediction.multisave(predictions.map(function (prediction) {
        return _.pick(prediction,['_id','value','user','date']);
      })).$promise.then(function(newPredictions){
          $scope.predictions = newPredictions;
          predictionsManager.update(newPredictions);
      });
    };
  });
