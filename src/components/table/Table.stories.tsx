import React, { ComponentProps } from 'react'
import { Story} from '@storybook/react/types-6-0'
import Table from './Table'
import { simpleColumns } from '../../mocks/table'

export default {
  title: "Table",
  component: Table
}

const Template: Story<ComponentProps<typeof Table>> = (args) => (
  <Table {...args} />
)

export const SimpleTable = Template.bind({})

SimpleTable.args = {
  numRows: 10,
  columns: simpleColumns
}