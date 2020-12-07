import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import GeoMapViz, {GeoMapVizProps} from './GeoMap'
import simpleMapData from './data.simple'

export default {
  title: "Visualization/GeoMap",
  component: GeoMapViz,
  argTypes: {

  }
} as Meta;

const Template: Story<GeoMapVizProps> = (args) => (
  <GeoMapViz {...args} />
)

export const Default = Template.bind({})

Default.args = {
  height: 500,
  width: 800,
  geoData: simpleMapData,
  // optionals:
  zoom: 13,
  scrollWheelZoom: true,

}
