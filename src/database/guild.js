import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class GuildTools extends BaseDatabase {
    static async newGuild(id, serverName) {
        const Guild = super.Guild;

        try {

        } catch (e) {
            Logger.error(`An error occured inserting guild id: ${id}`);
            return -1;
        }
    }
}
