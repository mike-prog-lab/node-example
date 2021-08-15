const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressPino = require('express-pino-logger');
const logger = require('./src/helpers/logger').init();
const secret = require('./src/services/secret.service');

const expressLogger = expressPino({ logger });

const PORT = 5000;
const app = express();

app.use(expressLogger);
app.use(bodyParser.json());

app.use('/projects', require('./src/routers/project.router'));

app.use(async (req, res) => {
    return res.status(404).json({
        message: "Route undefined."
    });
})

app.use((err, req, res, next) => {
    logger.error(err);

    res.status(500).json({
        message: "Server error.",
    })
});

app.listen(PORT, async () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };

    if (process.env.NODE_ENV !== 'production') {
        await mongoose.connect(process.env.DB_URI, options);
    } else {
        const uri = await secret.getMongodbUri();

        await mongoose.connect(
            uri,
            {
                ...options,
                sslCA: await secret.getMongodbPem(),
            }
        )
    }

    console.log('Application started on port ' + PORT);
});
