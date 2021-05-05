import AllocationProps from '../interfaces/allocation_props';
import SpreadsheetConnection from './spreadsheet_connection';
import { sortPage } from "../puppetter/puppeteer";
import { getTodayDate } from '../utils/get_today';


export async function InsertAllocation(data: AllocationProps) {

    const today = getTodayDate();

    const sheet = SpreadsheetConnection.spreadSheet.sheetsByIndex[0]

    await sheet.addRow(
        {
            Nome: data.username,
            Data: today,
            "Projeto / Funcao": data.project,
            Tempo: data.hours,
            Obs: data.obs ? data.obs : ""
        }
    )
}