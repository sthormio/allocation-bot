import { schedule } from 'node-cron';
import { sortDayOffsPage } from '../../puppetter/puppeteer'

function sortDayOffsPageCron() {
    console.log("Sorting Day Offs page")
    sortDayOffsPage()
}

export default schedule('0 0 18 * * MON,TUE,WED,THU,FRI *', sortDayOffsPageCron, { scheduled: false, timezone: 'America/Sao_Paulo' });

