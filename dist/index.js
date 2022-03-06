"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = __importStar(require("xlsx"));
const converter_1 = require("./utilities/converter");
const aggregator_1 = require("./utilities/aggregator");
// I have moved the exported xls in the same directiory as the script
const iciciBankExportedFile = 'OpTransactionHistoryToday.xls';
const readExcel = () => {
    const workbook = xlsx.readFile(iciciBankExportedFile);
    const sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var data5 = JSON.stringify(data[6]);
    //console.log(data);
    return data;
};
const parseExcelJson = data => {
    const headerRowObj = data.find(row => row.__EMPTY_1 == 'S No.');
    const headerMap = {};
    Object.keys(headerRowObj).forEach(colName => {
        headerMap[colName] = headerRowObj[colName];
    });
    const dataRowsObjs = data.filter(row => row.__EMPTY_1 > 0);
    const correctedDataRowsObjs = [];
    dataRowsObjs.forEach(row => {
        const temp = {};
        Object.keys(row).forEach(colName => {
            temp[headerMap[colName]] = row[colName];
        });
        correctedDataRowsObjs.push(temp);
    });
    return correctedDataRowsObjs;
};
const calculateWithdrawalDeposit = data => {
    const withdrawalKey = 'Withdrawal Amount (INR )';
    const depositKey = 'Deposit Amount (INR )';
    const incomingAmountSum = data.reduce((a, b) => a + parseInt(b[depositKey]), 0);
    const incomingAmounts = data.filter(row => row[depositKey] > 0).map(row => {
        return {
            'amount': row[depositKey],
            'description': row['Transaction Remarks'],
            'date': row['Transaction Date']
        };
    });
    const outgoingAmounts = data.filter(row => row[withdrawalKey] > 0).map(row => {
        return {
            'amount': row[withdrawalKey],
            'description': row['Transaction Remarks'],
            'date': row['Transaction Date']
        };
    });
    const outgoingAmountSum = data.reduce((a, b) => a + parseInt(b[withdrawalKey]), 0);
    // console.log("incomingAmountSum:",incomingAmountSum);
    // console.log("outgoingAmountSum:",outgoingAmountSum);
    // console.log("incomingAmounts:",incomingAmounts);
    // console.log("outgoingAmounts:",outgoingAmounts);
    const meaningfulIncomings = (0, converter_1.convertDepositToMeaningfulData)(incomingAmounts);
    const meaningfulOutgoings = (0, converter_1.convertDepositToMeaningfulData)(outgoingAmounts);
    // tagRecords(meaningfulOutgoings);
    //    console.log("incomings:", meaningfulIncomings);
    //console.log("outgoings:", meaningfulOutgoings);
    console.log('entities inpcoming:', (0, aggregator_1.getTotalsForEntities)(meaningfulIncomings));
    //    console.log('entities outgoing:',getTotalsForEntities(meaningfulOutgoings))
    //console.log('entities date incoming:',getTotalsForDates(meaningfulIncomings))
    //    console.log('entities date outgoing:',getTotalsForDates(meaningfulOutgoings))
    //    console.log("one day 03/01/2022:",getOutgoingsOfADate(meaningfulOutgoings,'10/01/2022'))
    // console.log("findRecordsAboveAmount 5000:",findRecordsAboveAndBelowAmount(meaningfulOutgoings,10000,30000))
    //     console.log("incomingAmountSum:",incomingAmountSum);
    //     console.log("outgoingAmountSum:",outgoingAmountSum);
};
const excelJson = readExcel();
const parsedData = parseExcelJson(excelJson);
calculateWithdrawalDeposit(parsedData);
//# sourceMappingURL=index.js.map