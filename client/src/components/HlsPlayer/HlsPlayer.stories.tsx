import type { StoryObj } from '@storybook/react'
import HlsPlayer from './HlsPlayer'

const meta = {
  title: 'HlsPlayer',
  component: HlsPlayer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'JMH',
  },
}
