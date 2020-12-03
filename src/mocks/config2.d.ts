import {  } from "moment"

export declare namespace DataCommonsConfig {
  interface Config {
    globalExcludes?: string[] // endpoints to exclude from visualizing
    items: {
      [operationId: string]: ApiItemConfig
    },
    formats: Formats
  }

  interface ApiItemConfig {
    queries?: Query[]
    responses?: Response[]
  }

  interface Query {
    format: string
    default?: any
    field?: string
    description?: string
  }

  interface Formats {
    [formatType: string]: Format
  }

  interface Format {
    type: string
    min?: any // string | number
    max?: any // string | number
    default?: any // string | number | string[] | ...
    description?: string
    options?: string[]
    dateFormatString?: string // should work with moment.js, i.e "YYYY-MM-DD"
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
