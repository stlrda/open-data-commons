import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export interface LineChartVizProps {
  data: any
  height?: number
  width?: number
}

const LineChartViz: React.FC<LineChartVizProps> = ({
  data,
  height=500,
  width=500,
}) => {
  const chartOptions = {
    colors: ["#8884d8", "#82ca9d"],
    lineType: "monotone",
    strokeDashArray: "3 3"
  }

  return (
    <LineChart
      height={height}
      width={width}
      data={data}
      margin={{top: 5, right: 5, bottom: 5, left: 5}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  )
}

export default LineChartViz;
