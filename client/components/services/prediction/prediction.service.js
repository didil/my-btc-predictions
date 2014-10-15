angular.module('myBtcPredictionsApp').factory('Prediction', function ($resource) {
  return $resource('/api/predictions', {},
    {
      multisave: {
        method: 'POST',
        isArray: true,
        url: '/api/predictions/multisave'
      }
    });
});