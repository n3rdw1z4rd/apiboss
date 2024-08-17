var log = require('./locals/logger')('requirePath')

const FS = require('fs')
const PATH = require('path')

module.exports = requirePath => {
	var contents = {}

	FS.readdirSync(requirePath).forEach(fileName => {
		var path = PATH.join('..', requirePath, fileName)
		var name = ""

		fileName.split('.')[0].split(/[-_]/).forEach(word => {
			name += word.charAt(0).toUpperCase() + word.slice(1)
		})

		try {
			contents[name] = require(path)
			log.debug(`"${path}" loaded`)
		} catch(e) {
			log.error(`"${path}" ${e.code}`)
			log.error(e)
		}
	})

	return contents
}
