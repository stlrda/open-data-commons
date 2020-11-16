// credits and docs: https://apitools.dev/swagger-parser/docs/#class-methods-vs-instance-methods

import SwaggerParser from '@apidevtools/swagger-parser'

class SwaggerParserService {

  // can change to callback return for error responses
  async validateApi(url: string) {
    try {
      const response = await SwaggerParser.validate(url, {
        resolve: {
          file: false
        }
      });
      return response;
    }
    catch(error) {
      console.log('error:', error)
      return undefined;
    }
  }
}

export default SwaggerParserService
