import { createLogger, format, transports, Logform } from 'winston';
import path from 'path';
import util from 'util';
import { red, yellow, green, blue, magenta } from 'colorette';
import config from '@config/index';
import { APP_ENV } from '@config/constants';
import * as SourceMapSupport from 'source-map-support';

// Linking trace support 
SourceMapSupport.install();

// Use require to get __dirname in CommonJS environment
// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentFilePath = require.main?.filename || __filename;
const __dirname = path.dirname(currentFilePath);

/**
 * Colorizes the log level for console output.
 */
const colorizeLevel = (level: string): string => {
    switch (level.toUpperCase()) {
        case 'ERROR':
            return red(level.toUpperCase());
        case 'INFO':
            return blue(level.toUpperCase());
        case 'WARN':
            return yellow(level.toUpperCase());
        case 'DEBUG':
            return green(level.toUpperCase());
        default:
            return magenta(level.toUpperCase());
    }
};

/**
 * Custom format for console transport.
 */
const consoleLogFormat = format.printf((info: Logform.TransformableInfo): string => {
    const { level, message, timestamp, meta = {}  } = info;
    const metaString = Object.keys(meta as object).length ? `\n${util.inspect(meta, { colors: true, depth: 3 })}` : '';
    return `${timestamp} [${colorizeLevel(level)}]: ${message}${metaString}`;
});

/**
 * Configures console transport based on environment.
 */
function consoleTransport(): transports.ConsoleTransportInstance[] {
    if (config.env === APP_ENV.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'debug',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
}

/**
 * Custom format for file transport (JSON output).
 */
const fileLogFormat = format.printf((info: Logform.TransformableInfo): string => {
    const { level, message, timestamp, meta = {} } = info;
    const metaObject = meta as Record<string, unknown>;

    const logMeta = Object.entries(metaObject).reduce((acc: Record<string, unknown>, [key, value]: [string, unknown]) => {
        if (value instanceof Error) {
            acc[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack || 'No stack trace available'
            };
        } else if (typeof value === 'object' && value !== null) {
            acc[key] = JSON.stringify(value);
        } else {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, unknown>);

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp: timestamp as string,
        meta: logMeta
    };

    return JSON.stringify(logData);
});

/**
 * Configures file transport.
 */
function fileTransport(): transports.FileTransportInstance[] {
    const logDirectory = path.resolve(process.cwd(), 'logs');

    return [
        new transports.File({
            filename: path.join(logDirectory, `${config.env}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat),
            maxsize: 5242880,
            maxFiles: 5,
            tailable: true
        })
    ];
}

// Create the logger instance
export default createLogger({
    defaultMeta: {
        service: APP_ENV.APP_NAME
    },
    transports: [...fileTransport(), ...consoleTransport()],
    exitOnError: false,
});