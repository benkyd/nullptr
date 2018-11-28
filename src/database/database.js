import Sequelize from 'sequelize';

import {BaseDatabase} from './basedatabase';
import {Logger} from '../logger';

export class Database extends BaseDatabase {
    static async exec(query) {
        const connection = super.Connection;
        try {
            const result = await connection.query(query);
            Logger.database(JSON.stringify(result, null, 4));
            return result[0][0].result;
        }
        catch (e) {
            Logger.error(`An error occured while querying a database: ${e}`);
        }
    }
}

Database.Guilds = require('./guild').GuildTools;
