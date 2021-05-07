import { ScheduledTask } from 'node-cron';
import checkAlocation from './jobs/check_alocation';
import clearUsersAlocateds from './jobs/clear_users_alocateds';


class CronJobManager {

    private jobs: ScheduledTask[];

    constructor() {
        this.jobs = [
            checkAlocation,
            clearUsersAlocateds,
        ];
    }

    run(): void {
        this.jobs.forEach(job => job.start())
    }

}

export default CronJobManager;