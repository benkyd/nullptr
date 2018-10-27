import {Logger} from './logger';
import {Config} from './config';

export class Events {
    async init(client) {
        this.client = client;
        this.client.login(Config.Token);
    }

    async handleEvents() {
        this.client.on('ready', () => {this.handleReady()});
        this.client.on('message', async (message) => {this.handleMessage(message)});
    }

    async handleReady() {
        this.client.user.setPresence('online');
        this.client.user.setActivity(Config.NowPlaying);
        Logger.info(`Discord client logged in as ${this.client.user.tag}`);
        Logger.ready();
    }

    async handleMessage(...args) {
        Logger.info(args[0]);
        args[0].channel.send('lol u homo')
    }
}
