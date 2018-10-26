import {Logger} from './logger';
import {Config} from './config';

export class Events {
    async init(client) {
        this.client = client;
        this.client.login(Config.Token);
    }

    async handle() {
        this.client.on('ready', () => {
            Logger.info(`Discord client logged in as ${this.client.user.tag}`);
            Logger.ready();
        });
    }
}
