import { GoogleSpreadsheet, ServiceAccountCredentials } from 'google-spreadsheet';
import * as credentials from '../../credentials.json';


class SpreadsheetConnection {

    private _spreadSheet: GoogleSpreadsheet;

    constructor() {
        this._spreadSheet = new GoogleSpreadsheet(process.env.ALLOCATION_ID || "ALLOCATION_ID")
    }

    get spreadSheet(): GoogleSpreadsheet {
        return this._spreadSheet;
    }


    async start() {
        try {
            await this._spreadSheet.useServiceAccountAuth(credentials)

            await this._spreadSheet.loadInfo()

            console.log(`Conexão estabelecida com a planilha`)
        } catch (error) {
            console.log(`Erro ao se conectar a planilha ${error}`)
        }
    }
}
const spreadsheetConnection = new SpreadsheetConnection();

export default spreadsheetConnection;



