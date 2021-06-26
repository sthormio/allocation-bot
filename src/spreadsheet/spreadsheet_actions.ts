import { AllocationProps, AllocationDayOffProps } from '../interfaces/allocation_props';
import SpreadsheetConnection from './spreadsheet_connection';
import { getTodayDate } from '../utils/get_today';


export async function InsertAllocation(data: AllocationProps) {

    const today = getTodayDate({ isReverted: false });

    const sheet = SpreadsheetConnection.spreadSheet.sheetsByIndex[0]

    await sheet.addRow(
        {
            Nome: data.username,
            Data: today,
            "Projeto / Funcao": data.project,
            Tempo: data.hours,
            Obs: data.obs ? data.obs : ""
        },
    )
}

export async function InsertDayOff(data: AllocationDayOffProps) {

    const today = getTodayDate({ isReverted: true })

    const sheet = SpreadsheetConnection.spreadSheet.sheetsByIndex[1]

    await sheet.addRow({
        Nome: data.username,
        Data: data.date ?? today.split("/").join("-"),
        Saldo: data.amount,
        Descricao: data.description ?? ""
    })

}