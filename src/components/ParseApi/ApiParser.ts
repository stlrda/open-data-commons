

class ApiParser {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  // Make an API call to the given url, fetch the json
  async getSwaggerJson() {
    try {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log('data:', data)
      if(!data) throw new Error("Could not retrieve data")
      return data;
    }
    catch (error: any) {
      console.log('error:', error)
      return { error: true, message: error.toString() }
    }
  }
}

export default ApiParser;
