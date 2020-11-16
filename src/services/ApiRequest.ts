
interface ParamsObject {
  [field: string]: any // value of string, number, boolean, ...others?
}

class ApiRequest {
  path: string;
  endpoint: string;
  method: string = 'GET'
  headers: any = {
    // 'Accepts': 'application/json',
    'Content-Type': 'application/json'
  }

  constructor(endpoint: string, method?: string, headers?: any) {
    this.endpoint = endpoint;
    if(method)
      this.method = method
    if(headers)
      this.headers = headers;

    this.path = process.env.REACT_APP_API_URL || ""
  }

  async callApi(params: ParamsObject, method?: string, ) {
    let apiMethod = method || this.method;
    let url = this.path + this.endpoint;
    Object.keys(params).forEach((param, index) => {
      if(index === 0)
        url+=`?${param}=${params[param]}`
      else
        url+=`&${param}=${params[param]}`
    })

    try {
      const response = await fetch(url, {
        method: apiMethod,
        headers: this.headers
      })
      console.log('status:', response.status)
      const data = await response.json();
      return { status: response.status, data }
    } catch (error) {
      console.log('error fetching api:', error)
      return { error: true, message: error.toString() } // status?
    }
  }
}

export default ApiRequest
