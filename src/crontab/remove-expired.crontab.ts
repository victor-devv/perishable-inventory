import cron from 'node-cron';
import PerishablesService from '../services/perishables.services';


class RemoveExpiredCRON {

    cronJob: any;

    constructor() {

        this.start()

    }

    start() {
        this.cronJob = cron.schedule('0 0 * * *', () =>  {
            console.log('Deleting Expired Records')
            PerishablesService.deleteExpiredStock()
        }, {
            scheduled: false
        });

        this.cronJob.start()
    }

}

export default RemoveExpiredCRON