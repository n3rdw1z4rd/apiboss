require('dotenv').config();

const { resolve } = require('path');
const constants = require('./locals/constants');
const requirePath = require('./locals/require_path');

const log = require('./locals/logger')('main');

const config = {
    IS_FIRST_RUN: process.env.IS_FIRST_RUN,
    httpPort: JSON.parse(process.env.HTTP_PORT),
    useSecurityMeasures: JSON.parse(process.env.USE_SECURITY_MEASURES),
    smtpConnectionUrl: process.env.SMTP_CONNECTION_URL,
    dbConnectionUrl: process.env.DB_CONNECTION_URL,
    dbForceSync: JSON.parse(process.env.DB_FORCE_SYNC),
    dbShowLogs: JSON.parse(process.env.DB_SHOW_LOGS),
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
} catch (error) {
    throw error;
}

log.info('ready');
