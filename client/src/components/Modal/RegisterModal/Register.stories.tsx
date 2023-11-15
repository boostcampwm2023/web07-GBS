import type { StoryObj } from '@storybook/react'
import RegisterModal from './RegisterModal'

const meta = {
  title: 'Modal/Register',
  component: RegisterModal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onConfirm: () => {},
    onCancle: () => {},
  },
}
