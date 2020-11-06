import React from 'react'
import { Divider, HTMLTable, Tag } from '@blueprintjs/core'
import { Waypoint } from 'react-waypoint'
import Table from '../table/Table'
import StyledApiItem from './api-item.styled'
// import IApiItem from '../../types/ApiItem'

interface ApiItemProps {
  http: string
  method: any // add types
  endpoint: string
  columns?: any[]
  // apiItem: IApiItem
  onItemEnter: (operationId: string) => void
}

const ApiItem: React.FC<ApiItemProps> = ({ http, method, endpoint, columns, onItemEnter }) => {

  const handleItemEnter = (data: Waypoint.CallbackArgs) => {
    // if currentPosition === "inside", push to history and set it active
    if(data?.currentPosition === "inside") {
      // push operationId to url hash
      if(method.operationId) {
        onItemEnter(method.operationId);
      }
    }
  }

  const handleItemLeave = (data: Waypoint.CallbackArgs) => {
    console.log(endpoint + " left with waypoint")
    // if(data.)
  }

  // TODO: test for schema objects with "items" that are an array
  // TODO: test with a more robust openapi.json spec to verify edge cases
  return (
    <Waypoint
      topOffset={0}
      bottomOffset={window.innerHeight - 5}
      onEnter={(data) => handleItemEnter(data)}
      onLeave={handleItemLeave}
    >
      <StyledApiItem id={method.operationId}>
        {/* Left side: Api Info, Table Display, Params */}
        <div className="api-item-left">
          <h3 className="section-header-title">{method.summary}</h3>
          {method.description && <p className="section-header-description">{method.description}</p>}

          {(method.parameters && method.parameters.length > 0) ? (
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
                      <td className="parameter-name-column" style={{display:'flex',flexDirection:'row'}}>
                        <span>{parameter.name}</span>
                        {parameter.required && <span className="required-text">*</span>}
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
          ) : (
            <div className="query-parameters">
              <div className="subsection-header">
                <h6 className="subsection-header-title">query parameters</h6>
                <Divider className="mh-0" />
              </div>
              <p>No query parameters</p>
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
                {columns ? (
                  <Table
                    numRows={3}
                    columns={columns}
                    // columns={simpleColumns}
                  />
                ) : (
                  <p>
                    {method?.responses[0]?.code ?
                      `A successful response will return a ${method.responses[0].code} status code but no data`
                      : "This method does not return any data"}
                  </p>
                )}

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
                <p style={{color: "#fff"}}>still deciding...</p>
              </div>
            </div>
          </div>
        </div>
      </StyledApiItem>
    </Waypoint>
  )
}

export default ApiItem
