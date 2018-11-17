import {Logger} from './logger';
import {Config} from './config';
import {RateLimits} from './ratelimits'
import {MessageManager} from './messagemanager';

export class Events extends RateLimits {
    constructor() {
        super();
    }

    async init(client) {
        this._client = client;
        this._client.login(Config.Token);
    }

    get Client() {return this.client;}

    async handleEvents() {
        this._client.on('ready', async () => {
            this.handle(undefined, 
                [this.handleReady],
                this._client
            );
        });

        this._client.on('error', async (err) => {
            this.handle(err,
                [this.handleError],
                this._client
            );
        });

        this._client.on('message', async (message) => {
            this.handle(message, 
                [super.request, MessageManager.handleMessage],
                this._client
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
}
