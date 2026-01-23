import { createLogger, transports, format } from "winston";

export const loggerSystem = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => {
      return `${info.timestamp} ${info.message}`
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.printf(info => {
          return `${info.message}`;
        })
      )
    }),
    new transports.File({ filename: 'logs/system.log' }),
  ]
})