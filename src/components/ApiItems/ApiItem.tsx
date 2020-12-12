import React, { useState } from 'react'
import moment from 'moment'
import { Divider, HTMLTable, Tag, EditableText, Button, ButtonGroup, Collapse, HTMLSelect, Tooltip, Position, Icon } from '@blueprintjs/core'
import { DateInput, IDateFormatProps, TimePicker, ITimePickerProps } from '@blueprintjs/datetime'
import TextInput from '../FormInputs/TextInput'
import NumericInput from '../FormInputs/NumericInput'
import Table from '../table/Table'
import { DataCommonsConfig } from '../../mocks/config2'
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
  config?: DataCommonsConfig.ApiItemConfig
  formats?: DataCommonsConfig.Formats
  updateTableData(data: any, tableId: string): void
  resetTableRows(id: string): void
  showFullscreenTable(tableId: string): void
  showFullscreenViz(tableId: string): void
  // apiItem: IApiItem
}

const maxResponses = 5
const cellHeight = 20; // px
const maxVisibleCells = 15;

// const jsDateFormatter: IDateFormatProps = {
//   formatDate: date => date.toLocaleDateString(),
//   parseDate: str => new Date(str),
//   placeholder: "YYYY-MM-DD"
// }

const ApiItem: React.FC<ApiItemProps> = ({
  http,
  method,
  endpoint,
  table,
  config,
  formats,
  updateTableData,
  resetTableRows,
  showFullscreenTable,
  showFullscreenViz,
}) => {
  // NOTE: could calculate the default parameters and paths in ApiItems, and pass as props...
  const [parameters, setParameters] = useState<IParametersForm>({})
  const [paths, setPaths] = useState<IParametersForm>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [responses, setResponses] = useState<ResponseItem[]>([])
  const [openResults, setOpenResults] = useState<number[]>([])
  const [startQuery, setStartQuery] = useState<boolean>(false)

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
    } else console.log('data is invalid. errors:', errors)

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

  const momentFormatter = (format: string): IDateFormatProps => {
    return {
      formatDate: date => moment(date).format(format),
      parseDate: str => moment(str, format).toDate(),
      placeholder: format
    }
  }

  // Can have 2 separate functions, one for parameter that is in "path", one for parameter in "query"
  const getFormInput = (parameter: any, index: number) => {
    let queryData = config!.queries![index]
    let formatData = formats![queryData.format]

    // console.log('format data:', formatData)

    if(formatData.options) {
      if(parameter.in === "path") {
        if(!paths[parameter.name]) {
          if(queryData.default) setPaths({...paths, [parameter.name]: queryData.default})
          else if(formatData.default) setPaths({...paths, [parameter.name]: formatData.default})
          else setPaths({...paths, [parameter.name]: formatData.options[0]})
        }
        // return select item
        return (
          <HTMLSelect
            value={paths[parameter.name] || "none yet"}
            onChange={(event) => {
              let value = event.currentTarget.value;
              handleChangePath(value, parameter.name)
            }}
          >
            {formatData.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </HTMLSelect>
        )
      }
      if(!parameters[parameter.name]) {
        if(queryData.default) setParameters({...parameters, [parameter.name]: queryData.default})
        else if(formatData.default) setParameters({...parameters, [parameter.name]: formatData.default})
        else setParameters({...parameters, [parameter.name]: formatData.options[0]})
      }
      // return select item
      return (
        <HTMLSelect
          value={parameters[parameter.name] || "none yet"}
          onChange={(event) => {
            let value = event.currentTarget.value;
            handleChange(value, parameter.name)
          }}
        >
          {formatData.options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </HTMLSelect>
      )
    }

    let dateStringFormat = "YYYY-MM-DD" // the default format

    const isPath = parameter.in === "path" ? true : false

    switch(formatData.type) {
      case "number": {
        if(isPath && !paths[parameter.name]) {
          if(queryData.default) handleChangePath(queryData.default, parameter.name)
          else if (formatData.default) handleChangePath(formatData.default, parameter.name)
        }
        else if(!parameters[parameter.name]) {
          if(queryData.default) handleChange(queryData.default, parameter.name)
          else if (formatData.default) handleChange(formatData.default, parameter.name)
        }

        let value = isPath ? paths[parameter.name] : parameters[parameter.name]
        let changeMethod = isPath ? handleChangePath : handleChange

        return (
          <NumericInput
            isPath={isPath}
            parameterName={parameter.name}
            // style={{margin: 0}}
            min={formatData.min || undefined}
            max={formatData.max || undefined}
            placeholder="Enter a number..."
            value={value || queryData.default || formatData.default || 0}
            onValueChange={changeMethod}
          />
        )
      }
      case "date":
        if(formatData.dateFormatString)
          dateStringFormat = formatData.dateFormatString

        if(parameter.in === "path") {
          if(!paths[parameter.name]) {
            if(queryData.default) handleChangePath(queryData.default, parameter.name)
            else if (formatData.default) handleChangePath(formatData.default, parameter.name)
          }
          return (
            <DateInput
              {...momentFormatter(dateStringFormat)}
              placeholder={formatData.description || "Date"}
              minDate={formatData.min ? moment(formatData.min).toDate() : undefined}
              maxDate={formatData.max ? moment(formatData.max).toDate() : undefined}
              value={(paths[parameter.name] && moment(paths[parameter.name]).toDate()) || moment().toDate()}
              onChange={(data, isUserChange) => {
                let dateString = moment(data).format(dateStringFormat)
                handleChangePath(dateString, parameter.name)
              }}
            />
          )
        }

        if(!parameters[parameter.name]) {
          if(queryData.default) handleChange(queryData.default, parameter.name)
          else if (formatData.default) handleChange(formatData.default, parameter.name)
        }

        return (
          <DateInput
            {...momentFormatter(dateStringFormat)}
            placeholder={formatData.description || "Date"}
            minDate={formatData.min ? moment(formatData.min).toDate() : undefined}
            maxDate={formatData.max ? moment(formatData.max).toDate() : undefined}
            value={(parameters[parameter.name] && moment(parameters[parameter.name]).toDate()) || moment().toDate()}
            onChange={(data, isUserChange) => {
              let dateString = moment(data).format(dateStringFormat)
              handleChange(dateString, parameter.name)
            }}
          />
        )
      case "time":
        if(parameter.in === "path") {
          if(!paths[parameter.name]) {
            if(queryData.default) handleChangePath(queryData.default, parameter.name)
            else if(formatData.default) handleChangePath(formatData.default, parameter.name)
          }
          return (
            <TimePicker
              precision="second"
              showArrowButtons
              useAmPm={false}
              value={(parameters[parameter.name] && moment(parameters[parameter.name]).toDate()) || moment().toDate()}
              onChange={(data) => {
                // console.log('time change data:', data)
                handleChange(data, parameter.name)
              }}
            />
          )
        }

        if(!parameters[parameter.name]) {
          if(queryData.default) handleChange(queryData.default, parameter.name)
          else if(formatData.default) handleChange(formatData.default, parameter.name)
        }

        return (
          <TimePicker
            precision="second"
            showArrowButtons
            useAmPm={false}
            value={(parameters[parameter.name] && moment(parameters[parameter.name]).toDate()) || moment().toDate()}
            onChange={(data) => {
              // console.log('time change data:', data)
              handleChange(data, parameter.name)
            }}
          />
        )
      case "string":
      default: {
        const value = isPath ? paths[parameter.name] || queryData.default || formatData.default || ''
          : parameters[parameter.name] || queryData.default || formatData.default || ''
        const changeMethod = isPath ? handleChangePath : handleChange;
        return (
          <TextInput
            isPath={isPath}
            parameter={parameter}
            intent={errors[parameter.name] ? "danger" : "none"}
            placeholder={`${parameter.schema.type} ${
              parameter.schema.title ? `(${parameter.schema.title})` : ''
            }`}
            value={value}
            onChange={changeMethod}
            validateInput={validateInput}
          />
        )
      }
    }
  }

  // TODO: test for schema objects with "items" that are an array
  // TODO: test with a more robust openapi.json spec to verify edge cases
  return (
    <StyledApiItem id={method.operationId}>
      {/* Left side: Api Info, Table Display, Params */}
      <div className="api-item-left">
        <h2 className="section-header-title">
          <span style={{marginRight: 10}}>{method.summary}</span>
          {/* <span style={{opacity: .75, fontSize: "0.75em"}}>-</span> */}
          <span style={{opacity: .75, marginLeft: 10, marginTop: 1, marginBottom: 0, paddingBottom: 0, fontSize: "0.75em"}}>{endpoint}</span>
        </h2>
        {method.description && <p className="section-header-description">{method.description}</p>}

        {!startQuery ? (
          <div className="query-parameters">
            <Button title="Start Query" large onClick={() => setStartQuery(true)}>
              Start Query
            </Button>
          </div>
        ) : (
          <>
        {method.parameters && method.parameters.length > 0 ? (
          <div className="query-parameters">
            {/* <div className="subsection-header">
              <h6 className="subsection-header-title">query parameters</h6>
              <Divider className="mh-0" />
            </div> */}

            <h3 className="section-header-title small-title">
              <span style={{ marginRight: 6, flex: 1 }}>Queries</span>
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
            </h3>



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
                  <tr key={`${parameter.name}-${index}`}>
                    <td
                      className="parameter-name-column"
                      style={{ display: 'flex', flexDirection: 'row' }}
                    >
                      <span>{parameter.name}</span>
                      {parameter.required && <span className="required-text">*</span>}
                    </td>
                    <td className="parameter-datatype-column">
                      {config && config.queries && formats
                        ? getFormInput(parameter, index)
                        : <div
                            style={{
                              display: "inline-block",
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
                        </div>
                      }
                        {/* {parameter.schema.type}{' '}
                        {parameter.schema.title && `(${parameter.schema.title})`} */}
                      {/* </span> */}
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
            {/* <div className="api-execute-button-bar">
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
            </div> */}
          </div>
        ) : (
          <div className="query-parameters">
            {/* <div className="subsection-header">
              <h6 className="subsection-header-title">query parameters</h6>
              <Divider className="mh-0" />
            </div> */}

            <p style={{fontSize: "1.15em", marginBottom: 20}}>No query parameters</p>

            <div className="api-execute-button-bar no-params">
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
          </>
        )}



        {/* Response Section */}
        {startQuery && (
          <div className="api-responses">
            <h3 className="section-header-title small-title">
              {/* <div> */}
                <span style={{ marginRight: 6, flex: 1 }}>Responses</span>
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
              {/* </div> */}
              {/* {method.responses && (
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
              )} */}
            </h3>
            {!table || !table.columns || Object.keys(table.columns).length < 1 ? (
              <div>
                <p style={{fontSize: "1.15em", marginTop: 10}}>No responses found for this request</p>
              </div>
            ) : (
              // <>
                // {/* <div className="subsection-header">
                //   <h6 className="subsection-header-title">response schema</h6>
                //   <Divider className="mh-0" />
                // </div> */}
                <div className="api-responses-innner">
                  <div className="table-container" style={{
                    height: `calc(22px * ${table.rows.length < maxVisibleCells ? table.rows.length : maxVisibleCells} + 40px)`, // props.cellHeight * props.maxVisibleCells
                  }}>
                    <Table
                      numRows={table.rows.length}
                      columns={table.columns}
                      rows={table.rows}
                      id={table.id}
                    />
                  </div>
                </div>
              // </>
            )}
          </div>
      )}
        </div>

      {/* Right side: Visualizations, downloads(?), what else? */}
      <div className="api-item-right">
        {/* <div className="api-method-item">
          <Tag htmlTitle={http} intent="success" className="endpoint-http-text">
            {http}
          </Tag>
          <span className="endpoint-path-text">{endpoint}</span>
        </div> */}

        {/* <h3 className="response-header">Statistical Information */}
          {/* {responses.length > 0 && (
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
          )} */}
        {/* </h3> */}

        <div className="response-visualizations">
          <div className="helper-toolbar">{/* Copy, Expand All, Collapse All, etc. */}</div>
          <div className="response-results">
            {/* {responses.length > 0 ? (
              <div>
                <p>stats: djf;lsdfjdlf</p>
              </div>
            ) : (
              <p>No data yet</p>
            )} */}
            {/* <p style={{color: "#fff"}}>still deciding...</p> */}
            {/* {responses.map((response, index) => (
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
                      </p>
                    </div>
                  </Collapse>
                </div>
              </ResponseItem_Styled>
            ))} */}
          </div>
        </div>
      </div>
    </StyledApiItem>
  )
}

export default ApiItem

// <Select
//   items={formatData.options}
//   itemRenderer={(item) => {
//     return (
//       <MenuItem
//         // active={parameters[parameter.name] === parameter.name}
//         // label="label"
//         key={item}
//         onClick={() => console.log('i clicked!')}
//         text={item}
//       />
//     )
//   }}
//   onItemSelect={handleItemSelect}
//   activeItem={parameters[parameter.name]}
//   // initialContent={formatData.options}
// >
//   <Button
//     text={parameters[parameter.name] || formatData.default || formatData.options[0]}
//     rightIcon="double-caret-vertical"
//   />
// </Select>
