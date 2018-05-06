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
  : 'https://indoor-nav-backend.cfapps.io/api/'

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
    return fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/5dd5e486-287b-4d29-a385-7f66fd2b6842/image?iterationId=ff032ed4-b6d8-42a7-82fb-769f7f5cf3bd',
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
