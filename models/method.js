var log = require('hogger')('methodModel')

const constants = require('../locals/constants')

module.exports = (db, TYPE) => {
	var Method = db.define('Method', {
		name: {
			type: TYPE.STRING,
			allowNull: false
		},
		responseType: {
			type: TYPE.INTEGER,
			defaultValue: constants.METHOD_RESPONSE_TYPE.RAW_TEXT
		},
		response: {
			type: TYPE.TEXT
		},
		postData: {
			type: TYPE.TEXT
		}
	}, {
		tableName: 'methods',
		classMethods: {
			associate: models => {
				Method.belongsTo(models.Api, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	})

	//Method.sync({ force: true })

	return Method
}
