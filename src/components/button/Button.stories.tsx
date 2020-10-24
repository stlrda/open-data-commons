import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import Button from './Button'

export default {
  title: 'Button',
  component: Button
}

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
)

export const FirstButtonStory = Template.bind({})

FirstButtonStory.args = {
  title: "ODC Button"
}