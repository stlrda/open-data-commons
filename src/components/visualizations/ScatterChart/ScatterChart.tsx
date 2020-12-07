import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from "recharts"

import scatterChartData from './data.scatterchart'

export interface ScatterChartVizProps {
  data: any
  data2?: any
  height?: number
  width?: number
}

const ScatterChartViz: React.FC<ScatterChartVizProps> = ({
  data,
  data2,
  height=500,
  width=730,
}) => {

  return (
    <ScatterChart
      height={height}
      width={width}
      // data={data}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="stature" unit="cm" />
      <YAxis type="number" dataKey="y" name="weight" unit="kg" />
      <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="A school" data={data} fill="#8884d8" />
      {data2 && (
        <Scatter name="B school" data={data2} fill="#82ca9d" />
      )}
    </ScatterChart>
  )
}

export default ScatterChartViz;
