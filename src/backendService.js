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

  static getCompanyPrediction (image) {
    return fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/5dd5e486-287b-4d29-a385-7f66fd2b6842/image?iterationId=c07e8f2b-fe8d-4281-b05a-b4581bcb9354',
      {method: 'POST',
        headers:
        { 'content-type': 'application/octet-stream',
          'prediction-key': '13567bb5674349b1b86660bf05df9f78' },
        body: image
      }
  )
      .then(checkStatus)
      .then(convertResponseToJson)
  }
}
export default BackendService
