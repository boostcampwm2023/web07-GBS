import type { StoryObj } from '@storybook/react'
import SettingModal from './SettingModal'

const meta = {
  title: 'Modal/Setting',
  component: SettingModal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onConfirm: () => {},
  },
}
