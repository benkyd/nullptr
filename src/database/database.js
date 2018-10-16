const BaseDatabase = require('./basedatabase');

class Database extends BaseDatabase {
    static async exec(query) {
        let connection = BaseDatabase.Connection;
        let res;
        
        let promise = new Promise((resolve, reject) => {
            connection
            .query(query)
            .then(result => {
                Logger.database(JSON.stringify(res, null, 4));
                res = result[0][0].result;
                resolve();
            })
            .catch(err => {
                Logger.error('An error occured while querying a database: ' + err);
                reject()
            });
        });
        
        await promise;
        return res;
    }
}

Database.Server = require('./server').ServerTools;
module.exports = Database;
