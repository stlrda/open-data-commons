//@ts-nocheck
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from '../types/Openapi'

export interface ODCTable {
  id: string
  columns: {
    [name: string]: ODCTableColumn
  },
  rows: ODCTableRow[]
  requiredFields?: string[] // requiredFields
}
export interface ODCTableColumn {
  name: string
  title: string
  type: string
  required: boolean
  format?: string
}
export interface ODCTableRow {
  [key: string]: any
}

type NonArraySchemaObjectType = 'boolean' | 'object' | 'number' | 'string' | 'integer';
type ArraySchemaObjectType = 'array';

class OpenapiFormatter {

  /**
   * Accepts a paths object,
   * returns a paths array with the necesary nested object instances converted to arrays
   */
  formatPaths(paths: OpenAPIV3.PathsObject): any[] {
    // const start = Date.now();
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
    // const end = Date.now();
    // const time = end - start;
    // console.log('time elapsed:', time)
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

  getResponseTables(paths: any[]) {
    let tables: ODCTable[] = [];

    // For each path, we need a table
    paths.forEach(path => {
      let table: ODCTable = {}

      // try {
        const method = path.methods[0].value;
        const schema = method.responses[0].content["application/json"].schema;

        // For each table, we need an id, columns, and rows (default to 1 with dummy data)
        table.id = method.operationId
        table.columns = {}
        table.rows = [{}]
        if(schema.items) {
          table.requiredFields = schema.items.required;
          const properties = schema.items.properties
          Object.keys(properties).forEach(key => {
            // For each column, we need [field: string]: {name: string, title: string, type: string, format?: string}
            // console.log('schema property:', properties[key])
            table.columns[key] = {...properties[key]}
            if(schema.items.required && schema.items.required.includes(key))
              table.columns[key].required = true;

            // For each row, we need { value: }
            table.rows[0][key] = this.generateDummyData(properties[key].type)
          })
        }
        else if(schema.properties) {
          table.requiredFields = schema.required;
          Object.keys(schema.properties).forEach(key => {
            // For each column, we need [field: string]: {name: string, title: string, type: string, format?: string}
            // console.log('schema property:', schema.properties[key])
            table.columns[key] = {...schema.properties[key]}
            if(schema.required && schema.required.includes(key))
              table.columns[key].required = true;

            // For each row, we need { [column]: value }
            table.rows[0][key] = this.generateDummyData(schema.properties[key].type)
          })
        }
        else {
          // console.log('schema does not have any properties')
        }
        tables.push(table)
      // } catch (error) {
      //   console.log('error while iterating paths:', error)
      //   tables.push(table);
      // }
    })

    return tables;
  }

  resetTable = (table: ODCTable, schema: any) => {
    table.rows = [{}]

    // get to the table's rows
    if(schema.items) {
      const properties = schema.items.properties
      Object.keys(properties).forEach(key => {
        table.rows[0][key] = this.generateDummyData(properties[key].type)
      })
    }
    else if(schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        table.rows[0][key] = this.generateDummyData(schema.properties[key].type)
      })
    }
    else {
      // console.log('schema does not have any properties')
    }
    return table;
  }

  generateDummyData = (datatype: NonArraySchemaObjectType | ArraySchemaObjectType) => { // make bool
    switch(datatype) {
      case "string":
        return "string";
      case "number": case "integer":
        return 0
      case "boolean":
        return true;
      case "object":
        return JSON.stringify({ first: "input", second: "input" })
      case "array":
        return ["array", "of", "items"].toString()
      default:
        return "";
    }
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
