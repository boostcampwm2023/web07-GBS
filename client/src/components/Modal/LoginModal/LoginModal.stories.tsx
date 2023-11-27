import type { StoryObj } from '@storybook/react'
import LoginModal from './LoginModal'
import { ThemeFlag } from '@/state/theme'

const meta = {
  title: 'Modal/Login',
  component: LoginModal,
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
