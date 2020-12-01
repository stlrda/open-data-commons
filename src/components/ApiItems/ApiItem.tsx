import React, { useState } from 'react'
import { Divider, HTMLTable, Tag, EditableText, Button, ButtonGroup, Collapse } from '@blueprintjs/core'
// import { JSONFormat } from '@blueprintjs/table'
import Table from '../table/Table'
import ApiRequestService from '../../services/ApiRequest'
import FileSaverService from '../../services/FileSaver'
import StyledApiItem, { ResponseItem_Styled } from './api-item.styled'
// types
// import IApiItem from '../../types/ApiItem'
import { ODCTable } from '../../services/OpenapiFormatter'

interface IParametersForm {
  [field: string]: any // string | boolean | number | undefined
}
interface FormErrors {
  [field: string]: string
}
interface ResponseItem {
  id: number
  time: string // date string
  success: boolean
  details: string
  status?: number
}

interface ApiItemProps {
  http: string
  method: any // add types
  endpoint: string
  table: ODCTable
  updateTableData(data: any, tableId: string): void
  resetTableRows(id: string): void
  showFullscreenTable(tableId: string): void
  showFullscreenViz(tableId: string): void
  // apiItem: IApiItem
}

const maxResponses = 5
const cellHeight = 20; // px
const maxVisibleCells = 15;

