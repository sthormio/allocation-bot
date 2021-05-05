import { schedule } from 'node-cron';
import { usersAlocation } from '../../utils/users';

function clearUsersAlocateds() {
    usersAlocation.usersAlocated.length = 0;
    console.log(`Todos os usurários alocados foram limpos hoje`)
    console.log(`Total de usuários alocados ${usersAlocation.usersAlocated.length}`)
}

export default schedule('0 59 23 * * MON,TUE,WED,THU,FRI *', clearUsersAlocateds, { scheduled: false });
