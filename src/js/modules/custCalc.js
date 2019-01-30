// Gross Margin Dollars (Profit)  =  (Volume * Units in a case * Retail Price) - (Volume * COGS per case)
var grossMarginDollars = function(
  volumeCurrentYear,
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
) {
  return (
    volumeCurrentYear * Math.abs(unitsPerCase) * Math.abs(retailPricePerUnit) -
    volumeCurrentYear * Math.abs(costOfGoodsSoldCurrentYear)
  );
  // return rounder(gmd);
};

// Penny Profit  =  Retail Price per unit  -  Cost of Goods Sold per unit / Units Per Case
var pennyProfit = function(
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
) {
  //=Retail Price - (COGS per case / Units in a case)
  return (
    Math.abs(retailPricePerUnit) -
    Math.abs(costOfGoodsSoldCurrentYear) / Math.abs(unitsPerCase)
  );
  // return rounder(pp);
};

// Margin Percent  =  Penny Profit / Retail Price per unit
var marginPercent = function(
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
) {
  var pp = pennyProfit(
    unitsPerCase,
    retailPricePerUnit,
    costOfGoodsSoldCurrentYear,
  );
  return Math.abs(pp) / Math.abs(retailPricePerUnit);
};

// Average Inventory  =  (Beginning Inventory + Ending Inventory)  /  2
var averageInventory = function(beginInventory, endInventory) {
  return (Math.abs(beginInventory) + Math.abs(endInventory)) / 2;
  // return rounder(ai);
};

// Average Inventory at Cost  =  Average Inventory x Cost of Goods Sold per case
var averageInvAtCost = function(
  beginInventory,
  endInventory,
  costOfGoodsSoldCurrentYear,
) {
  var ai = averageInventory(beginInventory, endInventory);
  return Math.abs(ai) * Math.abs(costOfGoodsSoldCurrentYear);
  // return rounder(aiac);
};

// Inventory Turns  =  Volume / Inventory on Display
var inventoryTurns = function(volumeCurrentYear, inventoryOnDisplay) {
  return Math.abs(volumeCurrentYear) / Math.abs(inventoryOnDisplay);
  // return roundTo(it, 1);
};

//GMROII ($) =  Gross Margin Dollars  /  Average Inventory at Cost
var gmroiiDollar = function(
  volumeCurrentYear,
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
  beginInventory,
  endInventory,
) {
  var gmd = grossMarginDollars(
    volumeCurrentYear,
    unitsPerCase,
    retailPricePerUnit,
    costOfGoodsSoldCurrentYear,
  );
  var aiat = averageInvAtCost(
    beginInventory,
    endInventory,
    costOfGoodsSoldCurrentYear,
  );

  return Math.abs(gmd) / Math.abs(aiat);
};

// GMROII (%) =  Margin Percent  x  ( Revenue  /  Average Inventory at Cost)
var gmroiiPercent = function(
  volumeCurrentYear,
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
  beginInventory,
  endInventory,
) {
  var mp = marginPercent(
    unitsPerCase,
    retailPricePerUnit,
    costOfGoodsSoldCurrentYear,
  );
  var aiat = averageInvAtCost(
    beginInventory,
    endInventory,
    costOfGoodsSoldCurrentYear,
  );

  return (
    mp *
    ((volumeCurrentYear * Math.abs(unitsPerCase) * Math.abs(retailPricePerUnit)) / aiat)
  );
};

// Profit per Square Foot  =  Gross Margin Dollars  /  Square Feet of Selling Space
var profPerSqFt = function(
  volumeCurrentYear,
  unitsPerCase,
  retailPricePerUnit,
  costOfGoodsSoldCurrentYear,
  squareFtOfSellSpace,
) {
  var gmd = grossMarginDollars(
    volumeCurrentYear,
    unitsPerCase,
    retailPricePerUnit,
    costOfGoodsSoldCurrentYear,
  );
  return Math.abs(gmd) / Math.abs(squareFtOfSellSpace);
  // return rounder(ppsf);
};

// Cost per Square Foot  =  COGS /  Square Feet of Selling Space
var costPerSqFt = function(volumeCurrentYear, costOfGoodsSoldCurrentYear, squareFtOfSellSpace) {
  return (
    (Math.abs(costOfGoodsSoldCurrentYear) * volumeCurrentYear) / Math.abs(squareFtOfSellSpace)
  );
  // return rounder(cpsf);
};

// Breakeven  =  (Customer's Current Profit / Proposed Customer Profit per case) - Current Volume
var breakEven = function(
  currentGrossMarginDollars,
  proposedGrossMarginDollars,
  currentVolume,
) {
  return (
    Math.abs(currentGrossMarginDollars) / Math.abs(proposedGrossMarginDollars) -
    Math.abs(currentVolume)
  );
  // return rounder(be);
};

// Export formulas as module
define(function() {
  return {
    grossMarginDollars: grossMarginDollars,
    pennyProfit: pennyProfit,
    marginPercent: marginPercent,
    averageInventory: averageInventory,
    averageInvAtCost: averageInvAtCost,
    inventoryTurns: inventoryTurns,
    gmroiiDollar: gmroiiDollar,
    gmroiiPercent: gmroiiPercent,
    profPerSqFt: profPerSqFt,
    costPerSqFt: costPerSqFt,
    breakEven: breakEven,
    breakEven: breakEven,
  };
});
