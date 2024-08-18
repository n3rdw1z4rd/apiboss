require('dotenv').config();

const { resolve } = require('path');
const constants = require('./locals/constants');
const requirePath = require('./locals/require_path');

const log = require('./locals/logger')('main');

const config = {
    IS_FIRST_RUN: JSON.parse(process.env.IS_FIRST_RUN),

    httpHost: process.env.HTTP_HOST,
    httpPort: JSON.parse(process.env.HTTP_PORT),
    useSecurityMeasures: JSON.parse(process.env.USE_SECURITY_MEASURES),
    smtpConnectionUrl: process.env.SMTP_CONNECTION_URL,

    db: {
        client: process.env.DB_CLIENT,
        filename: process.env.DB_FILENAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        useNullAsDefault: JSON.parse(process.env.DB_USE_NULL_AS_DEFAULT),
    },

    resetTokenExpireTime: JSON.parse(process.env.RESET_TOKEN_EXPIRE_TIME),
    fieldNameDelimiter: process.env.FIELD_NAME_DELIMITER,
    email: {
        from: process.env.EMAIL_FROM,
    },
    locals: {
        appTitle: process.env.LOCALS_APP_TITLE,
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
