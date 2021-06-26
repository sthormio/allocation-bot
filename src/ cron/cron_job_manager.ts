import { ScheduledTask } from 'node-cron';
import checkAllocation from './jobs/check_allocation';
import clearUsersAllocated from './jobs/clear_users_allocated';


class CronJobManager {

    private jobs: ScheduledTask[];

    constructor() {
        this.jobs = [
            checkAllocation,
            clearUsersAllocated,
        ];
    }

    run(): void {
        this.jobs.forEach(job => job.start())
    }

}

export default CronJobManager;