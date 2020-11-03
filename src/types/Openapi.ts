/**
 * UI Type Definitions for Openapi.
 * Extends previously configured openapi, for use in this project
 */

import { OpenAPIV3, OpenAPIV2 } from 'openapi-types'

export interface ODCNavRoute {
  http: string // or enum
  summary: string
  operationId: string
}
