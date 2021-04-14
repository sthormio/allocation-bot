import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
import AllocationBot from './discord/discord_connection'


try {
    AllocationBot.start();
    const server = express();
    server.listen(process.env.PORT || 3000, () => {
        pingServer(1200000)
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