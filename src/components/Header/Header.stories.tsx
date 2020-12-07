import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import PageHeader, {PageHeaderProps} from './PageHeader'

export default {
  title: "Layout/PageHeader",
  component: PageHeader,
  argTypes: {

  }
} as Meta;

const Template: Story<PageHeaderProps> = (args) => (
  <PageHeader {...args} />
)

export const Default = Template.bind({})

Default.args = {
  loading: false,
  title: "Page Header",
  description: "This is a header for the api documentation page",
  version: "0.0.1"
}

export const LoadingState = Template.bind({})

LoadingState.args = {
  loading: true
}
