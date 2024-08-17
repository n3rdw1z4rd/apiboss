const log = require('../locals/logger')('infoRoute')
var router = require('express').Router()

module.exports = app => {
	router.get('/welcome', (req, res) => {
		res.render('general', { body: 'info/welcome', pageTitle: 'Welcome' })
	})
	
	router.get('/features', (req, res) => {
		res.render('general', { body: 'info/features', pageTitle: 'Features' })
	})

	router.get('/pricing', (req, res) => {
		res.render('general', { body: 'info/pricing', pageTitle: 'Pricing' })
	})

	return router
}
