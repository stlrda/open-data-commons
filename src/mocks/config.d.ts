export declare namespace DataCommonsConfig {
  interface Config {
    globalExcludes?: string[] // endpoints to exclude from visualizing
    queries: {
      [queryId: string]: Query[]
    },
    responses: {
      [responseId: string]: Response[]
    }
    formats: {
      [formatType: string]: Format
    }
  }

  interface Query {
    format: string
    default?: any
    field?: string
    description?: string
  }

  interface Format {
    type: string
    min?: any // string | number
    max?: any // string | number
    default?: any // string | number | string[] | ...
    description?: string
    options?: string[]
  }

  interface Response {
    field: string
    format?: string
    min?: any
    max?: any
    identifier?: boolean
    numericCategory?: boolean
    discrete?: boolean
    exclude?: boolean
    description?: string
    category?: boolean
    charts?: string[]
  }

  // interface ResponseOptions {
  //   fields?: string[]
  //   excludeFromViz?: string[]
  // }
}
