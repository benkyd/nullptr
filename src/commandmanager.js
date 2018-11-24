import fs from 'fs';

import {Logger} from './logger';

let modules = [];
let commands = {};

export class CommandManager {
    static async load() {
        console.log();
        Logger.info('Loading Commands and Modules');
        if (!fs.existsSync('./src/commands/')) {
            Logger.panic('No commands folder at /src/commands');
        }

        const moduleFiles = fs.readdirSync('./src/commands');
        const moduleCount = moduleFiles.length;
        let commandCount = 0;
        
        // Loops through all files and 
        for (let file of moduleFiles) {
            let mod = require('./commands/' + file.split('.')[0]);
            let modExports = Object.keys(mod);

            // TODO: This doesnt work, throws "Module is not defined"
            // if (!modExports['Module']) {
            //     Logger.warn(`No module in file ${file}, is Module being exported?`);
            //     continue;
            // }
            if (!mod.Module.Name || !mod.Module.Author) {
                Logger.panic(`Module ${file} has no Name field, make sure it has a getter for Name and Author`);
                continue;
            }

            modules.push({name: mod.Module.Name, module: mod, exports: modExports});
            Logger.info(`Loaded ${mod.Module.Name} from ${file}`);

            for (let command of modExports) {
                if (command == 'Module') continue;
                let current = mod[command]

                if (   !current.Command
                    || !current.Alias
                    || !current.Usage
                    || !current.Description
                    || !current.Module) {
                        Logger.warn(`Exported class ${command} in ${file} and module ${mod.Module.Name} is not a valid command`);
                        continue;
                }
                
                

                Logger.info(`Loaded ${current.Command} from module ${mod.Module.Name}`);
                commandCount++;
            }
        }

        Logger.info(`Loaded ${commandCount} commands from ${moduleCount} modules`);
        console.log();
    }

    static get Modules() {return modules;}
    static get Commands() {return commands;}

    static async reload() {

    }
}
