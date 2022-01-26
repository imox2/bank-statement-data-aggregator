import readXlsxFile from 'read-excel-file/node'
import * as xlsx from 'xlsx';
import {convertDepositToMeaningfulData} from './utilities/converter';
// I have moved the exported xls in the same directiory as the script
const iciciBankExportedFile:string = 'OpTransactionHistory24-01-2022.xls';

const readExcel = () => {
    const workbook = xlsx.readFile(iciciBankExportedFile);
    const sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var data5 = JSON.stringify(data[6]);
    //console.log(data);
    return data;
}

const parseExcelJson = data => {
    const headerRowObj = data.find(row => row.__EMPTY_1 == 'S No.');
    const headerMap = {};
    Object.keys(headerRowObj).forEach(colName => {
        headerMap[colName] = headerRowObj[colName];
    })

    const dataRowsObjs = data.filter(row => row.__EMPTY_1  > 0);
    const correctedDataRowsObjs = [];

    dataRowsObjs.forEach(row => {
        const temp = {};
        Object.keys(row).forEach(colName => {
            temp[headerMap[colName]] = row[colName];
        });
        correctedDataRowsObjs.push(temp);
    });

    return correctedDataRowsObjs;
}

const calculateWithdrawalDeposit = data => {
    const withdrawalKey = 'Withdrawal Amount (INR )';
    const depositKey = 'Deposit Amount (INR )';

    const incomingAmountSum = data.reduce((a, b) => a + parseInt(b[depositKey]), 0);
    const incomingAmounts = data.filter(row => row[depositKey]>0).map(row => {
        return {
            'amount':row[depositKey], 
            'description':row['Transaction Remarks'],
            'date': row['Transaction Date']
    }
    });
    const outgoingAmounts = data.filter(row => row[withdrawalKey]>0).map(row => {
        return {
            'amount':row[withdrawalKey], 
            'description':row['Transaction Remarks'],
            'date': row['Transaction Date']
    }
    });
    const outgoingAmountSum = data.reduce((a, b) => a + parseInt(b[withdrawalKey]), 0);

    // console.log("incomingAmountSum:",incomingAmountSum);
    // console.log("outgoingAmountSum:",outgoingAmountSum);
    // console.log("incomingAmounts:",incomingAmounts);
    // console.log("outgoingAmounts:",outgoingAmounts);

    console.log("incomings:", convertDepositToMeaningfulData(incomingAmounts));
}

const excelJson = readExcel();
const parsedData = parseExcelJson(excelJson);
calculateWithdrawalDeposit(parsedData);