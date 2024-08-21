require('dotenv').config();

const { resolve } = require('path');
const constants = require('./locals/constants');
const requirePath = require('./locals/require_path');

const log = require('./locals/logger')('main');

const config = {
    http: {
        clientPath: resolve(__dirname, process.env.HTTP_CLIENT_PATH),
        host: process.env.HTTP_HOST,
        locals: {
            IS_FIRST_RUN: JSON.parse(process.env.IS_FIRST_RUN),
            appTitle: process.env.LOCALS_APP_TITLE,
        },
        port: JSON.parse(process.env.HTTP_PORT),
        resetTokenExpireTime: JSON.parse(process.env.HTTP_RESET_TOKEN_EXPIRE_TIME),
        useSecurityMeasures: JSON.parse(process.env.HTTP_USE_SECURITY_MEASURES),
    },

    db: {
        client: process.env.DB_CLIENT,
        filename: process.env.DB_FILENAME === ':memory:'
            ? process.env.DB_FILENAME
            : resolve(__dirname, '..', process.env.DB_FILENAME),
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        useNullAsDefault: JSON.parse(process.env.DB_USE_NULL_AS_DEFAULT),
        showLogs: JSON.parse(process.env.DB_SHOW_LOGS),
        fieldNameDelimiter: process.env.DB_FIELD_NAME_DELIMITER,
    },

    email: {
        smtpConnectionUrl: process.env.EMAIL_SMTP_CONNECTION_URL,
        from: process.env.EMAIL_FROM,
    },

    account_roles: JSON.parse(process.env.ACCOUNT_ROLES),
    account_statuses: JSON.parse(process.env.ACCOUNT_STATUSES),
};

log.debug('config:', config);

const app = {
    config,
    constants,

    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.status !== app.constants.ACCOUNT_STATUS.ACTIVE) {
                req.flash('error', `This account is currently ${app.constants.ACCOUNT_STATUS.getName(req.user.status)}.`);
                req.logout();
                res.redirect('/account/login');
            } else {
                next();
            }
        } else {
            req.flash('error', 'You must be logged in to access that');
            res.redirect('/account/login');
        }
    }
};

// log.debug('app:', app);

try {
    if (app.config.IS_FIRST_RUN) {
        log.warn('!!! FIRST RUN !!!');
    }

    log.info('loading services...');
    const services = requirePath(resolve(__dirname, 'services'));

    log.info('bootstrapping services...')
    for (var service in services) {
        services[service] = services[service](app);
    }

    log.info('initializing services...')
    for (var service in services) {
        if (services[service].initialize) {
            services[service].initialize();
        }
    }

    app.services = services;

    // log.debug('app:', app);
} catch (error) {
    throw error;
}

log.info('ready');
