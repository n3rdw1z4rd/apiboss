// const passport = require('passport');
// const passportLocalSequelize = require('passport-local-sequelize');
// const constants = require('../locals/constants');

exports.up = function (knex) {
    return knex.schema
        .createTable('account', function (table) {
            table.increments('id').primary();
            table.timestamps(false, true);
            table.string('email').unique().notNullable();
            table.string('salt').notNullable();
            table.string('hash').notNullable();
            table.integer('status').defaultTo(constants.ACCOUNT_STATUS.ACTIVE);
            table.integer('role').defaultTo(constants.ACCOUNT_ROLE.USER);
            table.integer('subscription').defaultTo(constants.ACCOUNT_SUBSCRIPTION.FREE);
            table.string('firstName');
            table.string('lastName');
            table.string('primaryPhoneNumber');
            table.string('secondaryPhoneNumber');
            table.string('address1');
            table.string('address2');
            table.string('city');
            table.string('state');
            table.string('postalCode');
            table.string('apiRoute').unique().defaultTo(TYPE.UUIDV1);
            table.string('resetToken');
            table.bigInteger('tokenExpires');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('accounts');
};

// module.exports = (db, TYPE) => {
//     const Account = db.define('Account', {
//         email: {
//             type: TYPE.STRING,
//             allowNull: false,
//             unique: true
//         },
//         hash: {
//             type: TYPE.STRING(1024)
//         },
//         salt: {
//             type: TYPE.STRING
//         },
//         status: {
//             type: TYPE.INTEGER,
//             defaultValue: constants.ACCOUNT_STATUS.ACTIVE
//         },
//         role: {
//             type: TYPE.INTEGER,
//             defaultValue: constants.ACCOUNT_ROLE.USER
//         },
//         subscription: {
//             type: TYPE.INTEGER,
//             defaultValue: constants.ACCOUNT_SUBSCRIPTION.FREE
//         },
//         firstName: {
//             type: TYPE.STRING
//         },
//         lastName: {
//             type: TYPE.STRING
//         },
//         primaryPhoneNumber: {
//             type: TYPE.STRING
//         },
//         secondaryPhoneNumber: {
//             type: TYPE.STRING
//         },
//         address1: {
//             type: TYPE.STRING
//         },
//         address2: {
//             type: TYPE.STRING
//         },
//         city: {
//             type: TYPE.STRING
//         },
//         state: {
//             type: TYPE.STRING
//         },
//         postalCode: {
//             type: TYPE.STRING
//         },
//         apiRoute: {
//             type: TYPE.STRING,
//             unique: true,
//             defaultValue: TYPE.UUIDV1
//         },
//         resetToken: {
//             type: TYPE.STRING
//         },
//         tokenExpires: {
//             type: TYPE.BIGINT
//         }
//     }, {
//         tableName: 'accounts',
//         classMethods: {
//             associate: models => {
//                 Account.hasMany(models.Api)
//             }
//         }
//     })

//     Account.sync({ force: true });

//     passportLocalSequelize.attachToUser(Account, {
//         usernameField: 'email',
//         hashField: 'hash',
//         saltField: 'salt',
//         errorMessages: {
//             MissingPasswordError: 'No password was given',
//             AttemptTooSoonError: 'Account is currently locked. Try again later',
//             TooManyAttemptsError: 'Account locked due to too many failed login attempts',
//             NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
//             IncorrectPasswordError: 'Password or email are incorrect',
//             IncorrectEmailError: 'Password or email are incorrect',
//             MissingEmailError: 'No email was given',
//             UserExistsError: 'An account with the given email is already registered'
//         }
//     })

//     passport.use(Account.createStrategy())
//     passport.serializeUser(Account.serializeUser())
//     passport.deserializeUser(Account.deserializeUser())

//     return Account
// }