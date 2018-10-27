import fs from 'fs';

import {Logger} from './logger';

let file;
let path;
let Configuration;

export class Config {
    static get Configuration() {return Configuration;}
    static get Token() {return Configuration.Token;}
    static get NowPlaying() {return Configuration.NowPlaying;}

    static init() {
        file = './resources/config/config.json';
        path = [ './resources/', './resources/config' ] 
        Configuration = { 
            Token: 'BOT TOKEN HERE',
            NowPlaying: 'PLAYING GAME HERE'
        };
    }

    static load() {
        Logger.info('Loading config');
        if (fs.existsSync(file)) {
            try {
                Configuration = JSON.parse(fs.readFileSync(file));
                if (!Configuration.Token) Logger.panic('Token is missing from config file');
                if (!Configuration.NowPlaying) Logger.panic('NowPlaying is missing from config file');

                Logger.info('Config loaded successfully');
            } catch (e) {
                Logger.panic(`Failed to load config... Invalid JSON: ${e}`);
            }
        } else {
            try {
                Logger.error('No config found');
                for (let folder of path) {
                    fs.mkdirSync(folder);
                }
                fs.writeFileSync(file, JSON.stringify(Configuration, null, 4));
                Logger.warn(`Created config at: ${path}`);
                Logger.panic('Config required to be complete');
            } catch (e) {
                Logger.panic(`Could not create config: ${e}`);
            }
        }
    }
}
