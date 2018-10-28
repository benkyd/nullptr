import {Logger} from './logger';
import {Config} from './config';
import { resolve } from 'path';
import { rejects } from 'assert';

export class Events { // extends rate limits
    async init(client) {
        this.client = client;
        this.client.login(Config.Token);
    }

    async handleEvents() {
        this.client.on('ready', async () => {
            this.handle(undefined, 
                [this.handleReady]
            );
        });

        this.client.on('message', async (message) => {
            this.handle(message, 
                [this.handleMessage]
            );
        });
    }

    async handle(obj = [null], callbacks = [undefined]) {
        let doNext = false;
        if (callbacks.length == 0) {
            return;
        }

        const next = function() {
            doNext = true;
        }

        await callbacks[0](obj, next); 
        callbacks.splice(0, 1);

        if (doNext) {
            this.handle(obj, callbacks);
        }
    }

    async handleReady(obj, next) {
        this.client.user.setPresence('online');
        this.client.user.setActivity(Config.NowPlaying);
        Logger.info(`Discord client logged in as ${this.client.user.tag}`);
        Logger.ready();

        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        });

        next();
    }

    async handleMessage(...args) {
        Logger.info(args[0]);
        args[0].channel.send('lol u homo')
    }
}
