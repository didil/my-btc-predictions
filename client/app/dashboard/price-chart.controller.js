'use strict';

angular.module('myBtcPredictionsApp')
  .controller('PriceChartCtrl', function ($scope, $filter, Price) {
    $scope.data = [];

    var prices = Price.query();
    prices.$promise.then(function () {
      prices.forEach(function (price) {
        $scope.data.push({x: new Date(price.date), real: price.value })
      })
    });

    var predictions = [
//      {date: '2014-11-01', value: 350 } ,
//      {date: '2014-12-01', value: 320 } ,
//      {date: '2015-01-01', value: 500 } ,
//      {date: '2015-02-01', value: 480 } ,
//      {date: '2015-03-01', value: 600 } ,
//      {date: '2015-04-01', value: 1000 }
    ];

    predictions.forEach(function (prediction) {
      $scope.data.push({x: new Date(prediction.date), forecast: prediction.value })
    });

    var averagePredictions = [
      {date: '2014-11-01', value: 400 } ,
      {date: '2014-12-01', value: 500 } ,
      {date: '2015-01-01', value: 350 } ,
      {date: '2015-02-01', value: 600 } ,
      {date: '2015-03-01', value: 700 } ,
      {date: '2015-04-01', value: 600 }
    ];

    averagePredictions.forEach(function (prediction) {
      $scope.data.push({x: new Date(prediction.date), crowd_forecast: prediction.value })
    });

    $scope.options = {
      axes: {
        x: {
          key: 'x',
          labelFunction: function (value) {
            return $filter('date')(value, 'MM/yyyy');
          },
          type: 'date'
        },
        y: {type: 'linear'}
      },
      series: [
        {y: 'real', color: 'steelblue', thickness: '3px', striped: true, label: 'BTC/USD (Bitstamp)'}
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {mode: 'axes'},
      drawLegend: true,
      drawDots: true,
      columnsHGap: 5
    };

    if (predictions.length > 0) {
      $scope.options.series.push({y: 'forecast', color: 'purple', thickness: '3px', dotSize: 4, lineMode: 'dashed', label: 'BTC/USD (Your forecast)'});
    }

    if (averagePredictions.length > 0) {
      $scope.options.series.push({y: 'crowd_forecast', color: 'orange', thickness: '2px', dotSize: 4, lineMode: 'dashed', label: 'BTC/USD (Crowd forecast)'});
    }

  });
