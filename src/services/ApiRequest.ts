
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

  async callApi(params: ParamsObject, method?: string, paths?: string[]) {
    let apiMethod = method || this.method;
    let url = this.path + this.endpoint;
    if(paths) {
      for(let i = paths.length - 1; i >= 0; i--) {
        let path = paths[i];
        let lastCharIndex = url.lastIndexOf('}')
        if(lastCharIndex > -1) {
          let lastOpenIndex = url.lastIndexOf('{')
          if(lastOpenIndex > -1) {
            // take substring and replace with path
            let substr = url.substring(lastOpenIndex, lastCharIndex + 1);
            console.log('substr:', substr)
            let newstr = url.split(substr).join(path)
            console.log('newstr:', newstr)
            url = newstr;
          }
        }
      }
    }
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
      // console.log('status:', response.status)
      const data = await response.json();
      return { status: response.status, data }
    } catch (error) {
      console.log('error fetching api:', error)
      return { error: true, message: error.toString() } // status?
    }
  }
}

export default ApiRequest
