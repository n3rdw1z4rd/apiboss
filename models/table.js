var log = require('hogger')('tableModel')

module.exports = (db, TYPE) => {
	var ApiTable = db.define('ApiTable', {
		name: {
			type: TYPE.STRING,
			allowNull: false
		},
		fieldNames: {
			type: TYPE.STRING,
			allowNull: false,
			defaultValue: ""
		}
	}, {
		tableName: 'api_tables',
		classMethods: {
			associate: models => {
				ApiTable.belongsTo(models.Api, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
				ApiTable.hasMany(models.Record)
			}
		}
	})

	//ApiTable.sync({ force: true })

	return ApiTable
}
