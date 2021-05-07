import dotenv from 'dotenv';
dotenv.config();
import AllocationBot from './discord/discord_connection';
import SpreadsheetConnection from './spreadsheet/spreadsheet_connection';
import CronJobManager from './ cron/cron_job_manager';


try {
    SpreadsheetConnection.start().then(() => {
        AllocationBot.start();
        const cron = new CronJobManager();
        cron.run();
    });
} catch (error) {
    console.log("Não foi possivel conectar à aplicação")
}
