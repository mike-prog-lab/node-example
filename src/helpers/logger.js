class Logger {
    static instance;

    static init() {
        if (Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = require("pino")({
            level: process.env.LOG_LEVEL || 'info',
        });

        return Logger.instance;
    }
}

module.exports = Logger;
