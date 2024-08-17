const { createServer } = require('http');
const { join, resolve } = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

const requirePath = require('../locals/require_path');
const log = require('../locals/logger')('httpService');

module.exports = app => {
    const expressApp = express();

    expressApp.set('views', resolve(__dirname, '../views'));
    expressApp.set('view engine', 'ejs');

    if (app.config.useSecurityMeasures) {
        expressApp.use(helmet());
    }

    expressApp.use(bodyParser.json())
    expressApp.use(bodyParser.urlencoded({ extended: true }))
    expressApp.use(session({
        secret: 'the secret',
        resave: false,
        saveUninitialized: false
    }))
    expressApp.use(passport.initialize())
    expressApp.use(passport.session())
    expressApp.use(flash())
    expressApp.use(express.static(resolve(__dirname, '../static')))

    expressApp.use((req, res, next) => {
        log.debug(req.method, req.path)

        res.locals = app.config.locals
        res.locals.account = req.user
        res.locals.constants = app.const
        res.locals.isAdmin = req.user ? (req.user.role >= app.const.ACCOUNT_ROLE.ADMIN) : false
        res.locals.error = req.flash('error')
        res.locals.warning = req.flash('warning')
        res.locals.success = req.flash('success')
        res.locals.info = req.flash('info')

        next()
    })

    expressApp.get('/', (req, res) => {
        res.redirect('/info/welcome')
    })

    expressApp.get('/ace/:path/:file', (req, res) => {
        res.sendFile(join(__dirname, '../node_modules/ace-builds', req.params.path, req.params.file))
    })

    log.info('loading routes...')
    var routes = requirePath(resolve(__dirname, '../routes'))
    for (var route in routes) {
        log.debug('route:', route.toLowerCase())
        expressApp.use(`/${route.toLowerCase()}`, routes[route](app))
    }

    expressApp.use((req, res) => {
        res.render('general', { body: 'error', pageTitle: 'Error', message: `404: The path for which you seek is not available (${req.path}).` })
    })

    var httpServer = createServer(expressApp)
    httpServer.listen(app.config.httpPort)

    httpServer.on('error', error => {
        log.error(error)
    })

    httpServer.on('listening', error => {
        if (error) log.error(error)
        log.info('listening on port', app.config.httpPort)
    })

    return expressApp
}
