import { ScheduledTask, schedule } from 'node-cron';
import sortAlocationPage from './sort_page';
import checkAlocation from './check_alocation';


class CronJobManager {

    private jobs: ScheduledTask[];

    constructor() {
        this.jobs = [sortAlocationPage];
    }

    run(): void {
        this.jobs.forEach(job => job.start())
    }

}

export default CronJobManager;