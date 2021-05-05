import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
dotenv.config();
import AllocationBot from './discord/discord_connection';
import SpreadsheetConnection from './spreadsheet/spreadsheet_connection';
import CronJobManager from './ cron/cron_job_manager';


try {
    SpreadsheetConnection.start()
    AllocationBot.start();
    const server = express();
    const cron = new CronJobManager();
    server.listen(process.env.PORT || 3000, () => {
        cron.run()
    })

    server.get('/', (req, res) => {
        res.json({ allocation_bot: "Online ✅" })
    })

} catch (error) {
    console.log("Não foi possivel conectar à aplicação")
}
