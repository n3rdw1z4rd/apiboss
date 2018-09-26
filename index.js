var log = require('hogger')('main')

const constants = require('./locals/constants')
const requirePath = require('./locals/require_path')
const fs = require('fs')
const path = require('path')

var app = {
	config: require('./config'),
	const: constants,

	isAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			if (req.user.status !== app.const.ACCOUNT_STATUS.ACTIVE) {
				req.flash('error', `This account is currently ${app.const.ACCOUNT_STATUS.getName(req.user.status)}.`)
				req.logout()
				res.redirect('/account/login')
			} else {
				next()
			}
		} else {
			req.flash('error', 'You must be logged in to access that')
			res.redirect('/account/login')
		}
	}
}

try {
	log.info('loading services...')
	app.services = requirePath('./services')

	log.info('bootstrapping services...')
	for(var service in app.services) {
		app.services[service] = app.services[service](app)
	}

	log.info('initializing services...')
	for(var service in app.services) {
		if (app.services[service].initialize)
			app.services[service].initialize()
	}
} catch(error) {
	log.error(error)
	throw error
}

log.info('ready')
