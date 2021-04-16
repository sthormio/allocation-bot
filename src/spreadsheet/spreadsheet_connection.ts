import { GoogleSpreadsheet, ServiceAccountCredentials } from 'google-spreadsheet';
import * as credentials from '../../credentials.json';


export default class SpreadsheetConnection {

    private static _spreadSheet: GoogleSpreadsheet;

    static get spreadSheet(): GoogleSpreadsheet {
        return this._spreadSheet;
    }


    static async start() {
        try {
            const doc = new GoogleSpreadsheet(process.env.ALLOCATION_ID || "ALLOCATION_ID")



            // const credentials = {
            //     type: process.env.TYPE,
            //     project_id: process.env.PROJECT_ID,
            //     "private_key_id": process.env.PRIVATE_KEY_ID,
            //     "private_key": process.env.PRIVATE_KEY || "",
            //     "client_email": process.env.PRIVATE_KEY || "",
            //     "client_id": process.env.CLIENT_ID,
            //     "auth_uri": process.env.AUTH_URI,
            //     "token_uri": process.env.TOKEN_URI,
            //     "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
            //     "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
            // }

            // const json = JSON.stringify(credentials);

            await doc.useServiceAccountAuth(credentials)

            console.log(`Conexão estabelecida com a planilha`)

        } catch (error) {
            console.log(`Erro ao se conectar a planilha ${error}`)
        }
    }


}



