import type { StoryObj } from '@storybook/react'
import EmptyList from './EmptyList'
import { ThemeFlag } from '@/types/theme'

const meta = {
  title: 'EmptyList',
  component: EmptyList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentTheme: ThemeFlag.light,
  },
}
