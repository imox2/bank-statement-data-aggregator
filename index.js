"use strict";
exports.__esModule = true;
var xlsx = require("xlsx");
var converter_1 = require("./utilities/converter");
var aggregator_1 = require("./utilities/aggregator");
// I have moved the exported xls in the same directiory as the script
var iciciBankExportedFile = 'OpTransactionHistoryToday.xls';
var readExcel = function () {
    var workbook = xlsx.readFile(iciciBankExportedFile);
    var sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var data5 = JSON.stringify(data[6]);
    //console.log(data);
    return data;
};
var parseExcelJson = function (data) {
    var headerRowObj = data.find(function (row) { return row.__EMPTY_1 == 'S No.'; });
    var headerMap = {};
    Object.keys(headerRowObj).forEach(function (colName) {
        headerMap[colName] = headerRowObj[colName];
    });
    var dataRowsObjs = data.filter(function (row) { return row.__EMPTY_1 > 0; });
    var correctedDataRowsObjs = [];
    dataRowsObjs.forEach(function (row) {
        var temp = {};
        Object.keys(row).forEach(function (colName) {
            temp[headerMap[colName]] = row[colName];
        });
        correctedDataRowsObjs.push(temp);
    });
    return correctedDataRowsObjs;
};
var calculateWithdrawalDeposit = function (data) {
    var withdrawalKey = 'Withdrawal Amount (INR )';
    var depositKey = 'Deposit Amount (INR )';
    var incomingAmountSum = data.reduce(function (a, b) { return a + parseInt(b[depositKey]); }, 0);
    var incomingAmounts = data.filter(function (row) { return row[depositKey] > 0; }).map(function (row) {
        return {
            'amount': row[depositKey],
            'description': row['Transaction Remarks'],
            'date': row['Transaction Date']
        };
    });
    var outgoingAmounts = data.filter(function (row) { return row[withdrawalKey] > 0; }).map(function (row) {
        return {
            'amount': row[withdrawalKey],
            'description': row['Transaction Remarks'],
            'date': row['Transaction Date']
        };
    });
    var outgoingAmountSum = data.reduce(function (a, b) { return a + parseInt(b[withdrawalKey]); }, 0);
    // console.log("incomingAmountSum:",incomingAmountSum);
    // console.log("outgoingAmountSum:",outgoingAmountSum);
    // console.log("incomingAmounts:",incomingAmounts);
    // console.log("outgoingAmounts:",outgoingAmounts);
    var meaningfulIncomings = (0, converter_1.convertDepositToMeaningfulData)(incomingAmounts);
    var meaningfulOutgoings = (0, converter_1.convertDepositToMeaningfulData)(outgoingAmounts);
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
var excelJson = readExcel();
var parsedData = parseExcelJson(excelJson);
calculateWithdrawalDeposit(parsedData);
