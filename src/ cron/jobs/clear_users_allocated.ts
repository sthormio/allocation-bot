import { schedule } from 'node-cron';
import { usersAllocation } from '../../utils/users';

function clearUsersAllocated() {
    usersAllocation.usersAllocated.length = 0;
    console.log(`Todos os usurários alocados foram limpos hoje`)
    console.log(`Total de usuários alocados ${usersAllocation.usersAllocated.length}`)
}

export default schedule('0 59 23 * * MON,TUE,WED,THU,FRI *', clearUsersAllocated, { scheduled: false, timezone: 'America/Sao_Paulo' });
