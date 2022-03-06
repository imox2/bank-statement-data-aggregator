"use strict";
exports.__esModule = true;
exports.getTotalsForDates = exports.getTotalsForEntities = void 0;
var moment_1 = require("moment");
function getTotalsForEntities(collection, sort) {
    if (sort === void 0) { sort = true; }
    var entitiesSumObj = collection.reduce(function (result, item) {
        var index = item.entity;
        result[index] = (result[index] || 0) + item.amount;
        return result;
    }, {});
    var result = entitiesSumObj;
    if (sort) {
        var sorted_1 = {};
        Object.keys(entitiesSumObj).sort(function (a, b) { return entitiesSumObj[b] - entitiesSumObj[a]; }).map(function (item) { return sorted_1[item] = entitiesSumObj[item]; });
        result = sorted_1;
    }
    return result;
}
exports.getTotalsForEntities = getTotalsForEntities;
var sortDateMoments = function (testObj) {
    var orderedDates = {};
    Object.keys(testObj).sort(function (a, b) {
        return (0, moment_1["default"])(a, 'DD/MM/YYYY').toDate() - (0, moment_1["default"])(b, 'DD/MM/YYYY').toDate();
    }).forEach(function (key) {
        orderedDates[key] = testObj[key];
    });
    return orderedDates;
};
function getTotalsForDates(collection, sort) {
    if (sort === void 0) { sort = true; }
    var entitiesSumObj = collection.reduce(function (result, item) {
        var index = item.date;
        result[index] = (result[index] || 0) + item.amount;
        return result;
    }, {});
    var result = entitiesSumObj;
    if (sort) {
        var sorted_2 = {};
        Object.keys(entitiesSumObj).sort(function (a, b) { return entitiesSumObj[b] - entitiesSumObj[a]; }).map(function (item) { return sorted_2[item] = entitiesSumObj[item]; });
        result = sortDateMoments(sorted_2);
    }
    return result;
}
exports.getTotalsForDates = getTotalsForDates;
