const colours = require('colors/safe');
const fs = require('fs');

let LogLevel = 1;
let logPath = 'logs.log';

module.exports = class Logger {
    static init(path) {
        if (path) logPath = path;

        if (!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, '');
        }
        fs.appendFileSync(logPath, '[SYSTEM STARTING UP] \n');
    }

    static SetLevel(level) {
        LogLevel = level;
    }

    static get VERBOSE_LOGS() {return 0;}
    static get DEBUG_LOGS() {return 1;}
    static get INFO_LOGS() {return 2;}
    static get WARN_LOGS() {return 3;}

    static middleware(message) {
        if (LogLevel > 0) return; 
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [HTTP-MIDDLEWARE] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.blue('HTTP-MIDDLEWARE') + '] ' + message);
    }

    static debug(message) {
        if (LogLevel > 1) return; 
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [DEBUG] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.cyan('DEBUG') + '] ' + message);
    }

    static ready() {
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [READY] \n`);
        console.log('[' + d.toLocaleString() + '] ['
            + colours.rainbow('READY') + ']');
    }

    static info(message) {
        if (LogLevel > 2) return; 
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [INFO] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.green('INFO') + '] ' + message);
    }

    static warn(message) {
        if (LogLevel > 3) return; 
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [WARN] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.yellow('WARN') + '] ' + message);
    }

    static error(message) {
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [ERROR] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('ERROR') + '] ' + message);
    }

    static panic(message) {
        let d = new Date();
        fs.appendFileSync(logPath, `[${d.toLocaleString()}] [PANIC] ${message} \n`);
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('PANIC') + '] ' + message);
        process.exit();
    }
}
