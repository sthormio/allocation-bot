import SpreadsheetConnection from './spreadsheet_connection';


export async function InsertAllocation() {
    addNewRow();
}

async function addNewRow() {

    await SpreadsheetConnection.spreadSheet.loadInfo()

    const sheet = SpreadsheetConnection.spreadSheet.sheetsByIndex[0]

    await sheet.addRow({})
}