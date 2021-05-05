import { GoogleSpreadsheet } from 'google-spreadsheet';

class SpreadsheetConnection {

    private _spreadSheet: GoogleSpreadsheet;

    constructor() {
        this._spreadSheet = new GoogleSpreadsheet(process.env.ALLOCATION_ID || "ALLOCATION_ID")
    }

    get spreadSheet(): GoogleSpreadsheet {
        return this._spreadSheet;
    }


    async start() {
        const clientEmail = String(process.env.CLIENT_EMAIL || "client_email").replace(/\\n/gm, '\n');
        const privateKey = String(process.env.PRIVATE_KEY || "client_email").replace(/\\n/gm, '\n');

        try {
            await this._spreadSheet.useServiceAccountAuth({
                client_email: clientEmail,
                private_key: privateKey,
            })

            await this._spreadSheet.loadInfo()

            console.log(`Conexão estabelecida com a planilha ✅`)
        } catch (error) {
            console.log(`Erro ao se conectar a planilha ${error}`)
        }
    }
}
const spreadsheetConnection = new SpreadsheetConnection();

export default spreadsheetConnection;



