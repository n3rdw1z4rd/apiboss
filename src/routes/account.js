const passport = require('passport')
const crypto = require('crypto')
const router = require('express').Router()

const log = require('../locals/logger')('accountRoute')

module.exports = (app) => {
    log.debug('app.services:', app.services);

    router.get('/login', (req, res) => {
        res.render('general', { body: 'account/login', pageTitle: 'Login' })
    })

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/account/verifyStatus',
        failureRedirect: 'login',
        failureFlash: 'Invalid email/password'
    }))

    router.get('/verifyStatus', (req, res) => {
        switch (req.user.status) {
            case app.const.ACCOUNT_STATUS.INACTIVE:
                crypto.randomBytes(20, (error, buf) => {
                    if (error) throw error

                    var token = buf.toString('hex')

                    req.user.resetToken = token
                    req.user.tokenExpires = Date.now() + app.config.resetTokenExpireTime
                    req.user.save().then(account => {
                        transporter.sendMail({
                            from: app.config.email.from,
                            to: req.user.email,
                            subject: 'Account Re-Activation',
                            text: `
							You are receiving this because you (or someone else) has attempted to login your inactive account.
							Please click on the following link, or paste this into your browser to re-activate:

							http://${req.headers.host}/account/reactivate/${token}

							If you do not wish to re-activate, please ignore this email and your account will remain inactive.`
                        }, (error, info) => {
                            if (error) throw error
                            req.flash('error', `This account is inactive. A reactivation email has been sent to ${req.user.email}`)
                            req.logout()
                            res.redirect('/account/login')
                        })
                    })
                })
                break
            case app.const.ACCOUNT_STATUS.BANNED:
                req.logout()
                req.flash('error', 'This account was BANNED. If you feel this should not be, feel free to contact support.')
                res.redirect('/account/login')
                break
            default:
                res.redirect('/api/list')
                break
        }
    })

    router.get('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout()
            req.flash('warning', 'You have been logged out')
        } else {
            req.flash('warning', 'You are not logged in')
        }

        res.redirect('login')
    })

    router.get('/register', (req, res) => {
        res.render('general', { body: 'account/register', pageTitle: 'Register' })
    })

    router.post('/register', (req, res) => {
        if (req.body.password === req.body.passwordConfirm) {
            app.services.Storage.models.Account.register(req.body.email, req.body.password, (error, account) => {
                if (error) {
                    log.error(error)
                    req.flash('error', error.message)
                    res.redirect('register')
                } else {
                    req.login(account, error => {
                        if (error) {
                            req.flash('error', 'There was an internal error, please notify support.')
                            res.redirect('login')
                        } else {
                            req.flash('success', `Registered a new account for ${req.body.email}`)
                            res.redirect('manage')
                        }
                    })
                }
            })
        } else {
            req.flash('error', 'Passwords must match')
            res.redirect('register')
        }
    })

    router.get('/manage', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('general', {
                body: 'account/manage',
                pageTitle: 'Manage Account',
                account: req.user
            })
        } else {
            req.flash('error', 'You must be logged in to access that')
            res.redirect('login')
        }
    })

    router.post('/update', (req, res) => {
        if (req.isAuthenticated()) {
            for (k in req.body) {
                req.user[k] = req.body[k]
            }

            req.user.save().then(account => {
                req.flash('success', 'Account Updated')
                return res.redirect('/account/manage')
            }).catch(error => {
                log.error(error)
                req.flash('error', error.message)
                return res.redirect('/account/manage')
            })
        } else {
            req.flash('error', 'You must be logged in to access that')
            res.redirect('login')
        }
    })

    router.get('/resetPassword', (req, res) => {
        res.render('general', { body: 'account/reset_password', pageTitle: 'Reset Password' })
    })

    router.post('/resetPassword', (req, res) => {
        crypto.randomBytes(20, (error, buf) => {
            if (error) throw error

            var token = buf.toString('hex')

            app.services.Storage.models.Account.findOne({
                where: { email: req.body.email }
            }).then(account => {
                if (!account) {
                    req.flash('error', 'That email is not registered')
                    res.redirect('/account/resetPassword')
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
                        }, (error, info) => {
                            if (error) throw error
                            req.flash('warning', `A password reset link has been sent to ${req.body.email}`)
                            res.redirect('/info/welcome')
                        })
                    })
                }
            })
        })
    })

    router.get('/resetPassword/:token', (req, res) => {
        app.services.Storage.models.Account.findOne({
            where: {
                resetToken: req.params.token,
                tokenExpires: { $gt: Date.now() }
            }
        }).then(account => {
            if (!account) {
                req.flash('error', 'Password reset token is invalid or has expired')
                res.redirect('/account/resetPassword')
            } else {
                req.flash('success', 'Password reset')
                res.render('general', { body: 'account/password_reset_form', pageTitle: 'Password Reset' })
            }
        })
    })

    router.post('/resetPassword/:token', (req, res) => {
        app.services.Storage.models.Account.findOne({
            where: {
                resetToken: req.params.token,
                tokenExpires: { $gt: Date.now() }
            }
        }).then(account => {
            if (!account) {
                req.flash('error', 'Password reset token is invalid or has expired')
                return res.redirect('/resetPassword')
            } else {
				/*if (account.status !== app.const.ACCOUNT_STATUS.ACTIVE) {
					req.flash('error', 'That account is not active')
					res.redirect()
				} else*/ if (req.body.password !== req.body.passwordConfirm) {
                    req.flash('error', 'Passwords must match')
                    res.redirect(`/account/resetPassword/${req.params.token}`)
                } else {
                    account.setPassword(req.body.password, (error, account) => {
                        if (error) throw error
                        account.resetToken = null
                        account.save().then(acount => {
                            req.logIn(account, (error) => {
                                if (error) throw error
                                transporter.sendMail({
                                    from: app.config.email.from,
                                    to: account.email,
                                    subject: 'Password Changed Notification',
                                    text: `This is to confirm that the password for ${account.email} has been changed.`
                                }, (error, info) => {
                                    if (error) throw error
                                    req.flash('success', 'Password updated')
                                    res.redirect('/api/list')
                                })
                            })
                        }).catch(error => {
                            log.error(error)
                            req.flash('error', error)
                            redirect('/info/welcome')
                        })
                    })
                }
            }
        })
    })

    router.get('/deleteAccount', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('general', { body: 'account/delete_account', pageTitle: 'Delete Account' })
        } else {
            req.flash('error', 'You must be logged in to access that')
            res.redirect('/login')
        }
    })

    router.post('/deleteAccount', (req, res, next) => {
        if (req.isAuthenticated()) {
            app.services.Storage.models.Account.findOne({
                where: { email: req.body.email }
            }).then(account => {
                if (!account) {
                    req.flash('error', 'That email was not found')
                    res.redirect('/account/deleteAccount')
                } else {
                    passport.authenticate('local', req.body.password, (error, account, info) => {
                        if (error) { return next(error) }

                        if (!account) {
                            req.flash('error', info.message)
                            return res.redirect('/account/deleteAccount')
                        } else {
                            account.status = app.const.ACCOUNT_STATUS.INACTIVE
                            //account.destroy({ force: true }) // Shouldn't delete accounts, just make them inactive.
                            account.save().then(account => {
                                req.logout()
                                req.flash('warning', `Account for ${req.body.email} has been deleted`)
                                return res.redirect('/account/login')
                            }).catch(error => {
                                log.error(error)
                                req.flash('error', error)
                                return res.redirect('/account/deleteAccount')
                            })
                        }
                    })(req, res, next)
                }
            })
        } else {
            req.flash('error', 'You must be logged in to access that')
            res.redirect('/login')
        }
    })

    router.get('/reactivate/:token', (req, res) => {
        app.services.Storage.models.Account.findOne({
            where: {
                resetToken: req.params.token,
                tokenExpires: { $gt: Date.now() }
            }
        }).then(account => {
            if (!account) {
                req.flash('error', 'Re-activate account token is invalid or has expired')
                return res.redirect('/')
            } else {
                if (account.status == app.const.ACCOUNT_STATUS.BANNED) {
                    req.flash('error', 'That account has been BANNED, if you feel this should not be, please contact support.')
                    res.redirect('/')
                } else {
                    req.flash('warning', 'Please login here to re-activate your account')
                    res.render('general', { body: 'account/reactivate_form', pageTitle: 'Re-Activate Account' })
                }
            }
        })
    })

    router.post('/reactivate/:token', (req, res) => {
        app.services.Storage.models.Account.findOne({
            where: {
                resetToken: req.params.token,
                tokenExpires: { $gt: Date.now() }
            }
        }).then(account => {
            if (!account) {
                req.flash('error', 'Re-activate account token is invalid or has expired')
                return res.redirect('/')
            } else {
                if (account.status == app.const.ACCOUNT_STATUS.BANNED) {
                    req.flash('error', 'That account has been BANNED, if you feel this should not be, please contact support.')
                    res.redirect('/')
                } else {
                    account.status = app.const.ACCOUNT_STATUS.ACTIVE
                    account.resetToken = null
                    account.save().then(account => {
                        req.logIn(account, error => {
                            if (error) throw error

                            transporter.sendMail({
                                from: app.config.email.from,
                                to: account.email,
                                subject: 'Account Re-Activation Notification',
                                text: `This is to confirm that your account has been re-activated.`
                            }, (error, info) => {
                                if (error) throw error

                                req.flash('success', 'Account re-activated. Welcome back!')
                                res.redirect('/api/list')
                            })
                        })
                    }).catch(error => {
                        log.error(error)
                        req.flash('error', error)
                        redirect('/info/welcome')
                    })
                }
            }
        })
    })

    router.get('/dashboard', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('general', {
                body: 'account/dashboard',
                pageTitle: 'Dashboard',
                apis: app.services.Storage.models.Api.findAll({ AccountId: req.user.id }) || []
            })
        } else {
            res.redirect('/info/welcome')
        }
    })

    return router
}
