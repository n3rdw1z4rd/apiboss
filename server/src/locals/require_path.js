const { readdirSync } = require('fs');
const { resolve } = require('path');

const log = require('./logger')('requirePath');

module.exports = (requirePath) => {
    const contents = {};

    readdirSync(requirePath).forEach((fileName) => {
        const path = resolve(requirePath, fileName);
        const serviceName = fileName.split('.')[0].split(/[-_]/)
            .map((word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');

        try {
            contents[serviceName] = require(path);
            log.debug(`'${path}' loaded`);
        } catch (e) {
            log.error(`${e.code}: ${path}`);
            log.error(e.message);
            throw e;
        }
    })

    return contents;
}
