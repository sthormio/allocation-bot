import { ScheduledTask } from 'node-cron';
import sortAlocationPage from './jobs/sort_allocation_page';
import checkAlocation from './jobs/check_alocation';
import clearUsersAlocateds from './jobs/clear_users_alocateds';
import sortDayOffsPage from './jobs/sort_days_offs_page';


class CronJobManager {

    private jobs: ScheduledTask[];

    constructor() {
        this.jobs = [
            sortAlocationPage,
            checkAlocation,
            clearUsersAlocateds,
            sortDayOffsPage
        ];
    }

    run(): void {
        this.jobs.forEach(job => job.start())
    }

}

export default CronJobManager;