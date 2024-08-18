const { createTransport } = require('nodemailer');

const log = require('../locals/logger')('smtpService');

module.exports = (app) => {
    log.info('initializing...');
    
    const transporter = app.config.smtpConnectionUrl?.length
        ? nodemailer.createTransport(app.config.smtpConnectionUrl)
        : null;

    return {
        sendMail: function (mail, callback) {
            log.debug('sendMail:', mail);

            if (transporter) {
                transporter.sendMail(mail, callback);
            }
        }
    };
};
