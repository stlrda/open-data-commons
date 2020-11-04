import React from 'react'
import { Divider, HTMLTable, Tag } from '@blueprintjs/core'
import Table from '../table/Table'
// import { simpleColumns } from '../../mocks/table'
import StyledApiItem from './api-items.styled'
import IApiItem from '../../types/ApiItem'

interface ApiItemProps {
  http: string
  method: any // add types
  endpoint: string
  // apiItem: IApiItem
}

const ApiItem: React.FC<ApiItemProps> = ({ http, method, endpoint }) => {

  const getTableColumns = () => {
    // will only get the first response for now
    console.log('method:', method)
    const schema = method.responses[0].content["application/json"].schema
    console.log('schema:', schema)

    let columns: any[] = []

    if(schema.items) {
      // an array of items
      for(let property in schema.items.properties) {
        let schemaItem = schema.items.properties[property]
        schemaItem.name = property;
        // console.log('property key:', property, 'property value:', schemaItem)
        columns.push(schemaItem)
      }
    }
    else {
      // a single item with 'properties'
      if(schema.properties) {
        // iterate over properties, adding each one to columns as an object
        for(let property in schema.properties) {
          let propertyItem = schema.properties[property]
          propertyItem.name = property;
          // console.log('property key:', property, 'property value:', propertyItem)
          columns.push(propertyItem)
        }
      }
      else {
        console.log('No properties were supplied for this schema. This is likely an error')
      }
    }
    console.log('columns returning from getTableColumns():', columns);

    return columns;
  }

  // TODO: test for schema objects with "items" that are an array
  // TODO: test with a more robust openapi.json spec to verify edge cases
  return (
    <StyledApiItem id={method.operationId}>
      {/* Left side: Api Info, Table Display, Params */}
      <div className="api-item-left">
        <h3 className="section-header-title">{method.summary}</h3>
        {method.description && <p className="section-header-description">{method.description}</p>}

        {method.parameters && method.parameters.length > 0 && (
          <div className="query-parameters">
            <div className="subsection-header">
              <h6 className="subsection-header-title">query parameters</h6>
              <Divider className="mh-0" />
            </div>
            {/* Display the query parameters */}
            {/* HTMLTable: Field, Type */}
            <HTMLTable className="api-item-html-table" bordered>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Data Type</th>
                </tr>
              </thead>
              <tbody>
                {method.parameters.map((parameter: any, index: number) => (
                  <tr key={index}>
                    <td className="parameter-name-column">
                      <span>{parameter.name}</span>
                      {parameter.required && <span className="required-text">required</span>}
                    </td>
                    <td className="parameter-datatype-column">
                      <span>
                        {parameter.schema.type}{' '}
                        {parameter.schema.title && `(${parameter.schema.title})`}
                      </span>
                      {parameter.defaultValue && (
                        <div className="default-value-container">
                          <span>Default: &nbsp;</span>
                          <span>
                            <code>{parameter.defaultValue}</code>
                          </span>
                        </div>
                      )}
                      {/* <Divider /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </HTMLTable>
          </div>
        )}

        {/* Response Section */}
        <div className="api-responses">
          <h3 className="section-header-title small-title">
            <span>Responses</span>
            {method.responses && (
              <div className="method-responses">
                {method.responses.map((response: any) => (
                  <Tag
                    key={response.code}
                    className="method-response-tag"
                    htmlTitle={response.code}
                    intent={response.code < 400 ? 'success' : 'danger'}
                  >
                    {response.code}
                  </Tag>
                ))}
              </div>
            )}
          </h3>
          <div className="subsection-header">
            <h6 className="subsection-header-title">response schema</h6>
            <Divider className="mh-0" />
          </div>
          <div className="api-responses-innner">
            <div className="table-container">
              <Table
                numRows={3}
                columns={getTableColumns()}
                // columns={simpleColumns}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Visualizations, downloads(?), what else? */}
      <div className="api-item-right">
        <div className="api-method-item">
          <Tag htmlTitle={http} intent="success" className="endpoint-http-text">
            {http}
          </Tag>
          <span className="endpoint-path-text">{endpoint}</span>
        </div>

        <h3 className="response-header">Response Samples</h3>

        <div className="response-visualizations">
          <div className="helper-toolbar">{/* Copy, Expand All, Collapse All, etc. */}</div>
          <div className="response-result">
            {/* Show the code */}
            <div className="table-container">
              {/* <Table numRows={3} columns={} /> */}
            </div>
          </div>
        </div>
      </div>
    </StyledApiItem>
  )
}

export default ApiItem
