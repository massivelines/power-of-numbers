// define(function(require) {
//   var test = 'custForm';
//   return test;
// })

/******************
 * Formula arguments must match input id's
 * Object title must match Object id
 ******************/

// id: {
//   title: 'title',
//   id: 'id',
//   outputType: 'currency',
//   formula: custCalc.function,
//   inputs:{
//     1: var,
//     2: var,
//     3: var,
//   }
// },

//  todo add example object and detials

// Input Whole Objects
define(['modules/custCalc'], function(custCalc) {
  // Regex patterns
  var REGEX_WHOLE_NUMBER = '\\d*';
  var REGEX_CURRENCY = '\\d+(\\.\\d{2})?';
  var REGEX_PERCENTAGE = '[0-9]+([\\.,][0-9]+)?';

  // Input objects to build <input>
  var volumeCurrentYear = {
    id: 'volumeCurrentYear',
    label: 'Volume',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var unitsPerCase = {
    id: 'unitsPerCase',
    label: 'Units in a Case',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var retailPricePerUnit = {
    id: 'retailPricePerUnit',
    label: 'Retail Price Per Unit',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var costOfGoodsSoldCurrentYear = {
    id: 'costOfGoodsSoldCurrentYear',
    label: 'Product Cost Per Case',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var beginInventory = {
    id: 'beginInventory',
    label: 'Beginning Inventory',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var endInventory = {
    id: 'endInventory',
    label: 'Ending Inventory',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var inventoryOnDisplay = {
    id: 'inventoryOnDisplay',
    label: 'Inventory on Display',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var squareFtOfSellSpace = {
    id: 'squareFtOfSellSpace',
    label: 'Square Feet of Selling Space',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var currentVolume = {
    id: 'currentVolume',
    label: 'Current Volume',
    dataFormat: 'whole',
    pattern: REGEX_WHOLE_NUMBER,
  };
  var currentGrossMarginDollars = {
    id: 'currentGrossMarginDollars',
    label: 'Current Gross Margin Dollars (Profit)',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };
  var proposedGrossMarginDollars = {
    id: 'proposedGrossMarginDollars',
    label: 'Proposed Gross Margin Dollars (Profit) Per Case',
    dataFormat: 'currency',
    pattern: REGEX_CURRENCY,
  };

  return {
    grossMarginDollars: {
      title: 'Gross Margin Dollars (Profit)',
      id: 'grossMarginDollars',
      outputType: 'currency',
      formula: custCalc.grossMarginDollars,
      inputs: {
        1: volumeCurrentYear,
        2: unitsPerCase,
        3: retailPricePerUnit,
        4: costOfGoodsSoldCurrentYear,
      },
    },

    pennyProfit: {
      title: 'Penny Profit',
      id: 'pennyProfit',
      outputType: 'currency',
      formula: custCalc.pennyProfit,
      inputs: {
        1: unitsPerCase,
        2: retailPricePerUnit,
        3: costOfGoodsSoldCurrentYear,
      },
    },

    marginPercent: {
      title: 'Margin Percent',
      id: 'marginPercent',
      outputType: 'percentage',
      formula: custCalc.marginPercent,
      inputs: {
        1: unitsPerCase,
        2: retailPricePerUnit,
        3: costOfGoodsSoldCurrentYear,
      },
    },

    averageInventory: {
      title: 'Average Inventory',
      id: 'averageInventory',
      outputType: 'rounded',
      formula: custCalc.averageInventory,
      inputs: {
        1: beginInventory,
        2: endInventory,
      },
    },

    averageInvAtCost: {
      title: 'Average Inventory at Cost',
      id: 'averageInvAtCost',
      outputType: 'currency',
      formula: custCalc.averageInvAtCost,
      inputs: {
        1: costOfGoodsSoldCurrentYear,
        2: beginInventory,
        3: endInventory,
      },
    },

    inventoryTurns: {
      title: 'Inventory Turns',
      id: 'inventoryTurns',
      outputType: 'rounded',
      formula: custCalc.inventoryTurns,
      inputs: {
        1: volumeCurrentYear,
        2: inventoryOnDisplay,
      },
    },

    gmroiiDollar: {
      title: 'GMROII ($)',
      id: 'gmroiiDollar',
      outputType: 'currency',
      formula: custCalc.gmroiiDollar,
      inputs: {
        1: volumeCurrentYear,
        2: unitsPerCase,
        3: retailPricePerUnit,
        4: costOfGoodsSoldCurrentYear,
        5: beginInventory,
        6: endInventory,
      },
    },

    gmroiiPercent: {
      title: 'GMROII (%)',
      id: 'gmroiiPercent',
      outputType: 'percentage',
      formula: custCalc.gmroiiPercent,
      inputs: {
        1: volumeCurrentYear,
        2: unitsPerCase,
        3: retailPricePerUnit,
        4: costOfGoodsSoldCurrentYear,
        5: beginInventory,
        6: endInventory,
      },
    },

    profPerSqFt: {
      title: 'Profit per Square Foot',
      id: 'profPerSqFt',
      outputType: 'currency',
      formula: custCalc.profPerSqFt,
      inputs: {
        1: volumeCurrentYear,
        2: unitsPerCase,
        3: retailPricePerUnit,
        4: costOfGoodsSoldCurrentYear,
        5: squareFtOfSellSpace,
      },
    },

    costPerSqFt: {
      title: 'Cost per Square Foot',
      id: 'costPerSqFt',
      outputType: 'currency',
      formula: custCalc.costPerSqFt,
      inputs: {
        1: volumeCurrentYear,
        2: costOfGoodsSoldCurrentYear,
        3: squareFtOfSellSpace,
      },
    },

    breakEven: {
      title: 'Breakeven',
      id: 'breakEven',
      outputType: 'integer',
      formula: custCalc.breakEven,
      inputs: {
        1: currentVolume,
        2: currentGrossMarginDollars,
        3: proposedGrossMarginDollars,
      },
    },
  };
});
