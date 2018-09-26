var log = require('hogger')('teamRoute')
var router = require('express').Router()

const passport = require('passport')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

module.exports = app => {
	var transporter = nodemailer.createTransport(app.config.smtpConnectionUrl)

	router.use(app.isAuthenticated)

	router.get('/', (req, res) => {
		req.flash('warning', 'Sorry, Team Management is awaiting implementation.')
		res.redirect('/api/list')
	})

	return router
}
