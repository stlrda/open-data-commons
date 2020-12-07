import React from 'react';
import { Treemap } from 'recharts';

export interface TreemapVizProps {
  data: any
  height?: number
  width?: number
}

const TreemapViz: React.FC<TreemapVizProps> = ({
  data,
  height=500,
  width=500,
}) => {

  return (
    <Treemap
      height={height}
      width={width}
      data={data}
      dataKey="size"
      //@ts-ignore
      ratio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
    />
  )
}

export default TreemapViz
