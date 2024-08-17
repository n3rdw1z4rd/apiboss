const constants = require('./locals/constants');
const requirePath = require('./locals/require_path');
const { resolve } = require('path');

const log = require('./locals/logger')('main');

const app = {
    config: require('../config'),
    const: constants,

    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.status !== app.const.ACCOUNT_STATUS.ACTIVE) {
                req.flash('error', `This account is currently ${app.const.ACCOUNT_STATUS.getName(req.user.status)}.`);
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
