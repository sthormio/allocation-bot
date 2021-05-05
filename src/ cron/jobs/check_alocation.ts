import { schedule } from 'node-cron';
import { usersAlocation } from '../../utils/users';
import AllocationBot from '../../discord/discord_connection';

function checkIfUserWasAlocated() {
    usersAlocation.users.forEach(user => {
        if (usersAlocation.usersAlocated.includes(user)) {
            console.log("Já Alocou")

        } else {
            const User = AllocationBot.Client.users.cache.find(userDiscord => userDiscord.id == user.id)
            User?.send("Ooi, tudo bem ? 😁 Percebi que você ainda não adicionou sua alocação hoje, só passei aqui pra você não esquecer")
        }
    })
}

export default schedule('0 0 16 * * MON,TUE,WED,THU,FRI *', checkIfUserWasAlocated, { scheduled: false });
