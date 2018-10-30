import {Logger} from './logger';
import {Config} from './config';
import {RateLimits} from './ratelimits'

export class Events extends RateLimits { // extends rate limits
    constructor() {
        super();
    }

    async init(client) {
        this.client = client;
        this.client.login(Config.Token);
    }

    get Client() {return this.client;}

    async handleEvents() {
        this.client.on('ready', async () => {
            this.handle(undefined, 
                [this.handleReady],
                this.client
            );
        });

        this.client.on('error', async (err) => {
            this.handle(err,
                [this.handleError],
                this.client
            );
        });

        this.client.on('message', async (message) => {
            this.handle(message, 
                [super.request, this.handleMessage],
                this.client
            );
        });
    }




    async handle(obj = [null], callbacks = [undefined], client) {
        let doNext = false;
        if (callbacks.length == 0) {
            return;
        }

        const next = function() {
            doNext = true;
        }

        await callbacks[0](obj, client, next); 
        callbacks.splice(0, 1);

        if (doNext) {
            this.handle(obj, callbacks, client);
        }
    }

    async handleReady(obj, client, next) {
        client.user.setPresence('online');
        client.user.setActivity(Config.NowPlaying);
        Logger.info(`Discord client logged in as ${client.user.tag}`);
        Logger.ready();
        next();
    }

    async handleError(err, client, next) {
        Logger.error(`An error occured with the Discord API: ${err}`);
        next();
    }

    async handleMessage(message, client, next) {
        if (client.user.id == message.author.id) return;
        if (message.limiting) message.channel.send(`${message.author} You are being rate limited`);
        next();
    }
}
