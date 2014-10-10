angular.module('myBtcPredictionsApp').factory('Price', function($resource) {
  return $resource('/api/prices');
});