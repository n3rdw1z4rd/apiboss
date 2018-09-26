var log = require('hogger')('apiModel')

module.exports = (db, TYPE) => {
	var Api = db.define('Api', {
		name: {
			type: TYPE.STRING,
			allowNull: false
		}
	}, {
		tableName: 'apis',
		classMethods: {
			associate: models => {
				Api.belongsTo(models.Account, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
				Api.hasMany(models.Method)
				Api.hasMany(models.ApiTable)
			}
		}
	})

	//Api.sync({ force: true })

	return Api
}
