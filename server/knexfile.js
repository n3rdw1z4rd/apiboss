const { resolve } = require('path');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: resolve(__dirname, 'dev.db'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: resolve(__dirname, 'database/migrations'),
        },
        seeds: {
            directory: resolve(__dirname, 'database/seeds'),
        },
    },
    staging: {
        client: 'sqlite3',
        connection: {
            filename: resolve(__dirname, 'stg.db'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: resolve(__dirname, 'database/migrations'),
        },
        seeds: {
            directory: resolve(__dirname, 'database/seeds'),
        },
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: resolve(__dirname, 'prod.db'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: resolve(__dirname, 'database/migrations'),
        },
        seeds: {
            directory: resolve(__dirname, 'database/seeds'),
        },
    },
};