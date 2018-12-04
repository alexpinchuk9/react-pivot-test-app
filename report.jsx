var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'},
]

var reduce = function(row, memo) {
  switch(row.type) {
    case 'impression': {
      memo.amountImpressions = (memo.amountImpressions || 0) + 1;
      break;
    }
    case 'load': {
      memo.amountLoads = (memo.amountLoads || 0) + 1;
      break;
    }
    case 'display': {
      memo.amountDisplays = (memo.amountDisplays || 0) + 1;
      break;
    }
  }

  memo.loadRate = memo.amountLoads * 100 / memo.amountImpressions;
  memo.displayRate = memo.amountDisplays * 100 / memo.amountLoads;

  return memo
}

var calculations = [
  {
    title: 'Impressions', value: 'amountImpressions',
    template: function(val, row) {
      return val
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  },
  {
    title: 'Loads', value: 'amountLoads',
    template: function(val, row) {
      return val
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  },
  {
    title: 'Displays', value: 'amountDisplays',
    template: function(val, row) {
      return val
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  },
  {
    title: 'Load Rate', value: 'loadRate',
    template: function(val, row) {
      return val.toFixed(1) + '%';
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  },
  {
    title: 'Display Rate', value: 'displayRate',
    template: function(val, row) {
      return val.toFixed(1) + '%';
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  }
]

module.exports = createReactClass({
  render () {
    return (
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        nPaginateRows={25}
      />
    );
  }
})
