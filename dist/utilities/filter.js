"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRecordsAboveAndBelowAmount = exports.findRecordsAboveAmount = exports.getOutgoingsOfADate = void 0;
function getOutgoingsOfADate(collection, dateString, sort = true) {
    const dateData = collection.filter(col => col.date == dateString);
    return dateData;
}
exports.getOutgoingsOfADate = getOutgoingsOfADate;
function findRecordsAboveAmount(collection, amount, sort = true) {
    const data = collection.filter(col => col.amount >= amount);
    return data;
}
exports.findRecordsAboveAmount = findRecordsAboveAmount;
function findRecordsAboveAndBelowAmount(collection, aboveAmount, belowAmount, sort = true) {
    const data = collection.filter(col => col.amount >= aboveAmount && col.amount < belowAmount);
    return data;
}
exports.findRecordsAboveAndBelowAmount = findRecordsAboveAndBelowAmount;
//# sourceMappingURL=filter.js.map