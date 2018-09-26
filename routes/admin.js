var log = require('hogger')('adminRoute')
var router = require('express').Router()

const passport = require('passport')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

module.exports = app => {
	var transporter = nodemailer.createTransport(app.config.smtpConnectionUrl)

	router.use( app.isAuthenticated, (req, res, next) => {
		if (res.locals.isAdmin) {
			next()
		} else {
			req.flash('error', `ADMIN: ${res.locals.isAdmin} | You are not authorized to access this area!`)
			res.redirect('/api/list')
		}
	})

	router.get('/', (req, res) => {
		app.services.Storage.models.Account.findAll({
			order: 'email ASC'
		}).then(accountList => {
			res.render('general', {
				body: 'admin/dashboard',
				pageTitle: 'Administration',
				accountList: accountList
			})
		})
	})

	router.get('/editAccount/:id', (req, res) => {
		app.services.Storage.models.Account.findOne({
			where: { id: parseInt(req.params.id) }
		}).then(account => {
			if (account) {
				res.render('general', {
					body: 'admin/edit_account',
					pageTitle: 'Edit Account',
					editAccount: account
				})
			} else {
				req.flash('warning', `account id: ${req.params.id} not found`)
				res.redirect('/admin#accounts')
			}
		})
	})

	router.post('/updateAccountEmail', (req, res) => {
		app.services.Storage.models.Account.findOne({
			where: { email: req.body.email }
		}).then(account => {
			if (!account) {
				app.services.Storage.models.Account.findOne({
					where: { id: parseInt(req.body.id) }
				}).then(account => {
					if (account) {
						account.email = req.body.email
						account.save().then(account => {
							req.flash('success', 'Email updated')
							res.redirect(`editAccount/${req.body.id}`)
						}).catch(error => {
							log.error(error)
							req.flash('error', error)
							res.redirect(`editAccount/${req.body.id}`)
						})
					} else {
						req.flash('warning', `account id: ${req.params.id} not found`)
						res.redirect('/admin#accounts')
					}
				})
			} else {
				req.flash('warning', `an account already exists with that email`)
				res.redirect(`editAccount/${req.body.id}`)
			}
		})
	})

	router.post('/updateAccount', (req, res) => {
		app.services.Storage.models.Account.findOne({
			where: { id: parseInt(req.body.id) }
		}).then(account => {
			if (account) {
				for (k in req.body) {
					account[k] = req.body[k]
				}

				account.save().then(account => {
					req.flash('success', 'Account updated')
					res.redirect(`editAccount/${req.body.id}`)
				}).catch(error => {
					log.error(error)
					req.flash('error', error)
					res.redirect(`editAccount/${req.body.id}`)
				})
			} else {
				req.flash('warning', `account id: ${req.params.id} not found`)
				res.redirect('/admin#accounts')
			}
		})
	})

	router.get('/resetAccountPassword/:id', (req, res) => {
		crypto.randomBytes(20, (error, buf) => {
			if (error) throw error

			var token = buf.toString('hex')

			app.services.Storage.models.Account.findOne({
				where: { id: parseInt(req.params.id) }
			}).then(account => {
				if (!account) {
					req.flash('warning', `account id: ${req.params.id} not found`)
					res.redirect('/admin#accounts')
				} else {
					account.resetToken = token
					account.tokenExpires = Date.now() + app.config.resetTokenExpireTime
					account.save().then(account => {
						transporter.sendMail({
							from: app.config.email.from,
							to: account.email,
							subject: 'Password Reset Request',
							text: `
							You are receiving this because you (or someone else) have requested the reset of the password for your account.
							Please click on the following link, or paste this into your browser to complete the process:

							http://${req.headers.host}/account/resetPassword/${account.resetToken}

							If you did not request this, please ignore this email and your password will remain unchanged.`
						}, (error, info ) => {
							if (error) throw error
							req.flash('warning', `A password reset link has been sent to ${account.email}`)
							res.redirect(`/admin#accounts`)
						})
					})
				}
			})
		})
	})

	return router
}
