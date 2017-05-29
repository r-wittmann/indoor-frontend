import 'whatwg-fetch'

//
// BackendService - Fetch Helpers
//
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const convertResponseToJson = (response) => response.json()

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api/'
  : 'https://indoornav.cfapps.io/api/'

//
// BackendService
//
class BackendService {
  //
  // DATABASE ENDPOINTS
  //
  static getPositionByCompanies (companies) {
    return fetch(`${baseUrl}get-position?companies=${companies}`)
      .then(checkStatus)
      .then(convertResponseToJson)
  }

  static getBooths () {
    return fetch(`${baseUrl}get-booths`)
      .then(checkStatus)
      .then(convertResponseToJson)
  }
}
export default BackendService
