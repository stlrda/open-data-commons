import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import FullscreenTable, {FullscreenTableProps} from './FullscreenTable'
import responseTableData from './data.responsetable'

export default {
  title: "Modals/Table",
  component: FullscreenTable,
} as Meta;

const Template: Story<FullscreenTableProps> = (args) => (
  <FullscreenTable {...args} />
)

export const Default = Template.bind({})

Default.args = {
  showModal: true,
  responseTable: responseTableData,
  onCloseModal: action("clicked to close modal")
}
