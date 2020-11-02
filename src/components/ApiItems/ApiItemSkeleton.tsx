import React from 'react'
import { Divider, HTMLTable, Tag, Classes } from '@blueprintjs/core'
import Table from '../table/Table'
import { simpleColumns } from '../../mocks/table'
import StyledApiItem from './api-items.styled'

interface ApiItemProps {}

const ApiItemSkeleton: React.FC<ApiItemProps> = () => {


  return (
    <StyledApiItem>
      {/* Left side: Api Info, Table Display, Params */}
      <div className="api-item-left">
        <h3 className={`section-header-title ${Classes.SKELETON}`}>An example title</h3>
        <p className={`section-header-description ${Classes.SKELETON}`}>An example api item description</p>

          <div className="query-parameters">
            <div className="subsection-header">
              <h6 className={`subsection-header-title ${Classes.SKELETON}`}>query parameters</h6>
              {/* <Divider className="mh-0" /> */}
            </div>
            {/* Display the query parameters */}
            {/* HTMLTable: Field, Type */}
            <HTMLTable
              className={`api-item-html-table ${Classes.SKELETON}`}
              bordered
            >
              <thead>
                <tr>
                  <th className={Classes.SKELETON}>Field</th>
                  <th className={Classes.SKELETON}>Data Type</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className="parameter-name-column">
                      <span className={Classes.SKELETON}>param name</span>
                    </td>
                    <td className="parameter-datatype-column">
                      <span className={Classes.SKELETON}>param type</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="parameter-name-column">
                      <span className={Classes.SKELETON}>param name</span>
                    </td>
                    <td className="parameter-datatype-column">
                      <span className={Classes.SKELETON}>param type</span>
                    </td>
                  </tr>
              </tbody>
            </HTMLTable>
          </div>

        {/* Response Section */}
        <div className="api-responses">
          <h3 className={`section-header-title small-title ${Classes.SKELETON}`}>Responses</h3>
          <div className="subsection-header">
            <h6 className={`subsection-header-title ${Classes.SKELETON}`}>response schema</h6>
            {/* <Divider className="mh-0" /> */}
          </div>
          <div className="api-responses-innner">
            {/* <p>Responses Here!!</p> */}
            <div className={`table-container ${Classes.SKELETON}`}>
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
            htmlTitle="Loading"
            intent="success"
            className={`endpoint-http-text ${Classes.SKELETON}`}
          >
            Load
          </Tag>
          <span className={`endpoint-path-text ${Classes.SKELETON}`}>example/loading/path/api</span>
        </div>

        <h3 className={`response-header ${Classes.SKELETON}`}>Response Samples</h3>

        <div className="response-visualizations">
          <div className="helper-toolbar">
            {/* Copy, Expand All, Collapse All, etc. */}
          </div>
          <div className="response-result">
            {/* Show the code */}
            <div className={`table-container ${Classes.SKELETON}`}>
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

export default ApiItemSkeleton
