import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import TreemapViz, {TreemapVizProps} from './Treemap'
import treemapData from './data.treemap'

export default {
  title: "Visualization/Treemap",
  component: TreemapViz,
  argTypes: {

  }
} as Meta;

const Template: Story<TreemapVizProps> = (args) => (
  <TreemapViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 500,
  data: treemapData,
}
