import React, { useState, useEffect } from 'react'

interface ParserProps {
  swaggerUrl: string
}

const Parser: React.FC<ParserProps> = ({
  swaggerUrl
}) => {
  const [parsedData, setParsedData] = useState<any>([])

  useEffect(() => {
    console.log('swagger url:', swaggerUrl)
  }, [swaggerUrl])

  return (
    <div>
      <p>Parser for url: {swaggerUrl}</p>
    </div>
  )
}
