import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import RadarChartViz, {RadarChartVizProps} from './RadarChart'
import radarChartData from './data.radarchart'

export default {
  title: "Visualization/RadarChart",
  component: RadarChartViz,
  argTypes: {

  }
} as Meta;

const Template: Story<RadarChartVizProps> = (args) => (
  <RadarChartViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 500,
  data: radarChartData,
}
