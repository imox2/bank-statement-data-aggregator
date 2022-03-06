"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalsForDates = exports.getTotalsForEntities = void 0;
const moment_1 = __importDefault(require("moment"));
function getTotalsForEntities(collection, sort = true) {
    const entitiesSumObj = collection.reduce(function (result, item) {
        var index = item.entity;
        result[index] = (result[index] || 0) + item.amount;
        return result;
    }, {});
    let result = entitiesSumObj;
    if (sort) {
        const sorted = {};
        Object.keys(entitiesSumObj).sort((a, b) => entitiesSumObj[b] - entitiesSumObj[a]).map(item => sorted[item] = entitiesSumObj[item]);
        result = sorted;
    }
    return result;
}
exports.getTotalsForEntities = getTotalsForEntities;
const sortDateMoments = (testObj) => {
    const orderedDates = {};
    Object.keys(testObj).sort(function (a, b) {
        return (0, moment_1.default)(a, 'DD/MM/YYYY').toDate() - (0, moment_1.default)(b, 'DD/MM/YYYY').toDate();
    }).forEach(function (key) {
        orderedDates[key] = testObj[key];
    });
    return orderedDates;
};
function getTotalsForDates(collection, sort = true) {
    const entitiesSumObj = collection.reduce(function (result, item) {
        var index = item.date;
        result[index] = (result[index] || 0) + item.amount;
        return result;
    }, {});
    let result = entitiesSumObj;
    if (sort) {
        const sorted = {};
        Object.keys(entitiesSumObj).sort((a, b) => entitiesSumObj[b] - entitiesSumObj[a]).map(item => sorted[item] = entitiesSumObj[item]);
        result = sortDateMoments(sorted);
    }
    return result;
}
exports.getTotalsForDates = getTotalsForDates;
//# sourceMappingURL=aggregator.js.map