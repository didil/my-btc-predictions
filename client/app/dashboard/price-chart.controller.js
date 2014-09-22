'use strict';

angular.module('myBtcPredictionsApp')
  .controller('PriceChartCtrl', function ($scope,$filter) {
    $scope.data = [
      {x: new Date("2014-08-20"), real: 14},
      {x: new Date("2014-09-20"), real: 1},
      {x: new Date("2014-10-20"), real: 15, forecast: 11},
      {x: new Date("2014-11-20"), forecast: 147},
      {x: new Date("2014-12-20"), forecast: 87},
      {x: new Date("2015-01-15"), forecast: 45}
    ];

    $scope.options = {
      axes: {
        x: {
          key: 'x',
          labelFunction: function (value) {
            return $filter('date')(value,'MMMM yyyy');
          },
          type: 'date', min: 0, max: 5
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
    }

  });
