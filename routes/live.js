var log = require('hogger')('liveRoute')
var router = require('express').Router()
var vm = require('vm')

module.exports = app => {

	router.get('/timeoutTest', (req, res) => {
		var start = Date.now()

		while (Date.now() - start < 120000) {}

		res.setHeader('Content-Type', 'application/json')
		res.send({ "timeoutTestSuccess": true })
	}),

	router.post('/timeoutTest', (req, res) => {
		var start = Date.now()

		while (Date.now() - start < 120000) {}

		res.setHeader('Content-Type', 'application/json')
		res.send({ "timeoutTestSuccess": true })
	}),

	router.get('/:route/:api/:method', (req, res) => {
		if (req.params.route && req.params.api && req.params.method) {
			app.services.Storage.models.Account.findOne({
				where: {
					apiRoute: req.params.route
				}
			}).then(account => {
				if (account) {
					app.services.Storage.models.Api.findOne({
						where: {
							name: req.params.api,
							AccountId: account.id
						}
					}).then(api => {
						if (api) {

							app.services.Storage.models.Method.findOne({
								where: {
									name: req.params.method,
									ApiId: api.id
								}
							}).then(method => {
								if (method) {
									try {
										var response

										switch (method.responseType) {
											case app.const.METHOD_RESPONSE_TYPE.JSON:
												res.setHeader('Content-Type', 'application/json')
												try {
													response = JSON.parse(method.response.trim())
													res.send(response)
												} catch (e) {
													response = {
														success: false,
														message: "Malformed JSON"
													}
												}
												break
											case app.const.METHOD_RESPONSE_TYPE.SCRIPT:
												app.services.Storage.models.ApiTable.findAll({
													where: {
														ApiId: api.id
													},
													include: [app.services.Storage.models.Record]
												}).then(tables => {
													var db = {}

													tables.forEach(table => {
														db[table.name] = []

														table.Records.forEach(record => {
															db[table.name].push(JSON.parse(record.data))
														})
													})

													res.setHeader('Content-Type', 'application/json')

													const logic = new vm.Script(method.response.trim())

													response = {
														req: req.query,
														db: db
													}

													log.debug("response:", response)

													try {
														logic.runInNewContext(response)

														response.req = undefined
														response.db = undefined

														if (response.success === undefined) {
															response.success = true
														}
													} catch(error) {
														log.debug(error)
														response = JSON.stringify({
															success: false,
															error: error.message
														})
													}

													res.send(response)
												})
												break
											default:
												res.setHeader('Content-Type', 'application/text')
												res.send(method.response.trim())
												break
										}
									} catch (error) {
										log.debug(error)
										res.send(JSON.stringify({
											success: false,
											error: error.message
										}))
									}
								} else {
									log.error("method not found")
									res.send(JSON.stringify({
										success: false,
										error: "method not found"
									}))
								}
							})
						} else {
							log.error("api not found")
							res.send(JSON.stringify({
								success: false,
								error: "api not found"
							}))
						}
					})
				} else {
					log.error("account not found")
					res.send(JSON.stringify({
						success: false,
						error: "apiRoute not found"
					}))
				}
			})
		} else {
			req.send(JSON.stringify({
				success: false,
				message: 'url is not complete'
			}))
		}
	})

	router.post('/:route/:api/:method', (req, res) => {
		if (req.params.route && req.params.api && req.params.method) {
			app.services.Storage.models.Account.findOne({
				where: {
					apiRoute: req.params.route
				}
			}).then(account => {
				if (account) {
					app.services.Storage.models.Api.findOne({
						where: {
							name: req.params.api,
							AccountId: account.id
						}
					}).then(api => {
						if (api) {

							app.services.Storage.models.Method.findOne({
								where: {
									name: req.params.method,
									ApiId: api.id
								}
							}).then(method => {
								if (method) {
									try {
										var response

										switch (method.responseType) {
											case app.const.METHOD_RESPONSE_TYPE.JSON:
												res.setHeader('Content-Type', 'application/json')
												try {
													response = JSON.parse(method.response.trim())
													res.send(response)
												} catch (e) {
													response = {
														success: false,
														message: "Malformed JSON"
													}
												}
												break
											case app.const.METHOD_RESPONSE_TYPE.SCRIPT:
												app.services.Storage.models.ApiTable.findAll({
													where: {
														ApiId: api.id
													},
													include: [app.services.Storage.models.Record]
												}).then(tables => {
													var db = {}

													tables.forEach(table => {
														db[table.name] = []

														table.Records.forEach(record => {
															db[table.name].push(JSON.parse(record.data))
														})
													})

													res.setHeader('Content-Type', 'application/json')

													const logic = new vm.Script(method.response.trim())

													response = {
														req: req.body,
														db: db
													}

													log.debug("response:", response)

													try {
														logic.runInNewContext(response)

														response.req = undefined
														response.db = undefined

														if (response.success === undefined) {
															response.success = true
														}
													} catch(error) {
														log.debug(error)
														response = JSON.stringify({
															success: false,
															error: error.message
														})
													}

													res.send(response)
												})
												break
											default:
												res.setHeader('Content-Type', 'application/text')
												res.send(method.response.trim())
												break
										}
									} catch (error) {
										log.debug(error)
										res.send(JSON.stringify({
											success: false,
											error: error.message
										}))
									}
								} else {
									log.error("method not found")
									res.send(JSON.stringify({
										success: false,
										error: "method not found"
									}))
								}
							})
						} else {
							log.error("api not found")
							res.send(JSON.stringify({
								success: false,
								error: "api not found"
							}))
						}
					})
				} else {
					log.error("account not found")
					res.send(JSON.stringify({
						success: false,
						error: "apiRoute not found"
					}))
				}
			})
		} else {
			req.send(JSON.stringify({
				success: false,
				message: 'url is not complete'
			}))
		}
	})

	return router
}
