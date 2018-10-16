const Logger = require('../logger');
const fs = require('fs');

module.exports = class Config {
    constructor(path) {
        this.path = path;
        this.Config = { 
            token: 'YOUR TOKEN HERE'
        };
    }

    load() {
        Logger.info('Loading config');
        if (fs.existsSync(this.path)) {
            try {
                this.Config = JSON.parse(fs.readFileSync(this.path));
                if (!this.Config.token);

                Logger.info('Config loaded successfully');
            } catch (e) {
                Logger.panic(`Failed to load config... Invalid JSON: ${e}`);
            }
        } else {
            try {
                Logger.error('No config found');
                fs.writeFileSync(this.path, JSON.stringify(this.Config, null, 4));
                Logger.warn(`Created config at: ${this.path}`);
                Logger.panic('Config required to be complete');
            } catch (e) {
                Logger.panic(`Could not create config: ${e}`);
            }
        }
    }
}
