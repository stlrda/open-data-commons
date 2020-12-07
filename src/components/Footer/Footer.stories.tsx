import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import PageFooter from './PageFooter'

export default {
  title: "Layout/PageFooter",
  component: PageFooter,
  argTypes: {

  }
} as Meta;

const Template: Story = () => (
  <PageFooter />
)

export const Default = Template.bind({})

Default.args = {
}
