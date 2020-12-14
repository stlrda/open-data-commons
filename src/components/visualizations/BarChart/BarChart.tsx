import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

export interface BarChartVizProps {
  width: number | string
  height: number | string
  chartData: {
    // [fieldName: string]: {
    value: any
    name?: string
    type?: string
    // }
  }
}

const BarChartViz: React.FC<BarChartVizProps> = ({ width, height, chartData, ...props }) => {
  const barFillColor = '#8884d8'
  const dataKey = "value"

  if (!chartData) return <CircularProgress />

  return (
    // <ResponsiveContainer width={width} height={height}>
    // @ts-ignore
    <BarChart width={width} height={height} data={chartData.value} {...props}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis />
      <YAxis dataKey={dataKey} />
      <Tooltip />
      <Legend />
      {/* {chartData["lon"].map((item: number, index: number) => ( */}
      <Bar dataKey={dataKey} fill={barFillColor} />
      {/* ))} */}
    </BarChart>
    // </ResponsiveContainer>
  )
}

export default BarChartViz
