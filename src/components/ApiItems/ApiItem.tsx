import React, { useState } from 'react'
import { Divider, HTMLTable, Tag, EditableText, Button } from '@blueprintjs/core'
import Table from '../table/Table'
import ApiRequestService from '../../services/ApiRequest'
import StyledApiItem from './api-item.styled'
// types
import IApiItem from '../../types/ApiItem'
import { ODCTable } from '../../services/OpenapiFormatter'

interface IParametersForm {
  [field: string]: any // string | boolean | number | undefined
}
interface FormErrors {
  [field: string]: string
}

interface ApiItemProps {
  http: string
  method: any // add types
  endpoint: string
  table: ODCTable
  // apiItem: IApiItem
}

const ApiItem: React.FC<ApiItemProps> = ({
  http,
  method,
  endpoint,
  table
}) => {
  const ApiRequest = new ApiRequestService(endpoint)

  const [parameters, setParameters] = useState<IParametersForm>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (value: any, field: string) => {
    setParameters({...parameters, [field]: value})
  }

  const validateInput = (field: string, type: string) => { // enum
    // onConfirm
    console.log('input confirmed:', parameters[field], 'as type:', type)
    if(type === 'integer') {
      try {
        let number = parseInt(parameters[field]);
        if(number) {
          console.log('number:', number)
          if(errors[field])
            removeError(field)
        }
        else throw new Error("Could not parse number")
      } catch (error) {
        console.log('error parsing input:', error)
        addError(field, error)
      }
    }
  }

  const clearForm = () => {
    setParameters({})
  }

  const submitForm = async () => {
    const { columns } = table;
    if(!columns) {
      alert('no response to show')
      return;
    }
    setLoading(true)
    console.log('submitting data:', parameters)
    // send api call
    const response = await ApiRequest.callApi()
    console.log('api response in ApiItem:', response)

    // Get Column Fields, Iterate
    // const columnFields = Object.keys(columns)
    for(let field in response) {
      console.log('response field:', field)
      console.log('response data:', response[field])
      // TODO: allow table for multi-rows
      if(table.columns[field]) {
        table.rows[0][field] = response[field];
      }
    }
    // for(let field in columns) {

    // }
    // .map((columnKey, index) => (
    //   <Column
    //     key={index}
    //     //@ts-ignore
    //     name={columns[columnKey].name}
    //     //@ts-ignore
    //     cellRenderer={(row, col) => cellRenderer(col, columns[columnKey].type)}
    //   />
    // ))}
      // Populate them with the response data


    setLoading(false)
  }

  const addError = (field: string, message: string) => {
    setErrors({...errors, [field]: message})
  }

  const removeError = (field: string) => {
    let tempErrors = Object.assign({}, errors)
    delete tempErrors[field]
    setErrors(tempErrors)
  }

  // TODO: test for schema objects with "items" that are an array
  // TODO: test with a more robust openapi.json spec to verify edge cases
  return (
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
                  <th>Data Input</th>
                  {/* <th>Data Type</th> */}
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
                        <EditableText
                          alwaysRenderInput={true}
                          intent={errors[index] ? "danger" : "none"}
                          // maxLength={this.state.maxLength}
                          placeholder={`${parameter.schema.type} ${parameter.schema.title ? `(${parameter.schema.title})` : ""}`}
                          selectAllOnFocus={true}
                          value={parameters[parameter.name] || ""}
                          onChange={(data) => handleChange(data, parameter.name)}
                          onConfirm={() => validateInput(parameter.name, parameter.schema.type)}
                        />
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
                // icon=""
                // intent="success"
                text="Clear"
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
              {/* <Button
                className="api-execute-button"
                // icon=""
                // intent="success"
                text="Clear"
                onClick={clearForm}
              /> */}
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
              {table ? (
                <Table
                  numRows={table.rows.length}
                  columns={table.columns}
                  rows={table.rows}
                  id={table.id}
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
  )
}

export default ApiItem
