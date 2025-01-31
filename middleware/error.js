import winston from 'winston';

export default function error(err, req, res, next) {
winston.error(err.message, err);

//log in levels: error, warn, info, verbose, debug, silly
    res.status(500).send("Something failed");
}