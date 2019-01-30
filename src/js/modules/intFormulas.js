// Input Whole Objects
define(['modules/intCalc'], function(intCalc) {
  // Regex patterns
  var REGEX_WHOLE_NUMBER = '\\d*';
  var REGEX_CURRENCY = '\\d+(\\.\\d{2})?';
  var REGEX_PERCENTAGE = '[0-9]+([\\.,][0-9]+)?';

  // Input objects to build <input>
  var volumeCurrentYear = {
    id: 'volumeCurrentYear',
    label: 'Volume',
    year: 'current',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var volumePriorYear = {
    id: 'volumePriorYear',
    label: 'Volume',
    year: 'prior',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var netPriceCurrentYear = {
    id: 'netPriceCurrentYear',
    label: 'Net Price',
    year: 'current',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var deadNetCurrentYear = {
    id: 'deadNetCurrentYear',
    label: 'Dead Net Price',
    year: 'current',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var deadNetPriorYear = {
    id: 'deadNetPriorYear',
    label: 'Dead Net Price',
    year: 'prior',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var costOfGoodsSoldCurrentYear = {
    id: 'costOfGoodsSoldCurrentYear',
    label: 'Cost Of Goods Sold Per Case',
    year: 'current',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var costOfGoodsSoldPriorYear = {
    id: 'costOfGoodsSoldPriorYear',
    label: 'Cost Of Goods Sold Per Case',
    year: 'prior',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };

  return {
    revenueCurrentYear: {
      title: 'Revenue',
      id: 'revenueCurrentYear',
      outputType: 'currency',
      formula: intCalc.revenueCurrentYear,
      inputs: {
        1: volumeCurrentYear,
        2: netPriceCurrentYear,
      },
    },

    netRevenueCurrentYear: {
      title: 'Net Revenue',
      id: 'netRevenueCurrentYear',
      outputType: 'currency',
      formula: intCalc.netRevenueCurrentYear,
      inputs: {
        1: volumeCurrentYear,
        2: deadNetCurrentYear,
      },
    },

    netRevenuePerCaseCurrentYear: {
      title: 'Net Revenue Per Case',
      id: 'netRevenuePerCaseCurrentYear',
      outputType: 'currency',
      formula: intCalc.netRevenuePerCaseCurrentYear,
      inputs: {
        1: volumeCurrentYear,
        2: deadNetCurrentYear,
      },
    },

    marginalContributionCurrentYear: {
      title: "Marginal Contribution (MC $'s)",
      id: 'marginalContributionCurrentYear',
      outputType: 'currency',
      formula: intCalc.marginalContributionCurrentYear,
      previousYearDisabled: true,

      inputs: {
        1: volumeCurrentYear,
        2: deadNetCurrentYear,
        3: costOfGoodsSoldCurrentYear,
      },
    },

    marginalContributionPerCaseCurrentYear: {
      title: 'Marginal Contribution Per Case',
      id: 'marginalContributionPerCaseCurrentYear',
      outputType: 'currency',
      formula: intCalc.marginalContributionPerCaseCurrentYear,
      previousYearDisabled: true,
      inputs: {
        1: volumeCurrentYear,
        2: deadNetCurrentYear,
        3: costOfGoodsSoldCurrentYear,
      },
    },

    marginalContributionFlowThru: {
      title: 'Marginal Contribution Flow Thru',
      id: 'marginalContributionFlowThru',
      outputType: 'percentage',
      formula: intCalc.marginalContributionFlowThru,
      previousYearDisabled: true,
      sections: {
        1: {
          id: 'deadNetPrice',
          title: 'Dead Net Price',
          inputs: {
            1: deadNetCurrentYear,
            2: deadNetPriorYear,
          },
        },
        2: {
          id: 'costOfGoodsSoldPerCase',
          title: 'Cost Of Goods Sold Per Case',
          inputs: {
            1: costOfGoodsSoldCurrentYear,
            2: costOfGoodsSoldPriorYear,
          },
        },
      },
    },

    toplineGrowth: {
      title: 'Topline Growth',
      id: 'toplineGrowth',
      outputType: 'percentage',
      formula: intCalc.toplineGrowth,
      previousYearDisabled: true,
      sections: {
        1: {
          id: 'volume',
          title: 'Volume',
          inputs: {
            1: volumeCurrentYear,
            2: volumePriorYear,
          },
        },
        2: {
          id: 'deadNetPrice',
          title: 'Dead Net Price',
          inputs: {
            1: deadNetCurrentYear,
            2: deadNetPriorYear,
          },
        },
      },
    },
  };
});
