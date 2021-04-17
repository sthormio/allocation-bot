import AllocationProps from '../interfaces/allocation_props';
import SpreadsheetConnection from './spreadsheet_connection';
import { sortPage } from "../puppetter/puppeteer";


export async function InsertAllocation(data: AllocationProps) {

    let today = "";
    const date = new Date();

    today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    const sheet = SpreadsheetConnection.spreadSheet.sheetsByIndex[0]

    await sheet.addRow(
        {
            Nome: data.username,
            Data: today, "Projeto / Funcao": data.project,
            Tempo: data.hours,
            Obs: data.obs ? data.obs : ""
        }
    )

    await sortPage()
}