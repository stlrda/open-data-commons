//@ts-nocheck
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from '../types/Openapi'

class OpenapiFormatter {

  /**
   * Accepts a paths object,
   * returns a paths array with the necesary nested object instances converted to arrays
   */
  formatPaths(paths: OpenAPIV3.PathsObject): any[] {
    const formattedPaths = Object.keys(paths).map(key => {
      const methods = Object.keys(paths[key]).map(method => {
        if(paths[key][method].responses) {
          const responses: (OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject)[] =
            Object
              .keys(paths[key][method].responses)
              .map(response => {
                return {...paths[key][method].responses[response], code: response}
              })
          paths[key][method].responses = responses;
        }
        return { http: method, value: paths[key][method] }
      })
      return {endpoint: key, methods }
    })

    return formattedPaths;
  }

  /**
   * Returns an array of navigation routes for the sidebar
   */
  getNavRoutes(paths: any[]): ODCNavRoute[] {
    // NOTE: for hierarchical views, this will need to be refactored
    let navRoutes: ODCNavRoute[] = []; // need: path.method[each].http, path.method[each].value.summary, path.method[each].value.operationId
    paths.forEach(path => {
      path.methods.forEach(method => {
        let navRoute: ODCNavRoute = {
          http: method.http,
          summary: method.value.summary,
          operationId: method.value.operationId
        }
        navRoutes.push(navRoute);
      })
    })
    return navRoutes
  }

  getTitleFromRef(ref: string): string {
    return ref.split('/')[ref.length-1]
  }

  // formatPaths2(paths: OpenAPIV3.PathsObject): any[] {
  //   let formattedPaths = [];
  //   let pathKeys = Object.keys(paths);
  //   for(let i=0, n = pathKeys.length; i<n; i++) {
  //     let pathKey = pathKeys[i]
  //     formattedPaths[pathKey] = paths[pathKey]

  //     // Get methods into array
  //     let formattedMethods = []
  //     let methodKeys = Object.keys(paths[pathKey]);
  //     // console.log('method keys:', methodKeys)
  //     for(let a=0, m = methodKeys.length; a<m; a++) {
  //       let methodKey = methodKeys[a]
  //       formattedMethods[methodKey] = paths[pathKey][methodKey]

  //       if(paths[pathKey][methodKey].responses) {
  //         let formattedResponses = []
  //         let responseKeys = Object.keys(paths[pathKey][methodKey].responses);
  //         console.log('response keys:', responseKeys)
  //         for(let b=0, o = responseKeys.length; b<o; b++) {
  //           let responseKey = responseKeys[b]
  //           formattedResponses[responseKey] = paths[pathKey][methodKey].responses[responseKey]
  //         }
  //         formattedPaths[pathKey][methodKey].responses = formattedResponses;
  //       }
  //     }
  //     formattedPaths[pathKey] = formattedMethods;
  //   }

  //   return formattedPaths;
  // }
}

export default OpenapiFormatter
