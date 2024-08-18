const { readdirSync } = require('fs');
const { resolve } = require('path');
const knex = require('knex');
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
    } = app.config.db;

    const config = {
        client,
        connection: (
            isNullOrEmpty(filename)
                ? { host, port, user, password, database }
                : { filename }
        ),
        useNullAsDefault,
    };

    log.debug('connectionConfig:', config);

    return knex(config);
}
