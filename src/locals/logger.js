const { inspect } = require('util');

const COLOR_RESET = '\x1b[0m';
const COLOR_DIM = '\x1b[2m';
const COLOR_RED = '\x1b[31m';
const COLOR_GREEN = '\x1b[32m';
const COLOR_YELLOW = '\x1b[33m';
const COLOR_WHITE = '\x1b[37m';

const SHOW_DEBUG = (process.env.NODE_ENV === 'development');
console.debug('*** SHOW_DEBUG:', SHOW_DEBUG);

class Logger {
    constructor(scope, level) {
        this.scope = scope || path.basename(module.parent.filename, path.extname(module.parent.filename))
    }

    _log(color, scope, args) {
        args = args.map((arg) => (typeof arg === 'string') ? arg : inspect(arg));

        scope = `[${this.scope ?? scope}]`;

        console.log(`${color}${(new Date()).toISOString().replace(/[TZ]/g, ' ')}${scope} ${args.join(' ')} ${COLOR_RESET}`);
    };

    debug(...args) {
        if (SHOW_DEBUG) {
            this._log(COLOR_DIM + COLOR_WHITE, 'DBG', args)
        }
    }

    info(...args) {
        this._log(COLOR_WHITE, 'INF', args)
    }

    warn(...args) {
        this._log(COLOR_YELLOW, 'WRN', args)
    }

    error(...args) {
        this._log(COLOR_RED, 'ERR', args)
    }
}

module.exports = function (scope, level) {
    return new Logger(scope, level)
}
