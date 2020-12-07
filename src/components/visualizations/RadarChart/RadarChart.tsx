import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';


export interface RadarChartVizProps {
  data: any
  height?: number
  width?: number
}

const RadarChartViz: React.FC<RadarChartVizProps> = ({
  data,
  height=500,
  width=500,
}) => {

  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={width} height={height} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
}

export default RadarChartViz;
