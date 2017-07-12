class LogService {
  static log (logMessage, logObject) {
    let date = new Date()
    let logDateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
    if (process.env.NODE_ENV === 'development') return console.log(logDateString, logMessage, logObject)
  }
}

export default LogService
