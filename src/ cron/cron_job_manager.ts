import { ScheduledTask, schedule } from 'node-cron';
import sortAlocationPage from './jobs/sort_page';
import checkAlocation from './jobs/check_alocation';
import clearUsersAlocateds from './jobs/clear_users_alocateds';


class CronJobManager {

    private jobs: ScheduledTask[];

    constructor() {
        this.jobs = [sortAlocationPage, checkAlocation, clearUsersAlocateds];
    }

    run(): void {
        this.jobs.forEach(job => job.start())
    }

}

export default CronJobManager;