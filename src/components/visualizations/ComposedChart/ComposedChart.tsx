import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';

export interface ComposedChartVizProps {
  data: any
  height?: number
  width?: number
}

const ComposedChartViz: React.FC<ComposedChartVizProps> = ({
  data,
  height=500,
  width=500,
}) => {

  return (
    <ComposedChart
      height={height}
      width={width}
      data={data}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </ComposedChart>
  )
}

export default ComposedChartViz
