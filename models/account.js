var log = require('hogger')('accountModel')

const passport = require('passport')
const passportLocalSequelize = require('passport-local-sequelize')
const constants = require('../locals/constants')

module.exports = (db, TYPE) => {
	var Account = db.define('Account', {
		email: {
			type: TYPE.STRING,
			allowNull: false,
			unique: true
		},
		hash: {
			type: TYPE.STRING(1024)
		},
		salt: {
			type: TYPE.STRING
		},
		status: {
			type: TYPE.INTEGER,
			defaultValue: constants.ACCOUNT_STATUS.ACTIVE
		},
		role: {
			type: TYPE.INTEGER,
			defaultValue: constants.ACCOUNT_ROLE.USER
		},
		subscription: {
			type: TYPE.INTEGER,
			defaultValue: constants.ACCOUNT_SUBSCRIPTION.FREE
		},
		firstName: {
			type: TYPE.STRING
		},
		lastName: {
			type: TYPE.STRING
		},
		primaryPhoneNumber: {
			type: TYPE.STRING
		},
		secondaryPhoneNumber: {
			type: TYPE.STRING
		},
		address1: {
			type: TYPE.STRING
		},
		address2: {
			type: TYPE.STRING
		},
		city: {
			type: TYPE.STRING
		},
		state: {
			type: TYPE.STRING
		},
		postalCode: {
			type: TYPE.STRING
		},
		apiRoute: {
			type: TYPE.STRING,
			unique: true,
			defaultValue: TYPE.UUIDV1
		},
		resetToken: {
			type: TYPE.STRING
		},
		tokenExpires: {
			type: TYPE.BIGINT
		}
	}, {
		tableName: 'accounts',
		classMethods: {
			associate: models => {
				Account.hasMany(models.Api)
			}
		}
	})

	//Account.sync({ force: true })

	passportLocalSequelize.attachToUser(Account, {
		usernameField: 'email',
		hashField: 'hash',
		saltField: 'salt',
		errorMessages: {
			MissingPasswordError: 'No password was given',
			AttemptTooSoonError: 'Account is currently locked. Try again later',
			TooManyAttemptsError: 'Account locked due to too many failed login attempts',
			NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
			IncorrectPasswordError: 'Password or email are incorrect',
			IncorrectEmailError: 'Password or email are incorrect',
			MissingEmailError: 'No email was given',
			UserExistsError: 'An account with the given email is already registered'
		}
	})

	passport.use(Account.createStrategy())
	passport.serializeUser(Account.serializeUser())
	passport.deserializeUser(Account.deserializeUser())

	return Account
}
