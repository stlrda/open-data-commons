import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import BarChartViz, {BarChartVizProps} from './BarChart'
import barChartData from './barchart.data'

export default {
  title: 'Visualization/BarChart',
  component: BarChartViz,
  argTypes: {
    // width: 500,
    // height: 500,
    // chartData: {
    //   value: barChartData,
    //   name: "Example Bar Chart"
    // }
  },
} as Meta;

const Template: Story<BarChartVizProps> = (args) => <BarChartViz {...args} />;

export const Default = Template.bind({});

Default.args = {
  width: 500,
  height: 500,
  chartData: {
    value: barChartData,
    name: "Example Bar Chart"
  },
};
