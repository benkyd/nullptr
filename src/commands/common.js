
export class Command1 {
    static get Command() {return 'command1'}
    static get Alias() {return ['alias1', 'alias2']}
    static get Usage() {return 'command1 [args]'}
    static get Description() {return 'Echos the users input'}

    static Init() {

    }

    static Exec(message, client, next) {

    }

    static Dispose() {

    }
}

export class Command2 {

}

export class Command3 {

}
