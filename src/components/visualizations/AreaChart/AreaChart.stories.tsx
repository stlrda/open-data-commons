import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import AreaChartViz, {AreaChartVizProps} from './AreaChart'
import areaChartData from './data.areachart'

export default {
  title: "Visualization/AreaChart",
  component: AreaChartViz,
  argTypes: {

  }
} as Meta;

const Template: Story<AreaChartVizProps> = (args) => (
  <AreaChartViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 500,
  data: areaChartData,
}
