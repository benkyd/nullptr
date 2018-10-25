import Sequelize from 'sequelize';

import {Logger} from '../logger';

let Connection;
let Guild;

export class BaseDatabase {
    static get Connection() { return Connection; }
    static get Guild() { return Guild; }

    static async init() {
        Logger.info('Connecting to SQLite Database');

        Connection = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: Logger.database,
            operatorsAliases: false,
            storage: './resources/database.sqlite',
        });
    
        Guild = Connection.define('Guild', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            name: Sequelize.BIGINT
        }, {
            tableName: 'guild'
        });

        try {
            await Connection.sync({force: false});
        } catch (e) {
            Logger.panic(`Failed to connect to SQLite Database, error: ${e}`)
        }
        Logger.info('Connected to SQLite Database');
    }
}

