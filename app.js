const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressPino = require('express-pino-logger');
const logger = require('./src/helpers/logger').init();

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
    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    console.log('Application started on port ' + PORT);
});
