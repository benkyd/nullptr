import {Logger} from './logger';

let buckets = { };

export class RateLimits {
    constructor() {
        Logger.info('Initialized ratelimiting middleware');
        this.requestsPerSecond = 1;
        setInterval(this.tick, 1000 / this.requestsPerSecond);
    }

    async request(obj, client, next) {
        let id = obj.author.id;
        
        if (!buckets[id]) {
            Logger.debug(`New rate limiting bucket`);

            buckets[id] = {id: id, tokens: [], lastUsed: new Date().getTime()};
            for (let i = 0; i < this.requestsPerSecond; i++) {
                buckets[id].tokens.push(1);
            }

            next();
            return;
        }

        buckets[id].lastUsed = new Date().getTime();

        if (buckets[id].tokens.length <= 0) {
            Logger.middleware(`${id} is being rate limited`);
            obj.limiting = true;
            next();
            return;
        }

        buckets[id].tokens.pop();
        next();
    }   

    tick() {
        for (let bucket in buckets) {
            // if (buckets[bucket].lastUsed += disposeTime >= new Date().getTime()) {
            //     delete buckets[bucket]; // remove element here, don't redefine
            //     continue;
            // }
            if (buckets[bucket].tokens.length > this.requestsPerSecond) continue;
            buckets[bucket].tokens.push(1);
        }
    }
}
