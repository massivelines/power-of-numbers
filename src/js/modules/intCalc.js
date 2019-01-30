// Revenue Current Year = Volume Current Year x Net Price Current Year
var revenueCurrentYear = function(volumeCurrentYear, netPriceCurrentYear) {
  return Math.abs(volumeCurrentYear) * Math.abs(netPriceCurrentYear);
};

//Net Revenue Current Year = Volume Current Year x Dead Net Price Current Year
var netRevenueCurrentYear = function(volumeCurrentYear, deadNetCurrentYear) {
  return Math.abs(volumeCurrentYear) * Math.abs(deadNetCurrentYear);
};

//Net Revenue Prior Year = Volume Prior Year x Dead Net Price Prior Year
var netRevenuePriorYear = function(volumePriorYear, deadNetPriorYear) {
  return Math.abs(volumePriorYear) * Math.abs(deadNetPriorYear);
};

//Net Revenue Per Case Current Year = Net Revenue / Volume Current Year
var netRevenuePerCaseCurrentYear = function(
  volumeCurrentYear,
  deadNetCurrentYear,
) {
  var netRevenueCY = netRevenueCurrentYear(
    volumeCurrentYear,
    deadNetCurrentYear,
  );
  return Math.abs(netRevenueCY) / Math.abs(volumeCurrentYear);
};

//Marginal Contribution Current Year (MC $'s) = Net Revenue - COGS Current Year = Net Revenue - (Cogs Per Case * Volume)
var marginalContributionCurrentYear = function(
  volumeCurrentYear,
  deadNetCurrentYear,
  costOfGoodsSoldCurrentYear,
) {
  var netRevenueCY = netRevenueCurrentYear(
    volumeCurrentYear,
    deadNetCurrentYear,
  );
  return (
    Math.abs(netRevenueCY) -
    Math.abs(costOfGoodsSoldCurrentYear) * volumeCurrentYear
  );
};

//Marginal Contribution Prior Year (MC $'s) = Net Revenue - COGS Prior Year = Net Revenue - (Cogs Per Case * Volume)
var marginalContributionPriorYear = function(
  volumePriorYear,
  deadNetPriorYear,
  costOfGoodsSoldPriorYear,
) {
  var netRevenuePY = netRevenuePriorYear(volumePriorYear, deadNetPriorYear);
  return (
    Math.abs(netRevenuePY) -
    Math.abs(costOfGoodsSoldPriorYear) * volumePriorYear
  );
};

//Marginal Contribution Per Case Current Year = MC / Volume Current Year
var marginalContributionPerCaseCurrentYear = function(
  volumeCurrentYear,
  deadNetCurrentYear,
  costOfGoodsSoldCurrentYear,
) {
  var mcCY = marginalContributionCurrentYear(
    volumeCurrentYear,
    deadNetCurrentYear,
    costOfGoodsSoldCurrentYear,
  );
  return Math.abs(mcCY) / volumeCurrentYear;
};

//Marginal Contribution Per Case Prior Year = MC / Volume Prior Year
var marginalContributionPerCasePriorYear = function(
  volumePriorYear,
  deadNetPriorYear,
  costOfGoodsSoldPriorYear,
) {
  var mcPY = marginalContributionPriorYear(
    volumePriorYear,
    deadNetPriorYear,
    costOfGoodsSoldPriorYear,
  );
  return Math.abs(mcPY) / volumePriorYear;
};

//Marginal Contribution Flow Thru =
//= ((Dead Net Price per Case Current Year - COGS Current Year)-(Dead Net Price per Case Prior Year - COGS Prior Year)) /(Dead Net Price per Case Current Year - Dead Net Price per Case Prior Year)
var marginalContributionFlowThru = function(
  deadNetCurrentYear,
  deadNetPriorYear,
  costOfGoodsSoldCurrentYear,
  costOfGoodsSoldPriorYear,
) {
  return (
    (deadNetCurrentYear -
      costOfGoodsSoldCurrentYear -
      (deadNetPriorYear - costOfGoodsSoldPriorYear)) /
    (deadNetCurrentYear - deadNetPriorYear)
  );
};

//Topline Growth = Volume growth % + Net Revenue Growth %
//=((Volume Current Year-Volume Prior Year)/Volume Prior Year) + ((Dead Net Price Current Year - Dead Net Price Prior Year)/Dead Net Price Prior Year)
var toplineGrowth = function(
  volumeCurrentYear,
  volumePriorYear,
  deadNetCurrentYear,
  deadNetPriorYear,
) {
  return (
    (volumeCurrentYear - volumePriorYear) / Math.abs(volumePriorYear) +
    (deadNetCurrentYear - deadNetPriorYear) / Math.abs(deadNetPriorYear)
  );
};

// Export formulas as module
define(function() {
  return {
    revenueCurrentYear: revenueCurrentYear,
    netRevenueCurrentYear: netRevenueCurrentYear,
    netRevenuePriorYear: netRevenuePriorYear,
    netRevenuePerCaseCurrentYear: netRevenuePerCaseCurrentYear,
    marginalContributionCurrentYear: marginalContributionCurrentYear,
    marginalContributionPriorYear: marginalContributionPriorYear,
    marginalContributionPerCaseCurrentYear: marginalContributionPerCaseCurrentYear,
    marginalContributionPerCasePriorYear: marginalContributionPerCasePriorYear,
    marginalContributionFlowThru: marginalContributionFlowThru,
    toplineGrowth: toplineGrowth,
  };
});
