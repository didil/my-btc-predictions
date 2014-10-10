'use strict';

angular.module('myBtcPredictionsApp')
  .controller('PriceChartCtrl', function ($scope,$filter,Price) {
    $scope.data = [
      {x: new Date('2014-11-20'), forecast: 147},
      {x: new Date('2014-12-20'), forecast: 87},
      {x: new Date('2015-01-15'), forecast: 45}
    ];

    var prices = Price.query();
    prices.$promise.then(function(){
      prices.forEach(function(price){
        $scope.data.push({x: new Date(price.date) , real: price.value })
      })
    });

    $scope.options = {
      axes: {
        x: {
          key: 'x',
          labelFunction: function (value) {
            return $filter('date')(value,'MMMM yyyy');
          },
          type: 'date'
        },
        y: {type: 'linear'}
      },
      series: [
        {y: 'real', color: 'steelblue', thickness: '3px', striped: true, label: 'BTC/USD (Bitstamp)'},
        {y: 'forecast', color: 'purple',  thickness: '3px', dotSize: 5,lineMode:'dashed', label: 'BTC/USD (Your forecast)'}
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {mode: 'axes'},
      drawLegend: true,
      drawDots: true,
      columnsHGap: 5
    };

  });
