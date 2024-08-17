const { readdirSync } = require('fs');
const { resolve } = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const log = require('../locals/logger')('storageService');

module.exports = (app) => {
    log.info('initializing...');

    const sequelize = app.config.dbConnectionUrl?.length
        ? new Sequelize(
            app.config.dbConnectionUrl,
            {
                logging: app.config.dbShowLogs
                    ? (msg) => log.debug(msg)
                    : false,
                define: {
                    charset: 'utf8'
                }
            }
        )
        : null;

    if (sequelize) {
        sequelize.authenticate().then(error => {
            if (error) throw error;
        });

        log.info('loading models...');

        const db = {};

        readdirSync(resolve(__dirname, '../models'))
            .filter(file => (file.indexOf('.') !== 0))
            .forEach(file => {
                const model = require(resolve(__dirname, '../models', file));//(sequelize, DataTypes);
                db[model.name] = model;
            });

        Object.keys(db).forEach(modelName => {
            if ('associate' in db[modelName]) {
                db[modelName].associate(db);
            }
        });

        sequelize.sync({
            force: (app.config.dbForceSync === true),
        });
    } else {
        log.warn('dbConnectionUrl not set in config');
    }

    // log.debug('sequelize:', sequelize);

    return sequelize;
}
