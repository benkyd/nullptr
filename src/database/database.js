import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class Database extends BaseDatabase {
    static async exec(query) {
        let connection = BaseDatabase.Connection;
        return new Promise((resolve, reject) => {
            connection
            .query(query)
            .then(result => {
                Logger.database(JSON.stringify(res, null, 4));
                resolve(result[0][0].result);
            })
            .catch(err => {
                Logger.error('An error occured while querying a database: ' + err);
                reject()
            });
        });
    }
}

Database.server = require('./server').ServerTools;
