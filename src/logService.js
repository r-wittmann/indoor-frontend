// Internal log service which takes messages and objects and writes them to the browsers console
class LogService {
  static log (logMessage, logObject) {
    let date = new Date()
    let logDateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
    // only print logs in development mode
    if (process.env.NODE_ENV === 'development') return console.log(logDateString, logMessage, logObject)
  }
}

export default LogService
