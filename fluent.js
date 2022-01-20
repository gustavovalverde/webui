const winston = require('winston')
const fluentLogger = require('fluent-logger')
const fluentTransport = fluentLogger.support.winstonTransport()

const fluent = new fluentTransport('mytag', {
  host: 'api.fonoster.io',
  port: 24224,
  timeout: 3.0,
  requireAckResponse: true,
})

const logger = winston.createLogger({
  format: winston.format.json(),
  levels: winston.config.npm.levels,
  transports: [new winston.transports.Console(), fluent],
  level: 'verbose',
})

logger.on('finish', () => {
  fluent.sender.end('end', {}, () => {})
})

// logger.error(
//   'Error communicating with your Voice application at https://30bf-47-132-130-31.ngrok.io',
//   { eventType: 'app', accessKeyId: 'PJ61e17b197dad0a0800000016' }
// )
// logger.error(
//   'Error communicating with your SIP communications infrastructure: Unable to connect sip:+19189721092@sip.fonoster.io;transport=tcp',
//   { eventType: 'sip', accessKeyId: 'PJ61e17b197dad0a0800000016' }
// )
// logger.error(
//   'Error communicating with your SIP communications infrastructure: Unable to connect sip:+19189721092@sip.fonoster.io;transport=tcp',
//   { eventType: 'sip', accessKeyId: 'PJ61e17b197dad0a0800000016', body: {
//     "to": "sip:+17852265933@provider.net",
//     "callType": "sip-pstn",
//     "direction": "inbound"
//   }, }
// )
// logger.error('Call from +7853179070 to +17852265933 completed', {
//   body: {
//     "from": "+7853179070",
//     "to": "sip:+17852265933@provider.net",
//     "status": "completed",
//     "duration": "1m",
//     "callType": "sip-pstn",
//     "direction": "inbound"
//   },
//   eventType: 'call',
//   accessKeyId: 'PJ61e17b197dad0a0800000016',
// })
// logger.error('Call from +7853179070 to +17852265933 completed', {
//   body: {
//     "from": "+7853179070",
//     "to": "sip:+17852265933@provider.net",
//     "status": "completed",
//     "duration": "1m",
//     "callType": "sip-pstn",
// //     "direction": "inbound"
// //   },
// //   eventType: 'call',
// //   accessKeyId: 'PJ61e17b197dad0a0800000016',
// // })
// logger.error('Call from +7853179070 to +17852265933 completed', {
//   body: {
//     "from": "+7853179070",
//     "to": "sip:+17852265933@provider.net",
//     "status": "completed",
//     "duration": "1m",
//     "callType": "sip-pstn",
//     "direction": "inbound"
//   },
//   eventType: 'call',
//   accessKeyId: 'PJ61e17b197dad0a0800000016',
// })
// logger.error('Call from +7853179070 to +17852265933 completed', {
//   body: {
//     "from": "+7853179070",
//     "to": "sip:+17852265933@provider.net",
//     "status": "completed",
//     "duration": "1m",
//     "callType": "sip-pstn",
//     "direction": "inbound"
//   },
//   eventType: 'call',
//   accessKeyId: 'PJ61e17b197dad0a0800000016',
// })
logger.error('TEST - Call from +7853179070 to +17852265933 completed', {
  body: {
    "from": "+7853179070",
    "to": "sip:+17852265933@provider.net",
    "status": "completed",
    "duration": "1m",
    "callType": "sip-pstn",
    "direction": "inbound"
  },
  eventType: 'call',
  accessKeyId: 'PJ61e17b197dad0a0800000016',
})
