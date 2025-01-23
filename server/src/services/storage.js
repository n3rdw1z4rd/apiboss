const Sequelize = require('sequelize')
const { readdirSync } = require('fs');
const { resolve } = require('path');

const log = require('../locals/logger')('storageService');

module.exports = (app) => {
    log.info('initializing...');

    var sequelize = new Sequelize(
        app.config.db.connectionUrl,
        {
            logging: function (msg) {
                if (app.config.db.showLogs) {
                    log.debug(msg);
                }
            },
            define: {
                charset: 'utf8',
            }
        }
    );

    sequelize.authenticate()
        .then((error) => {
            if (error) throw error
        });

    log.info('loading models...');

    const db = {};

    readdirSync(resolve(__dirname, '..', 'models'))
        .filter((file) => !file.startsWith('.'))
        .forEach((file) => {
            log.debug('loading:', file);
            const modelPath = resolve(__dirname, '..', 'models', file);
            const model = require(modelPath)(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    sequelize.sync({
        force: app.config.dbForceSync !== false,
    });

    return sequelize;
}