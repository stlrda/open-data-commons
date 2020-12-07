import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import ComposedChartViz, {ComposedChartVizProps} from './ComposedChart'
import composedChartData from './data.composedchart'

export default {
  title: "Visualization/ComposedChart",
  component: ComposedChartViz,
  argTypes: {

  }
} as Meta;

const Template: Story<ComposedChartVizProps> = (args) => (
  <ComposedChartViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 500,
  data: composedChartData,
}
