import type { StoryObj } from '@storybook/react'
import Chatting from './Chatting'

const meta = {
  title: 'Chatting',
  component: Chatting,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nickname: 'JMH',
    message: '테스트 입니다.',
    onNickname: () => {},
  },
}
