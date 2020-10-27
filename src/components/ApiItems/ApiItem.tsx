import React from 'react'
import { Divider, HTMLTable, Tag } from '@blueprintjs/core'
import Table from '../table/Table'
import { simpleColumns } from '../../mocks/table'
import StyledApiItem from './api-items.styled'
import IApiItem from '../../types/ApiItem';

interface ApiItemProps {
  apiItem: IApiItem
}

const ApiItem: React.FC<ApiItemProps> = ({
  apiItem,
}) => {


  return (
    <StyledApiItem>
      {/* Left side: Api Info, Table Display, Params */}
      <div className="api-item-left">
        <h3 className="section-header-title">{apiItem.title}</h3>
        {apiItem.description && <p className="section-header-description">{apiItem.description}</p>}

        {apiItem.parameters && apiItem.parameters.length > 0 && (
          <div className="query-parameters">
            <div className="subsection-header">
              <h6 className="subsection-header-title">query parameters</h6>
              <Divider className="mh-0" />
            </div>
            {/* Display the query parameters */}
            {/* HTMLTable: Field, Type */}
            <HTMLTable
              className="api-item-html-table"
              bordered
            >
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Data Type</th>
                </tr>
              </thead>
              <tbody>
                {apiItem.parameters.map((parameter, index) => (
                  <tr key={index}>
                    <td className="parameter-name-column">
                      <span>{parameter.name}</span>
                      {parameter.required && (
                        <span className="required-text">required</span>
                      )}
                    </td>
                    <td className="parameter-datatype-column">
                      <span>{parameter.type}</span>
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
          <h3 className="section-header-title small-title">Responses</h3>
          <div className="subsection-header">
            <h6 className="subsection-header-title">response schema</h6>
            <Divider className="mh-0" />
          </div>
          <div className="api-responses-innner">
            <p>Responses Here!!</p>
            <div className="table-container">
              <Table
                numRows={3}
                columns={simpleColumns}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Visualizations, downloads(?), what else? */}
      <div className="api-item-right">
        <div className="api-method-item">
          <Tag
            htmlTitle={apiItem.endpoint.http}
            intent="success"
            className="endpoint-http-text"
          >
            {apiItem.endpoint.http}
          </Tag>
          <span className="endpoint-path-text">{apiItem.endpoint.path}</span>
        </div>

        <h3 className="response-header">Response Samples</h3>

        <div className="response-visualizations">
          <div className="helper-toolbar">
            {/* Copy, Expand All, Collapse All, etc. */}
          </div>
          <div className="response-result">
            {/* Show the code */}
            <div className="table-container">
              <Table
                numRows={3}
                columns={simpleColumns}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledApiItem>
  )
}

export default ApiItem
