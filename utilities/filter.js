"use strict";
exports.__esModule = true;
exports.findRecordsAboveAndBelowAmount = exports.findRecordsAboveAmount = exports.getOutgoingsOfADate = void 0;
function getOutgoingsOfADate(collection, dateString, sort) {
    if (sort === void 0) { sort = true; }
    var dateData = collection.filter(function (col) { return col.date == dateString; });
    return dateData;
}
exports.getOutgoingsOfADate = getOutgoingsOfADate;
function findRecordsAboveAmount(collection, amount, sort) {
    if (sort === void 0) { sort = true; }
    var data = collection.filter(function (col) { return col.amount >= amount; });
    return data;
}
exports.findRecordsAboveAmount = findRecordsAboveAmount;
function findRecordsAboveAndBelowAmount(collection, aboveAmount, belowAmount, sort) {
    if (sort === void 0) { sort = true; }
    var data = collection.filter(function (col) { return col.amount >= aboveAmount && col.amount < belowAmount; });
    return data;
}
exports.findRecordsAboveAndBelowAmount = findRecordsAboveAndBelowAmount;
