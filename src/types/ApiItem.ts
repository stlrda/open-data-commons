/* eslint-disable no-unused-vars */


interface ApiItem {
  id: string
  title: string
  description?: string
  endpoint: {
    http: string // make enum 'GET', 'POST', 'PUT', 'DELETE', etc.
    path: string // i.e. /crime/legacy/nbhood
    website: string // "https://api.stldata.org/crime/legacy/nbhood"
  }
  parameters: ApiItemParameter[]
  responses: ApiItemResponse[]
}

interface ApiItemParameter {
  name: string
  type: string // make Enum
  required?: boolean
  defaultValue?: any // string, number, array, object, etc.
}

interface ApiItemResponse {
  code: number
  message: string
  complex?: boolean
  complexType?: ComplexTypeEnum
  schema: ApiItemResponseSchemaItem[]
  // TEMPORARY types for ui dev only
  placeholderText?: any
  placeholderDescription?: any
}

interface ApiItemResponseSchemaItem {
  name: string
  type: string // Enum eventually
  subtype?: string // i.e. "date", etc.
  required?: boolean
}

export default ApiItem;

export type {
  ApiItemParameter,
  ApiItemResponse,
  ApiItemResponseSchemaItem,
}

// Type Enums, still work in progress
export enum ComplexTypeEnum {
  ARRAY = "array",
  OBJECT = "object",
  FUNCTION = "function",
}

export enum PrimitiveTypeEnum {
  NUMBER = "number",
  STRING = "string",
  BOOLEAN = "boolean",
  BIGINT = "bigint",
  SYMBOL = "symbol",
  // UNDEFINED = "undefined",
  // NULL = "null",
}
