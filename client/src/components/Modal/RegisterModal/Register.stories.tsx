import type { StoryObj } from '@storybook/react'
import RegisterModal from './RegisterModal'
import { ThemeFlag } from '@/states/theme'

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
    currentTheme: ThemeFlag.light,
  },
}
