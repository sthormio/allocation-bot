import dotenv from 'dotenv';
dotenv.config();
import AllocationBot from './discord/discord_connection'

try {
    AllocationBot.start();
} catch (error) {
    console.log("Não foi possivel conectar ao discord")
}