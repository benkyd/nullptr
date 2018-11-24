export class Module {
    static get Name() {return 'Generic module 1'}
    static get Author() {return 'Ben (plane000)#8618'}
    
    static Init() {

    }

    static Dispose() {

    }
}

export class Command1 {
    static get Command() {return 'command1'}
    static get Alias() {return ['alias1', 'alias2']}
    static get Usage() {return 'command1 [args]'}
    static get Description() {return 'Echos the users input'}
    static get Module() {return Module;}

    static Init() {

    }

    static Exec(message, client, next) {

    }

    static Dispose() {

    }
}

function HelperThatDoesntGetSeenByTheModuleLoader() {

}

export class Command2 {

}
