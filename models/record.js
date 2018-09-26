var log = require('hogger')('recordModel')

module.exports = (db, TYPE) => {
	var Record = db.define('Record', {
		data: {
			type: TYPE.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'records',
		classMethods: {
			associate: models => {
				Record.belongsTo(models.ApiTable, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	})

	//Record.sync({ force: true })

	return Record
}
