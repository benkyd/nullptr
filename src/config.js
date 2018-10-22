import fs from 'fs';

import {Logger} from './logger';

export class Config {
    constructor(path) {
        this.file = './resources/config/config.json';
        this.path = [ './resources/', './resources/config' ] 
        this.Config = { 
            token: 'YOUR TOKEN HERE'
        };
    }

    load() {
        Logger.info('Loading config');
        if (fs.existsSync(this.file)) {
            try {
                this.Config = JSON.parse(fs.readFileSync(this.file));
                if (!this.Config.token);

                Logger.info('Config loaded successfully');
            } catch (e) {
                Logger.panic(`Failed to load config... Invalid JSON: ${e}`);
            }
        } else {
            try {
                Logger.error('No config found');
                for (let folder of this.path) {
                    fs.mkdirSync(folder);
                }
                fs.writeFileSync(this.file, JSON.stringify(this.Config, null, 4));
                Logger.warn(`Created config at: ${this.path}`);
                Logger.panic('Config required to be complete');
            } catch (e) {
                Logger.panic(`Could not create config: ${e}`);
            }
        }
    }
}
