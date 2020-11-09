const PATH = "https://api.stldata.org"

class ApiRequest {
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
  }

  async callApi(method?: string) {
    let apiMethod = method || this.method;
    try {
      const response = await fetch(PATH + this.endpoint, {
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
