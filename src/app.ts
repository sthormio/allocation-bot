import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import os from 'os';
dotenv.config();
import AllocationBot from './discord/discord_connection'


try {
    AllocationBot.start();
    const server = express();
    server.listen(process.env.PORT || 3000, () => {
        // pingServer((25 * 60) * 100)
        // readFreeMemory()

    })

    server.get('/', (req, res) => {
        res.json({ allocation_bot: "Online ✅" })
    })

} catch (error) {
    console.log("Não foi possivel conectar ao discord")
}

async function pingServer(ms: number) {

    setTimeout(async () => {
        await axios.get("https://allocation-bot.herokuapp.com/")
        console.log("Ping server")
        pingServer(ms);
    }, ms)

}

function readFreeMemory() {
    setTimeout(async () => {
        console.log(`Free memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`)
        console.log(`Used memory: ${(((os.totalmem() - os.freemem()) / (1024 * 1024))).toFixed(2)} MB`)
        readFreeMemory()
    }, 10000)
}