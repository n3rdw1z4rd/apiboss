var { readdirSync } = require('fs');
var { resolve } = require('path');
const Sequelize = require('sequelize');

const log = require('../locals/logger')('storageService');

module.exports = app => {
    if (app.config.dbConnectionUrl?.length) {
        const sequelize = new Sequelize(
            app.config.dbConnectionUrl,
            {
                logging: function (msg) {
                    //console.log(msg)
                },
                define: {
                    charset: 'utf8'
                }
            }
        );

        sequelize.authenticate().then(error => {
            if (error) throw error;
        });

        log.info('loading models...');

        const db = {};

        readdirSync(resolve(__dirname, '../models'))
            .filter(file => {
                return (file.indexOf('.') !== 0)
            })
            .forEach(file => {
                const model = require(resolve(__dirname, '../models', file))(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            })

        Object.keys(db).forEach(modelName => {
            if ('associate' in db[modelName]) {
                db[modelName].associate(db)
            }
        })

        sequelize.sync({
            force: app.config.dbForceSync !== false
        })

        return sequelize
    } else {
        log.warn('dbConnectionUrl not set in config');
        return null;
    }
}
