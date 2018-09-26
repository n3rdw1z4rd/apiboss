var log = require('hogger')('storageService')
var fs = require('fs')
var path = require('path')

const Sequelize = require('sequelize')

module.exports = app => {
	var sequelize = new Sequelize(
		app.config.dbConnectionUrl, {
			logging: function(msg) {
				//console.log(msg)
			},
			define: {
				charset: 'utf8'
			}
		}
	)

	sequelize.authenticate().then(error => {
		if (error) throw error
	})

	log.info('loading models...')
	var db = {}
	fs
		.readdirSync(path.join(__dirname, '..', 'models'))
		.filter(file => {
			return (file.indexOf('.') !== 0)
		})
		.forEach(file => {
			var model = sequelize.import(path.join(__dirname, '..', 'models', file))
			db[model.name] = model
		})

	Object.keys(db).forEach(modelName => {
		if ('associate' in db[modelName]) {
			db[modelName].associate(db)
		}
	})

	sequelize.sync({
		force: app.config.dbForceSync !== false
	})

	return sequelize
}
