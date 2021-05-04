import { schedule } from 'node-cron';
import { sortPage } from '../puppetter/puppeteer'

function sortAlocationPage() {
    console.log("Sort alocation page")
    sortPage();
}

export default schedule('0 0 18 * * MON,TUE,WED,THU,FRI *', sortAlocationPage, { scheduled: false });;

