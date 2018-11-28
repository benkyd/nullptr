import fs from 'fs';

import {Logger} from './logger';

let modules = [];
let commands = [];

export class CommandManager {
    static get Modules() {return modules;}
    static get Commands() {return commands;}

    static async load(log) {
        if (log != 1) console.log();

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

            modules[mod.Module.Name] = {name: mod.Module.Name, module: mod, exports: modExports, file: file};
            Logger.info(`Loaded ${mod.Module.Name} from ${file}`);

            for (let command of modExports) {
                if (command == 'Module') continue;
                let current = mod[command]

                if (   !current.Command
                    || !current.Alias
                    || !current.Usage
                    || !current.Description
                    || !current.Module
                    || !current.Init
                    || !current.Exec
                    || !current.Dispose) {
                        Logger.warn(`Exported class ${command} in ${file} and module ${mod.Module.Name} is not a valid command`);
                        continue;
                }

                await current.Init();
                commands[current.Command] = current; // Doesnt give support for alias commands

                Logger.info(`Loaded ${current.Command} from module ${mod.Module.Name}`);
                commandCount++;
            }
        }

        Logger.info(`Loaded ${commandCount} commands from ${moduleCount} modules`);
        console.log();
    }


    static async reload() {
        console.log();
        Logger.info('Reloading Modules and Commands');
        
        for (let command in commands) {
            await commands[command].Dispose();
        }
        Logger.info('Disposed registerd commands');

        // This broke af lol ReeEEEEeeE
        for (let mod in modules) {
            // Logger.error(modules[mod].module);
            // await modules[mod].module.Dispose();
            delete require.cache[require.resolve(modules[mod].mod)]; //file.split('.')[0])];
        }
        Logger.info('Disposed registerd modules');

        modules = [];
        commands = [];

        CommandManager.load(1);
    }
}
