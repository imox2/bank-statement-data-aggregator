"use strict";
exports.__esModule = true;
exports.tagRecords = void 0;
var commonTags = {
    'BSELTD': 'Mutual fund',
    'Payment from Ph': 'PhonePe',
    'add-money@paytm': 'Added to paytm',
    'cred': 'Cred'
};
function tagRecords(collection) {
    collection.forEach(function (col) {
        col.tags = [];
        Object.keys(commonTags).forEach(function (tag) {
            if (col.description.indexOf(tag) != -1) {
                col.tags.push(commonTags[tag]);
            }
        });
    });
}
exports.tagRecords = tagRecords;
