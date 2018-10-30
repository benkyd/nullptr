import {Logger} from './logger';

let buckets = { };
let requestsPerSecond = 0.2;

export class RateLimits {
    constructor() {
        Logger.info('Initialized ratelimiting middleware');
        setInterval(this.tick, 1000 / requestsPerSecond);
    }

    async request(obj, client, next) {
        let id = obj.author.id;
        if (id == client.user.id) return;
        
        if (!buckets[id]) {
            Logger.debug(`New rate limiting bucket for ${id}`);

            buckets[id] = {id: id, tokens: [], lastUsed: new Date().getTime()};
            for (let i = 0; i < requestsPerSecond; i++) {
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
            if (buckets[bucket].tokens.length > requestsPerSecond) {
                continue;
            } 
            buckets[bucket].tokens.push(1);
        }
    }
}
