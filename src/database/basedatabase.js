import Sequelize from 'sequelize';

import {Logger} from '../logger';

let Connection;
let Server;

export class BaseDatabase {
    static get Connection() { return Connection; }
    static get Server() { return Server; }

    static async init() {
        Logger.info('Connecting to SQLite Database');

        Connection = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: Logger.database,
            operatorsAliases: false,
            storage: './resources/database.sqlite',
        });
    
        Server = Connection.define('server', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            name: Sequelize.BIGINT
        }, {
            tableName: 'server'
        });

        try {
            await Connection.sync({force: false});
        } catch (e) {
            Logger.panic(`Failed to connect to SQLite Database, error: ${e}`)
        }
        Logger.info('Connected to SQLite Database');
    }
}

