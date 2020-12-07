import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import LineChartViz, {LineChartVizProps} from './LineChart'
import lineChartData from './data.linechart'

export default {
  title: "Visualization/LineChart",
  component: LineChartViz,
  argTypes: {

  }
} as Meta;

const Template: Story<LineChartVizProps> = (args) => (
  <LineChartViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 500,
  data: lineChartData
}
