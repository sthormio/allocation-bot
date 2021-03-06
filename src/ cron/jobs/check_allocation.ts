import { schedule } from 'node-cron';
import { usersAllocation } from '../../utils/users';
import AllocationBot from '../../discord/discord_connection';

function checkIfUserWasAllocated() {
    usersAllocation.users.forEach(user => {
        if (usersAllocation.usersAllocated.find(userAllocated => userAllocated.id == user.id)) {
            console.log(`O usuário ${user.name} já foi alocado hoje ✅`)
        } else {
            const User = AllocationBot.Client.users.cache.find(userDiscord => userDiscord.id == user.id)
            User?.send("Ooi, tudo bem ? 😁 Percebi que você ainda não adicionou sua alocação hoje, só passei aqui pra você não esquecer. Até mais 👋🏽")
        }
    })
}

export default schedule('0 0 17 * * MON,TUE,WED,THU,FRI *', checkIfUserWasAllocated, { scheduled: false, timezone: 'America/Sao_Paulo' });
