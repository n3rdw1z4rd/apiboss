const Knex = require('knex');
const { readdirSync } = require('fs');
const { resolve } = require('path');
const { isNullOrEmpty } = require('../locals/string');

const log = require('../locals/logger')('storageService');

/**
 * `app.services.Storage.models`: {
 *      Account
 * 
 * }
 */

module.exports = (app) => {
    log.info('initializing...');

    const {
        client,
        filename,
        useNullAsDefault,
        database,
        host,
        password,
        port,
        user,
        showLogs,
    } = app.config.db;

    const config = {
        client,
        connection: (
            isNullOrEmpty(filename)
                ? { host, port, user, password, database }
                : { filename }
        ),
        useNullAsDefault,
        debug: showLogs,
        log: {
            warn: (message) => log.warn(message),
            error: (message) => log.error(message),
            deprecate: (message) => log.warn(message),
            debug: (message) => log.debug(message),
        }
    };

    log.debug('connectionConfig:', config);

    const knex = Knex(config);
    // log.debug(db);

    knex.raw('select 1+1 as result').catch(err => {
        console.log(err);
        process.exit(1);
    });

    log.info('loading models...')

    const db = {};
    const modelRootPath = resolve(__dirname, '..', 'models');

    readdirSync(modelRootPath)
        .filter((filename) => !filename.startsWith('.'))
        .forEach((filename) => {
            const modelPath = resolve(modelRootPath, filename);
            log.debug('initializing model:', modelPath);

            // knex.migrate
            // const model = require(resolve(modelRootPath, filename))(knex);
            // log.debug(`${filename}:`, model);

            // sequelize.import(resolve(__dirname, '..', 'models', file))
            // db[model.name] = model
        });

    // Object.keys(db).forEach(modelName => {
    //     if ('associate' in db[modelName]) {
    //         db[modelName].associate(db)
    //     }
    // })

    return knex;
}
