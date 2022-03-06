"use strict";
/*type examples
IMPS = MMT/IMPS/200101529816/Ensure KYC AML /WISE PAYME/H
UPI = UPI/201029357317/Payment from Ph/sharad.mandal1@/Citibank/YBL1ac626425779453e9e
NEFT = NEFT-CITIN22206853150-PAYPAL PAYMENTS PL-OPGSP COLL AC-P0802-0521888008-CITI010
ACH = ACH/BCZPA3146F-AY2021-22/CE22165757882
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDepositToMeaningfulData = void 0;
const DepositModes = ['IMPS', 'UPI', 'NEFT', 'ACH'];
const IMPSInfoParser = (description, mode) => {
    // MMT/IMPS/200101529816/Ensure KYC AML /WISE PAYME/H
    //MMT/IMPS/200312142780/IT Services/AVANSA IT /HDFC
    const infoPositons = {
        'bank': 6,
        'entity': 5,
        'service': 4
    };
    const splittedInfo = description.split('/');
    let info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'NA',
        'description': description,
    };
    Object.keys(infoPositons).forEach(infoType => {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
const UPIInfoParser = (description, mode) => {
    // UPI/200277440493/UPI/rishavraj1905@o/Bank of India/AXIad15b48b470d4be6affe1bfe4
    // UPI/200709567461/UPI/saisutishna-1@o/Kotak Mahindra /HDFf02ec67f61b946f88f469b6
    const infoPositons = {
        'bank': 4,
        'entity': 3,
    };
    const splittedInfo = description.split('/');
    let info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'UPI',
        'description': description,
    };
    Object.keys(infoPositons).forEach(infoType => {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
const NEFTInfoParser = (description, mode) => {
    // NEFT-CITIN22206853150-PAYPAL PAYMENTS PL-OPGSP COLL AC-P0802-0521888008-CITI010
    const infoPositons = {
        'bank': 0,
        'entity': 2,
    };
    const splittedInfo = description.split(' ');
    let info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'NEFT',
        'description': description,
    };
    Object.keys(infoPositons).forEach(infoType => {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
const ACHInfoParser = (description, mode) => {
    // ACH/BCZPA3146F-AY2021-22/CE22165757882
    const infoPositons = {
        'bank': 0,
        'entity': 1,
    };
    const splittedInfo = description.split('/');
    let info = {
        'mode': mode,
        'bank': 'NA',
        'entity': 'NA',
        'service': 'ACH',
        'description': description,
    };
    Object.keys(infoPositons).forEach(infoType => {
        info[infoType] = splittedInfo[infoPositons[infoType]] ?
            splittedInfo[infoPositons[infoType]] : 'NA';
    });
    return info;
};
const determineDepositAndSenderMode = (description) => {
    let mode = 'NA';
    DepositModes.forEach((DepositMode) => {
        if (description.indexOf(DepositMode) != -1) {
            mode = DepositMode;
        }
    });
    return mode;
};
const convertDepositToMeaningfulData = (incomings) => {
    const result = [];
    incomings.forEach(data => {
        const mode = determineDepositAndSenderMode(data.description);
        const modeFunctionMap = {
            'IMPS': IMPSInfoParser,
            'UPI': UPIInfoParser,
            'NEFT': NEFTInfoParser,
            'ACH': ACHInfoParser,
        };
        result.push(Object.assign(Object.assign({}, data), modeFunctionMap[mode](data.description, mode)));
    });
    return result;
};
exports.convertDepositToMeaningfulData = convertDepositToMeaningfulData;
//# sourceMappingURL=converter.js.map