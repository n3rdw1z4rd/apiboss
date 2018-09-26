exports.ACCOUNT_ROLE = {
	USER: 1,
	MANAGER: 5,
	ADMIN: 8,
	DEVELOPER: 9,

	getName: function(value) {
		for (var key in this) {
			if (key !== 'getName' && this[key] === value) {
				return key
			}
		}
	},

	getKeys: function() {
		var keys = []

		Object.keys(this).forEach( key => {
			if ( typeof this[key] !== 'function' ) {
				keys.push(key)
			}
		})

		return keys
	}
}

exports.ACCOUNT_STATUS = {
	ACTIVE: 0,
	INACTIVE: 1,
	BANNED: 2,

	getName: function(value) {
		for (var key in this) {
			if (key !== 'getName' && this[key] === value) {
				return key
			}
		}
	},

	getKeys: function() {
		var keys = []

		Object.keys(this).forEach( key => {
			if ( typeof this[key] !== 'function' ) {
				keys.push(key)
			}
		})

		return keys
	}
}

exports.ACCOUNT_SUBSCRIPTION = {
	FREE: 0,
	SINGLE_COPPER: 1,
	SINGLE_SILVER: 2,
	SINGLE_GOLD: 3,
	TEAM_COPPER: 6,
	TEAM_SILVER: 7,
	TEAM_GOLD: 8,

	getName: function(value) {
		for (var key in this) {
			if (key !== 'getName' && this[key] === value) {
				return key
			}
		}
	},

	getKeys: function() {
		var keys = []

		Object.keys(this).forEach( key => {
			if ( typeof this[key] !== 'function' ) {
				keys.push(key)
			}
		})

		return keys
	}
}

exports.METHOD_ROLE = {
	GET: 1,
	SET: 2
}

exports.METHOD_RESPONSE_TYPE = {
	RAW_TEXT: 0,
	JSON: 1,
	SCRIPT: 2,

	getName: function(value) {
		for (var key in this) {
			if (key !== 'getName' && this[key] === value) {
				return key
			}
		}
	},

	getKeys: function() {
		var keys = []

		Object.keys(this).forEach( key => {
			if ( typeof this[key] !== 'function' ) {
				keys.push(key)
			}
		})

		return keys
	}
}
