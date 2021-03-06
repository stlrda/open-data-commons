import React, { useState, useEffect, useContext } from 'react'
import ApiParser from './ApiParser'

import { SpecContext } from '../../context/SpecContext'
import { Types } from '../../context/AppReducer'

interface ParserProps {
  swaggerUrl: string
  updateSwaggerData(data: any): void
}

const Parser: React.FC<ParserProps> = ({
  swaggerUrl,
  updateSwaggerData
}) => {
  let apiParser: ApiParser;

  const [parsedData, setParsedData] = useState<any | null>(null)
  const [errors, setErrors] = useState<string | null>(null)

  const { state, dispatch } = useContext(SpecContext)

  useEffect(() => {
    console.log('swagger url:', swaggerUrl)

    handleSwaggerUrl(swaggerUrl)
  }, [swaggerUrl])

  useEffect(() => {
    if(parsedData) {
      // TO Print to Console
      console.log('parsed data value:', JSON.stringify(parsedData))
      // Check if already exists before updating
      dispatch({
        type: Types.UPDATE,
        payload: parsedData
      })
    }
    if(parsedData) {
      console.log('parsed data value:', JSON.stringify(parsedData))
      updateSwaggerData(parsedData)
    }
  }, [parsedData, updateSwaggerData])

  const handleSwaggerUrl = async (url: string) => {
    const previousUrl = localStorage.getItem("openapi_url")
    if(previousUrl && previousUrl === url) {
      console.log('it is an exact match! rehydrate the state')
      const previousSpec = localStorage.getItem("openapi_schema")
      console.log("rehydrated data:", previousSpec)
      setParsedData(previousSpec)
      if(errors) setErrors(null)
    }
    else {
      apiParser = new ApiParser(swaggerUrl)
      const response: any = await apiParser.getSwaggerJson();
      if(response.error) {
        console.log('error getting swagger file:', response.message)
        setErrors(response.error)
      }
      else {
        console.log('successfully went through')
        localStorage.setItem('openapi_url', JSON.stringify(url))
        localStorage.setItem('openapi_schema', JSON.stringify(response))
        setParsedData(response)
        if(errors) setErrors(null)
      }
    }
  }

  return (
    <div>
      <p style={{marginBottom:0}}>Parser for url: <a href={swaggerUrl} target="_blank" rel="noreferrer">{swaggerUrl}</a></p>
      {parsedData && (
        <p>
          Parsed Swagger Schema Keys:
          <br/>
          {Object.keys(parsedData).map((key, index) => <span key={index}>- {key},<br/></span>)}
        </p>
      )}
    </div>
  )
}

export default Parser;
