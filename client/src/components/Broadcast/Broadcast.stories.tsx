import type { StoryObj } from '@storybook/react'
import Broadcast from './Broadcast'

const meta = {
  title: 'Broadcast',
  component: Broadcast,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    thumbnail: 'https://github.com/boostcampwm2023/web07-GBS/assets/119842443/fe492d6e-a180-49c4-82d6-b0a8b0c1295a',
    title: 'JMH의 방송',
    nickname: 'JMH',
    viewer: 1,
    index: 1,
  },
}
