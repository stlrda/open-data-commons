import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PieChartViz, {PieChartVizProps} from './PieChart'
import pieChartData from './piechart.data'

export default {
  title: 'Visualization/PieChart',
  component: PieChartViz,
  argTypes: {
    // width: 500,
    // height: 500,
    // chartData: {
    //   value: pieChartData,
    //   name: "Example Bar Chart"
    // }
  },
} as Meta;

const Template: Story<PieChartVizProps> = (args) => <PieChartViz {...args} />;

export const Default = Template.bind({});

Default.args = {
  width: 800,
  height: 400,
  data: pieChartData,
};
