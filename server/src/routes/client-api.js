const router = require('express').Router()
const log = require('../locals/logger')('api')

module.exports = (app) => {
    return router
        // .use((req, res, next) => {
        //     // use this for filtering authenticated api routes
        //     next();
        // })
        // .get('/', (req, res) => {
        //     res.redirect(404, '/');
        // })
        .post('/', (req, res) => {
            res.json(res.locals);
        })
        ;
    // router.use(app.isAuthenticated)

    // router.get('/list', (req, res) => {
    //     app.services.Storage.models.Api.findAll({
    //         where: { AccountId: req.user.id }
    //     }).then(apiList => {
    //         res.render('general', {
    //             body: 'api/list',
    //             pageTitle: 'APIs',
    //             apiList: apiList
    //         })
    //     })
    // })

    // router.post('/createApi', (req, res) => {
    //     app.services.Storage.models.Api.findOrCreate({
    //         where: {
    //             name: req.body.name,
    //             AccountId: req.user.id
    //         }
    //     }).spread((api, isNew) => {
    //         if (isNew) {
    //             req.flash('success', JSON.stringify(req.body))
    //             res.redirect(`edit/${api.id}`)
    //         } else {
    //             req.flash('warning', 'You aleady have an API with that name')
    //             res.redirect('list')
    //         }
    //     })
    // })

    // router.get('/edit/:id', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.params.id),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         if (api) {
    //             api.getMethods().then(methodList => {
    //                 api.getApiTables().then(apiTableList => {
    //                     res.render('general', {
    //                         body: 'api/edit',
    //                         pageTitle: 'Edit ' + api.name,
    //                         api: api,
    //                         methodList: methodList,
    //                         apiTableList: apiTableList
    //                     })
    //                 })
    //             })
    //         } else {
    //             req.flash('error', 'Could not find that Api')
    //             res.redirect('list')
    //         }
    //     })
    // })

    // router.post('/renameApi', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.body.id),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         if (api) {
    //             api.name = req.body.name
    //             api.save().then(api => {
    //                 req.flash('success', `${req.body.name} renamed!`)
    //                 res.redirect(`edit/${req.body.id}`)
    //             }).catch(error => {
    //                 log.error(error)
    //                 req.flash('error', error)
    //                 res.redirect(`edit/${req.body.id}`)
    //             })
    //         } else {
    //             req.flash('error', 'Could not find that API')
    //             res.redirect('list')
    //         }
    //     })
    // })

    // router.post('/addMethod', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.body.id),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         app.services.Storage.models.Method.findOrCreate({
    //             where: {
    //                 name: req.body.name,
    //                 ApiId: api.id
    //             }
    //         }).spread((method, isNew) => {
    //             if (isNew) {
    //                 req.flash('success', `Method '${req.body.name}' created`)
    //                 res.redirect(`editMethod/${api.id}/${method.id}`)
    //             } else {
    //                 req.flash('warning', `Method '${req.body.name}' already exists`)
    //                 res.redirect(`edit/${req.body.id}`)
    //             }
    //         })
    //     })
    // })

    // router.post('/addApiTable', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.body.id),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         app.services.Storage.models.ApiTable.findOrCreate({
    //             where: {
    //                 name: req.body.name,
    //                 ApiId: api.id
    //             }
    //         }).spread((apiTable, isNew) => {
    //             if (isNew) {
    //                 req.flash('success', `ApiTable '${req.body.name}' created`)
    //                 res.redirect(`editApiTable/${api.id}/${apiTable.id}`)
    //             } else {
    //                 req.flash('warning', `ApiTable '${req.body.name}' already exists`)
    //                 res.redirect(`edit/${req.body.id}`)
    //             }
    //         })
    //     })
    // })

    // router.get('/editMethod/:apiId/:methodId', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.params.apiId),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         app.services.Storage.models.Method.findOne({
    //             where: {
    //                 id: parseInt(req.params.methodId),
    //                 ApiId: api.id
    //             }
    //         }).then(method => {
    //             res.render('general', {
    //                 body: 'api/edit_method',
    //                 pageTitle: 'Edit ' + method.name,
    //                 api: api,
    //                 method: method,
    //                 testUrl: `/live/${req.user.apiRoute}/${api.name}/${method.name}`
    //             })
    //         })
    //     })
    // })

    // router.get('/editApiTable/:apiId/:apiTableId', (req, res) => {
    //     app.services.Storage.models.Api.findOne({
    //         where: {
    //             id: parseInt(req.params.apiId),
    //             AccountId: req.user.id
    //         }
    //     }).then(api => {
    //         app.services.Storage.models.ApiTable.findOne({
    //             where: {
    //                 id: parseInt(req.params.apiTableId),
    //                 ApiId: api.id
    //             }
    //         }).then(apiTable => {
    //             apiTable.getRecords().then(records => {
    //                 res.render('general', {
    //                     body: 'api/edit_api_table',
    //                     pageTitle: 'Edit ' + apiTable.name,
    //                     api: api,
    //                     apiTable: apiTable,
    //                     fieldNames: apiTable.fieldNames ? apiTable.fieldNames.split(',') : [],
    //                     records: records.map(record => {
    //                         return { id: record.id, data: record.data ? JSON.parse(record.data) : {} }
    //                     }),
    //                     fieldNameDelimiter: app.config.fieldNameDelimiter
    //                 })
    //             })
    //         })
    //     })
    // })

    // router.post('/renameMethod', (req, res) => {
    //     app.services.Storage.models.Method.findOne({
    //         where: {
    //             id: parseInt(req.body.methodId),
    //             ApiId: parseInt(req.body.apiId)
    //         }
    //     }).then(method => {
    //         if (method) {
    //             method.name = req.body.name
    //             method.save().then(method => {
    //                 req.flash('success', `${req.body.name} renamed!`)
    //                 res.redirect(`editMethod/${req.body.apiId}/${req.body.methodId}`)
    //             }).catch(error => {
    //                 log.error(error)
    //                 req.flash('error', error)
    //                 res.redirect(`edit/${req.body.apiId}`)
    //             })
    //         } else {
    //             req.flash('error', 'Could not find that method')
    //             res.redirect(`edit/${req.body.apiId}`)
    //         }
    //     })
    // })

    // router.post('/renameApiTable', (req, res) => {
    //     log.debug('req.body:', req.body)

    //     app.services.Storage.models.ApiTable.findOne({
    //         where: {
    //             id: parseInt(req.body.apiTableId),
    //             ApiId: parseInt(req.body.apiId)
    //         }
    //     }).then(apiTable => {
    //         if (apiTable) {
    //             apiTable.name = req.body.name
    //             apiTable.save().then(apiTable => {
    //                 req.flash('success', `${req.body.name} renamed!`)
    //                 res.redirect(`editApiTable/${req.body.apiId}/${req.body.apiTableId}`)
    //             }).catch(error => {
    //                 log.error(error)
    //                 req.flash('error', error)
    //                 res.redirect(`edit/${req.body.apiId}`)
    //             })
    //         } else {
    //             req.flash('error', 'Could not find that API table')
    //             res.redirect(`edit/${req.body.apiId}`)
    //         }
    //     })
    // })

    // router.post('/updateMethod', (req, res) => {
    //     app.services.Storage.models.Method.findOne({
    //         where: {
    //             id: parseInt(req.body.methodId)
    //         }
    //     }).then(method => {
    //         if (method) {
    //             method.responseType = parseInt(req.body.responseType)
    //             method.response = req.body.response
    //             method.postData = req.body.postData

    //             method.save().then(method => {
    //                 req.flash('success', `${method.name} response updated!`)
    //                 res.redirect(`editMethod/${req.body.apiId}/${req.body.methodId}`)
    //             }).catch(error => {
    //                 log.error(error)
    //                 req.flash('error', error)
    //                 res.redirect(`edit/${req.params.apiId}`)
    //             })
    //         } else {
    //             req.flash('error', `Could not find that method`)
    //             res.redirect(`edit/${req.params.apiId}`)
    //         }
    //     })
    // })

    // router.post('/updateApiTable', (req, res) => {
    //     app.services.Storage.models.ApiTable.findOne({
    //         where: {
    //             id: parseInt(req.body.apiTableId)
    //         },
    //         include: [app.services.Storage.models.Record]
    //     }).then(apiTable => {
    //         if (apiTable) {
    //             var fieldNames = apiTable.fieldNames.split(',')
    //             var recordMap = {}

    //             for (var fieldName in req.body) {
    //                 var parts = fieldName.split(app.config.fieldNameDelimiter)

    //                 if (fieldNames.includes(parts[0])) {
    //                     if (!recordMap[parts[1]]) {
    //                         recordMap[parts[1]] = {}
    //                     }

    //                     recordMap[parts[1]][parts[0]] = req.body[fieldName]
    //                 }
    //             }

    //             var records = []

    //             function updateRecord(record) {
    //                 return new Promise((resolve, reject) => {
    //                     app.services.Storage.models.Record.update({
    //                         data: record.data
    //                     }, {
    //                         where: { id: record.id }
    //                     }).then(() => {
    //                         resolve()
    //                     }).catch(error => {
    //                         reject(error)
    //                     })
    //                 })
    //             }

    //             for (var id in recordMap) {
    //                 records.push(updateRecord({ id: parseInt(id), data: JSON.stringify(recordMap[id]) }))
    //             }

    //             Promise.all(records)
    //                 .then(() => {
    //                     req.flash('success', `${apiTable.name} updated!`)
    //                     res.redirect(`editApiTable/${req.body.apiId}/${req.body.apiTableId}`)
    //                 }).catch(error => {
    //                     req.flash('error', error.message)
    //                     res.redirect(`editApiTable/${req.body.apiId}/${req.body.apiTableId}`)
    //                 })
    //         } else {
    //             req.flash('error', `Could not find that API table`)
    //             res.redirect(`edit/${req.params.apiId}`)
    //         }
    //     })
    // })

    // router.post('/addApiTableField', (req, res) => {
    //     app.services.Storage.models.ApiTable.findOne({
    //         where: {
    //             id: parseInt(req.body.id),
    //             ApiId: parseInt(req.body.ApiId)
    //         }
    //     }).then(apiTable => {
    //         if (apiTable) {
    //             var fieldNames = apiTable.fieldNames ? apiTable.fieldNames.split(',') : []

    //             if (!fieldNames.includes(req.body.name)) {
    //                 fieldNames.push(req.body.name)
    //                 apiTable.fieldNames = fieldNames.join(',')
    //                 apiTable.save().then(apiTable => {
    //                     req.flash('success', `${req.body.name} field saved!`)
    //                     res.redirect(`editApiTable/${req.body.ApiId}/${req.body.id}`)
    //                 }).catch(error => {
    //                     log.error(error)
    //                     req.flash('error', error)
    //                     res.redirect(`editApiTable/${req.body.ApiId}/${req.body.id}`)
    //                 })
    //             } else {
    //                 req.flash('error', `Could not find that API table`)
    //                 res.redirect(`edit/${req.body.ApiId}`)
    //             }
    //         }
    //     })
    // })

    // router.post('/addApiTableRecord', (req, res) => {
    //     app.services.Storage.models.ApiTable.findOne({
    //         where: {
    //             id: parseInt(req.body.id),
    //             ApiId: parseInt(req.body.ApiId)
    //         }
    //     }).then(apiTable => {
    //         var data = {}

    //         for (var key in req.body) {
    //             if (key.indexOf('fieldName' + app.config.fieldNameDelimiter) === 0) {
    //                 var fieldName = key.split(app.config.fieldNameDelimiter)[1]

    //                 data[fieldName] = req.body[key]
    //             }
    //         }

    //         log.debug('data:', data)
    //         app.services.Storage.models.Record.create({
    //             data: JSON.stringify(data),
    //             ApiTableId: apiTable.id
    //         }).then(record => {
    //             if (record) {
    //                 req.flash('success', `ApiTable record created`)
    //                 res.redirect(`editApiTable/${apiTable.ApiId}/${apiTable.id}`)
    //             } else {
    //                 req.flash('warning', `There was an issue, please check logs`)
    //                 res.redirect(`editApiTable/${apiTable.ApiId}/${apiTable.id}`)
    //             }
    //         })
    //     })
    // })

    return router
}
