const fs = require('fs');

module.exports = class Config {
    constructor(path) {
        this.path = path;
        this.Config = { };
    }

    load() {
        if (fs.existsSync(path)) {
            
        }
    }
}
