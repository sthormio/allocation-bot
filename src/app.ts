import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import AllocationBot from './discord/discord_connection'

try {
    AllocationBot.start();
    const server = express();
    server.listen(process.env.PORT || 3000)

    server.get('/', (req, res) => {
        res.json({ allocation_bot: "Online" })
    })

} catch (error) {
    console.log("Não foi possivel conectar ao discord")
}