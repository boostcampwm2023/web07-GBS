import type { StoryObj } from '@storybook/react'
import Logo from './Logo'
import { ThemeFlag } from '@/types/theme'

const meta = {
  title: 'Logo',
  component: Logo,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    logo: 'wide',
    currentTheme: ThemeFlag.light,
  },
}
