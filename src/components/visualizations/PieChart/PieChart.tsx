import React, { useEffect } from 'react'
import { PieChart, Pie, Cell, } from 'recharts'

export interface PieChartVizProps {
  height: number
  width: number
  data: PieData[]
}
interface PieData {
  name: string
  value: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartViz: React.FC<PieChartVizProps> = ({
  height,
  width,
  data,
}) => {
  const dataKey = "value"
  const fillColor = "#8884d8"
  const radius = [60, 80]
  const paddingAngle = 5
  const margin = {top: 5, right: 5, bottom: 5, left: 5}

  const cxcy = [[120, 200], [420, 200]] // numbers would be easier to calculate for dynamic # of charts
  const cxcy_percent = [["25%", "50%"], ["75%", "50%"]]

  useEffect(() => {

  }, [])

  return (
    <PieChart width={width} height={height} margin={margin}>
      {/* Donut Pie Chart */}
      <Pie
        data={data}
        cx={cxcy_percent[0][0]}
        cy={cxcy_percent[0][1]}
        innerRadius={radius[0]}
        outerRadius={radius[1]}
        fill={fillColor}
        paddingAngle={paddingAngle}
        dataKey={dataKey}
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>

      {/* Regular Pie Chart */}
      <Pie
        data={data}
        cx={cxcy_percent[1][0]}
        cy={cxcy_percent[1][1]}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={radius[1]}
        fill={fillColor}
        dataKey={dataKey}
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  )
}

export default PieChartViz

const RADIAN = Math.PI / 180;

const renderCustomizedLabel: React.FC<any> = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
