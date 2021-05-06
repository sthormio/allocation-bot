import { schedule } from 'node-cron';
import { sortAllocationPage } from '../../puppetter/puppeteer'

function sortAlocationPage() {
    console.log("Sorting alocation page")
    sortAllocationPage();
}

export default schedule('0 0 18 * * MON,TUE,WED,THU,FRI *', sortAlocationPage, { scheduled: false, timezone: 'America/Sao_Paulo' });

