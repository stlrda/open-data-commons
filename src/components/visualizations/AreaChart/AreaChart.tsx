import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export interface AreaChartVizProps {
  data: any
  height?: number
  width?: number
}

const ComposedChartViz: React.FC<AreaChartVizProps> = ({
  data,
  height=500,
  width=500,
}) => {

  return (
    <AreaChart
      height={height}
      width={width}
      data={data}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
    </AreaChart>
  )
}

export default ComposedChartViz
