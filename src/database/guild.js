import Sequelize from 'sequelize';

import {BaseDatabase} from './basedatabase';
import {Logger} from '../logger';

export class GuildTools extends BaseDatabase {
    static async newGuild(id, serverName) {
        const Guild = super.Guild;

        try {
            return await Guild.create({
                id: id,
                name: serverName
            });
        } catch (e) {
            Logger.error(`An error occured inserting guild id: ${id}`);
            return -1;
        }
    }

    static async deleteGuild(id) {
        const Guild = super.Guild;

        try {
            return Guild.destroy({where: {id: id}});
        } catch (e) {
            Logger.error(`An error occured while deleting guild id: ${id}`);
            return -1;
        }
    }
}
