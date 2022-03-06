"use strict";
/*type examples
IMPS = MMT/IMPS/200101529816/Ensure KYC AML /WISE PAYME/H
UPI = UPI/201029357317/Payment from Ph/sharad.mandal1@/Citibank/YBL1ac626425779453e9e
NEFT = NEFT-CITIN22206853150-PAYPAL PAYMENTS PL-OPGSP COLL AC-P0802-0521888008-CITI010
ACH = ACH/BCZPA3146F-AY2021-22/CE22165757882
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.convertDepositToMeaningfulData = void 0;
var DepositModes = ['IMPS', 'UPI', 'NEFT', 'ACH'];
var IMPSInfoParser = function (description, mode) {
    // MMT/IMPS/200101529816/Ensure KYC AML /WISE PAYME/H
    //MMT/IMPS/200312142780/IT Services/AVANSA IT /HDFC
    var infoPositons = {
        'bank': 6,
        'entity': 5,
        'service': 4
    };
    var splittedInfo = description.split('/');
    var info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'NA',
        'description': description
    };
    Object.keys(infoPositons).forEach(function (infoType) {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
var UPIInfoParser = function (description, mode) {
    // UPI/200277440493/UPI/rishavraj1905@o/Bank of India/AXIad15b48b470d4be6affe1bfe4
    // UPI/200709567461/UPI/saisutishna-1@o/Kotak Mahindra /HDFf02ec67f61b946f88f469b6
    var infoPositons = {
        'bank': 4,
        'entity': 3
    };
    var splittedInfo = description.split('/');
    var info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'UPI',
        'description': description
    };
    Object.keys(infoPositons).forEach(function (infoType) {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
var NEFTInfoParser = function (description, mode) {
    // NEFT-CITIN22206853150-PAYPAL PAYMENTS PL-OPGSP COLL AC-P0802-0521888008-CITI010
    var infoPositons = {
        'bank': 0,
        'entity': 2
    };
    var splittedInfo = description.split(' ');
    var info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'NEFT',
        'description': description
    };
    Object.keys(infoPositons).forEach(function (infoType) {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
var ACHInfoParser = function (description, mode) {
    // ACH/BCZPA3146F-AY2021-22/CE22165757882
    var infoPositons = {
        'bank': 0,
        'entity': 1
    };
    var splittedInfo = description.split('/');
    var info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'ACH',
        'description': description
    };
    Object.keys(infoPositons).forEach(function (infoType) {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
var determineDepositAndSenderMode = function (description) {
    var mode = 'NA';
    DepositModes.forEach(function (DepositMode) {
        if (description.indexOf(DepositMode) != -1) {
            mode = DepositMode;
        }
    });
    return mode;
};
var convertDepositToMeaningfulData = function (incomings) {
    var result = [];
    incomings.forEach(function (data) {
        var mode = determineDepositAndSenderMode(data.description);
        var modeFunctionMap = {
            'IMPS': IMPSInfoParser,
            'UPI': UPIInfoParser,
            'NEFT': NEFTInfoParser,
            'ACH': ACHInfoParser
        };
        result.push(__assign(__assign({}, data), modeFunctionMap[mode](data.description, mode)));
    });
    return result;
};
exports.convertDepositToMeaningfulData = convertDepositToMeaningfulData;
