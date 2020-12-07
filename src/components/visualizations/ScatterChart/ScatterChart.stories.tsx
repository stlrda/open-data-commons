import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import ScatterChartViz, {ScatterChartVizProps} from './ScatterChart'
import scatterChartData, { scatterChartData2 } from './data.scatterchart'

export default {
  title: "Visualization/ScatterChart",
  component: ScatterChartViz,
  argTypes: {

  }
} as Meta;

const Template: Story<ScatterChartVizProps> = (args) => (
  <ScatterChartViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 730,
  data: scatterChartData,
  data2: scatterChartData2
}
