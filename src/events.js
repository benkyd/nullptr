import {Logger} from './logger';
import {Config} from './config';

export class Events { // extends rate limits
    async init(client) {
        this.client = client;
        this.client.login(Config.Token);
    }

    async handleEvents() {
        this.client.on('ready', async () => {
            this.handle(undefined, 
                [this.handleReady, this.anotherCallback]
            );
        });

        this.client.on('message', async (message) => {
            this.handle(message, 
                [this.handleMessage]
            );
        });
    }

    async handle(obj = [null], callbacks = [undefined]) {
        // const next = undefined;
        // if (callbacks[i+1]) const next = callbacks[i+1];
        // callbacks[i](obj, next);
    }

    async handleReady() {
        this.client.user.setPresence('online');
        this.client.user.setActivity(Config.NowPlaying);
        Logger.info(`Discord client logged in as ${this.client.user.tag}`);
        Logger.ready();
    }

    async anotherCallback() {
        Logger.debug(1);
    }

    async handleMessage(...args) {
        Logger.info(args[0]);
        args[0].channel.send('lol u homo')
    }
}
