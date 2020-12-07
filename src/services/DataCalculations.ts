import { ODCTable } from './OpenapiFormatter'

// should work for any visualization supplied
interface IDataVizResponse {
  name: string
  value: any // number, array of numbers, ...
  type: string
}
interface IDataShape {
  name: string // id
  type: string // "string" | "number" | "boolean" | "other"
}
interface IDataValue {
  [fieldName: string]: any // key: value
}

class DataCalculations {
  data?: ODCTable;


  constructor(dataset?: ODCTable) {
    if(dataset)
      this.data = dataset;
  }

  // returns array of DataVizResponse's
  getDataShape() {
    let responses: IDataShape[] = []

    Object.keys(this.data!.columns).forEach(columnKey => {
      let column = this.data!.columns[columnKey]

      let response: IDataShape = {
        name: columnKey,
        type: column.type
      }

      responses.push(response)
    })

    return responses;
  }

  // for each column, extract the information from the data.rows array
  getDataValues() {
    let responses: IDataValue = {}

    let dataValues: IDataValue = {};

    let dataShape = this.getDataShape();

    dataShape.forEach(column => {
      console.log('column:', column)
      if(!this.data!.rows) return { name: column.name, value: 0 }
      dataValues[column.name] = this.data!.rows.map(row => {
        if(!row) return {name: column.name, value: 0}
        return {
          name: column.name,
          value: row[column.name] ? row[column.name] : 0
        }
      })
    })

    // map through columns, with type (or data shapes)
    // calculate value based on type for each column type
    dataShape.forEach(column => {
      let value: any;

      switch(column.type) {
        case "string":
          // value = this.getStringOccurences(dataValues[column.name]);
          // value = [{name: column.name, value: dataValues[column.name] }]
          value = dataValues[column.name]
          break;
        case "number": case "integer": case "float": case "double": case "long":
          // value = this.getNumericDistribution(dataValues[column.name]);
          value = dataValues[column.name]
          break;
        case "boolean":
          // value = dataValues[column.name]
          value = [{name: column.name, value: dataValues[column.name] }]
          break;
        // ...other types
        default:
          console.log('unidentified column type:', column.type)
          // value = dataValues[column.name] || undefined;
          value = [{name: column.name, value: 15 }]
      }

      responses[column.name] = {
        name: column.name,
        type: column.type,
        value
      } as IDataVizResponse
    })

    return responses
  }

  // results.unique = # unique occurences = Object.keys(results).length
  // results[field] = # occurences for field
  getStringOccurences(data: any[]) {
    let results: IDataValue = {}

    data.forEach(item => {
      if(results[item.value]) {
        results[item.value] = results[item.value] + 1;
      }
      else
        results[item.value] = 1;
    })

    let uniqueValues = Object.keys(results).length;
    results.unique = uniqueValues

    // console.log('results:', results)

    return results
  }

  getNumericDistribution(data: any[]) {
    let results: IDataValue = {}

    data.forEach(item => {
      if(results[item.value]) {
        results[item.value] = results[item.value] + 1;
      }
      else
        results[item.value] = 1;
    })

    let uniqueValues = Object.keys(results).length;
    results.unique = uniqueValues

    // console.log('results:', results)

    return results
  }
}

export default DataCalculations
