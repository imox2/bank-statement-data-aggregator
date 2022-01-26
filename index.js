"use strict";
// const xlsxFile = require('read-excel-file/node');
// const xlsx = require('xlsx');
exports.__esModule = true;
var xlsx = require("xlsx");
// I have moved the exported xls in the same directiory as the script
var iciciBankExportedFile = 'OpTransactionHistory24-01-2022.xls';
var readExcel = function () {
    var workbook = xlsx.readFile(iciciBankExportedFile);
    var sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var data5 = JSON.stringify(data[6]);
    //console.log(data);
    return data;
};
var excelJson = readExcel();
console.log(excelJson);
