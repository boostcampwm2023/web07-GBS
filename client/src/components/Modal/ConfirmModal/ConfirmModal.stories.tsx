import type { StoryObj } from '@storybook/react'
import ConfirmModal from './ConfirmModal'
import { ThemeFlag } from '@/types/theme'

const meta = {
  title: 'Modal/Confirm',
  component: ConfirmModal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: '테스트 입니다.',
    onConfirm: () => {},
    currentTheme: ThemeFlag.light,
  },
}