const ApiItem: React.FC<ApiItemProps> = ({
  http,
  method,
  endpoint,
  table,
  updateTableData,
  resetTableRows,
  showFullscreenTable,
  showFullscreenViz,
}) => {
  const [parameters, setParameters] = useState<IParametersForm>({})
  const [paths, setPaths] = useState<IParametersForm>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [responses, setResponses] = useState<ResponseItem[]>([])
  const [openResults, setOpenResults] = useState<number[]>([])

  const handleChange = (value: any, field: string) => {
    setParameters({ ...parameters, [field]: value })
  }

  const handleChangePath = (value: any, field: string) => {
    setPaths({...paths, [field]: value})
  }

  // onConfirm
  const validateInput = (field: string, type: string, path?: boolean) => {
    // enum
    let input;
    if(path)
      input = paths[field]
    else
      input = parameters[field]
    // console.log('input confirmed:', input, 'as type:', type)
    if (input) {
      if (type === 'integer') {
        let number = parseInt(input)
        if (number) {
          // console.log('number:', number)
          if (errors[field]) removeError(field)
        } else addError(field, 'Could not parse number')
      } else if (errors[field]) removeError(field)
    }
  }

  const clearForm = () => {
    setParameters({})
    setPaths({})
    setErrors({})
  }

  const submitForm = async () => {
    setLoading(true)

    const { columns } = table
    if (!columns) {
      alert('no response to show')
      return
    }
    // console.log('parameters to be validated:', parameters)
    let valid = true
    // for each field in 'required', make sure it exists in parameters
    if (method.parameters) {
      method.parameters.forEach((parameter: any) => {
        // console.log('parameter:', parameter)
        if (parameter.required && !parameters[parameter.name] && !paths[parameter.name]) {
          // console.log(parameter.name + ' is missing from parameters')
          addError(parameter.name, `${parameter.name} is required`)
          valid = false
        }
      })
    }

    if (valid) {
      // console.log('submitting data:', parameters)
      // send api call
      const ApiRequest = new ApiRequestService(endpoint)
      let response: any;
      if(Object.keys(paths).length > 0)
        response = await ApiRequest.callApi(parameters, 'GET', Object.keys(paths).map(path => paths[path]))
      else
        response = await ApiRequest.callApi(parameters)
      // console.log('api response in ApiItem:', response)

      // Get Column Fields, Iterate
      // const columnFields = Object.keys(columns)
      if(!response.error && response.status! < 400 ) {
        Object.keys(response.data).forEach((field) => {
          // console.log('response field:', field)
          // console.log('response data:', response[field])
          // TODO: allow table for multi-rows
          if (table.columns[field]) {
            table.rows[0][field] = response.data[field]
          }
        })
      }

      updateTableData(response.data, table.id)

      // add response to response log
      if (responses.length < maxResponses) {
        setResponses([
          ...responses,
          {
            id: responses.length,
            time: new Date().toISOString(),
            status: response.status || 500,
            success: (response.error || response.status! >= 400) ? false : true, // can check for response code
            details: (response.error || response.status! >= 400) ? (response.message || response.data) : response.data,
          },
        ])
      }
      // replace response in response log with new response, it is at the max responses
      else {
        let tempResp = [...responses]
        tempResp.shift()
        setResponses([
          ...tempResp,
          {
            id: responses[responses.length - 1].id + 1,
            time: new Date().toISOString(),
            status: response.status || 500,
            success: (response.error || response.status! >= 400) ? false : true, // can check for response code
            details: (response.error || response.status! >= 400) ? (response.message || response.data) : response.data,
          },
        ])
      }
    } else console.log('data is invalid somehow. errors:', errors)

    setLoading(false)
  }

  const addError = (field: string, message: string) => {
    setErrors({ ...errors, [field]: message })
  }

  const removeError = (field: string) => {
    // console.log('removing field:', field)
    let tempErrors = Object.assign({}, errors)
    delete tempErrors[field]
    setErrors(tempErrors)
  }

  const resetResponseTable = () => {
    // reset row values with dummy data
    setResponses([])
    setOpenResults([])
    // set first row to dummy data
    resetTableRows(method.operationId)
  }

  const downloadCsv = () => {
    const filename = http + "-" + method.operationId + ".csv"
    const fileSaver = new FileSaverService();
    fileSaver.saveFile(filename, table.rows, table.columns, (error?: any) => {
      if(error) {
        alert('error downloading your file')
      }
    })
  }

  const toggleCollapse = (id: number) => {
    // open / close the collapse using the given id
    // console.log('toggling collapse')
    if(openResults.includes(id))
      setOpenResults(openResults.filter(resultId => resultId !== id))
    else
      setOpenResults([...openResults, id ])
  }

  const expandResults = () => {
    setOpenResults(responses.map(response => response.id))
  }

  const collapseResults = () => setOpenResults([])

  // TODO: test for schema objects with "items" that are an array
  // TODO: test with a more robust openapi.json spec to verify edge cases
  return (
    <StyledApiItem id={method.operationId}>
      {/* Left side: Api Info, Table Display, Params */}
      <div className="api-item-left">
        <h3 className="section-header-title">{method.summary}</h3>
        {method.description && <p className="section-header-description">{method.description}</p>}

        {method.parameters && method.parameters.length > 0 ? (
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
                  <th>Data Input</th>
                  {/* <th>Data Type</th> */}
                </tr>
              </thead>
              <tbody>
                {method.parameters.map((parameter: any, index: number) => (
                  <tr key={index}>
                    <td
                      className="parameter-name-column"
                      style={{ display: 'flex', flexDirection: 'row' }}
                    >
                      <span>{parameter.name}</span>
                      {parameter.required && <span className="required-text">*</span>}
                    </td>
                    <td className="parameter-datatype-column">
                      <span
                        style={{
                          border: errors[parameter.name] && '1px solid rgba(235,0,0,.54)',
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {parameter.in === "path" ? (
                          <EditableText
                            alwaysRenderInput={true}
                            intent={errors[parameter.name] ? 'danger' : 'none'}
                            placeholder={`(PATH): ${parameter.schema.type} ${
                              parameter.schema.title ? `(${parameter.schema.title})` : ''
                            }`}
                            selectAllOnFocus={true}
                            value={paths[parameter.name] || ''}
                            onChange={(data) => handleChangePath(data, parameter.name)}
                            onConfirm={() => validateInput(parameter.name, parameter.schema.type, true)}
                          />
                        ) : (
                          <EditableText
                            alwaysRenderInput={true}
                            intent={errors[parameter.name] ? 'danger' : 'none'}
                            placeholder={`${parameter.schema.type} ${
                              parameter.schema.title ? `(${parameter.schema.title})` : ''
                            }`}
                            selectAllOnFocus={true}
                            value={parameters[parameter.name] || ''}
                            onChange={(data) => handleChange(data, parameter.name)}
                            onConfirm={() => validateInput(parameter.name, parameter.schema.type)}
                          />
                        )}
                        {/* {parameter.schema.type}{' '}
                        {parameter.schema.title && `(${parameter.schema.title})`} */}
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

            {/* Execute Button Bar */}
            <div className="api-execute-button-bar">
              <Button
                className="api-execute-button"
                text="Clear"
                disabled={Object.keys(parameters).length < 1 && Object.keys(errors).length < 1}
                onClick={clearForm}
              />
              <Button
                className="api-execute-button"
                rightIcon="arrow-right"
                intent="success"
                text="Execute"
                onClick={submitForm}
              />
            </div>
          </div>
        ) : (
          <div className="query-parameters">
            <div className="subsection-header">
              <h6 className="subsection-header-title">query parameters</h6>
              <Divider className="mh-0" />
            </div>
            <p>No query parameters</p>
            {/* Execute Button Bar */}
            <div className="api-execute-button-bar">
              <Button
                className="api-execute-button"
                rightIcon="arrow-right"
                intent="success"
                text="Execute"
                onClick={submitForm}
              />
            </div>
          </div>
        )}

        {/* Response Section */}
        <div className="api-responses">
          <h3 className="section-header-title small-title">
            <div>
              <span style={{ marginRight: 6 }}>Responses</span>
              {responses.length > 0 ? (
                <>
                  <Button
                    className="api-execute-button"
                    rightIcon="fullscreen" // document-share
                    text="Fullscreen"
                    minimal={true}
                    onClick={() => showFullscreenTable(table.id)}
                  />
                  <Button
                    className="api-execute-button"
                    rightIcon="chart" // document-share
                    text="Visualize"
                    minimal={true}
                    onClick={() => showFullscreenViz(table.id)}
                  />
                  <Button
                    className="api-execute-button"
                    rightIcon="download"
                    text="CSV"
                    minimal={true}
                    onClick={downloadCsv}
                  />
                  <Button
                    className="api-execute-button"
                    rightIcon="refresh"
                    text="Reset"
                    minimal={true}
                    onClick={resetResponseTable}
                  />
                </>
              ) : (
                <>
                  <Button
                    disabled
                    className="api-execute-button"
                    rightIcon="fullscreen" // document-share
                    text="Fullscreen"
                    minimal={true}
                  />
                  <Button
                    disabled
                    className="api-execute-button"
                    rightIcon="chart" // document-share
                    text="Visualize"
                    minimal={true}
                  />
                  <Button
                    disabled
                    className="api-execute-button"
                    rightIcon="download"
                    text="CSV"
                    minimal={true}
                  />
                  <Button
                    disabled
                    className="api-execute-button"
                    rightIcon="refresh"
                    text="Reset"
                    minimal={true}
                  />
                </>
              )}
            </div>
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
            <div className="table-container" style={{
              height: `calc(22px * ${table.rows.length < maxVisibleCells ? table.rows.length : maxVisibleCells} + 40px)`, // props.cellHeight * props.maxVisibleCells
            }}>
              {table ? (
                <Table
                  numRows={table.rows.length}
                  columns={table.columns}
                  rows={table.rows}
                  id={table.id}
                />
              ) : (
                <p>
                  {method?.responses[0]?.code
                    ? `A successful response will return a ${method.responses[0].code} status code but no data`
                    : 'This method does not return any data'}
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

        <h3 className="response-header" style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{flex: 1}}>Response Log</span>
          {responses.length > 0 && (
            <ButtonGroup>
              <Button
                className="api-execute-button"
                rightIcon="expand-all"
                // text="Expand"
                minimal
                onClick={expandResults}
              />
              <Button
                className="api-execute-button"
                rightIcon="collapse-all"
                // text="Collapse"
                minimal
                onClick={collapseResults}
              />
            </ButtonGroup>
          )}
        </h3>

        <div className="response-visualizations">
          <div className="helper-toolbar">{/* Copy, Expand All, Collapse All, etc. */}</div>
          <div className="response-results">
            {/* <p style={{color: "#fff"}}>still deciding...</p> */}
            {responses.map((response, index) => (
              <ResponseItem_Styled key={index} className="response-result-item">
                <span className="response-result-item-index">{response.id}</span>
                <div style={{display:'flex', flexDirection:'column', alignItems:'stretch', flex: 1}}>
                  <div
                    className="response-result-item-inner"
                    onClick={() => toggleCollapse(response.id)}
                  >
                    <span style={{ flex: 1, opacity: .93 }}>{response.time}</span>
                    <span style={{opacity: .93}}>{response.success ? 'success' : 'error'}</span>
                  </div>
                  <Collapse isOpen={openResults.includes(response.id)}>
                    <div className="response-result-item-inner response-item-response">
                      <p style={{ color: '#fff', padding: 5, width: '100%', display: 'block', marginBottom: 0 }}>
                        {JSON.stringify(response.details)}
                        {/* <JSONFormat>{response.details}</JSONFormat> */}
                      </p>
                    </div>
                  </Collapse>
                </div>
              </ResponseItem_Styled>
            ))}
          </div>
        </div>
      </div>
    </StyledApiItem>
  )
}

export default ApiItem
