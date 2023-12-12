import type { StoryObj } from '@storybook/react'
import Access from './Access'

const meta = {
  title: 'Access',
  component: Access,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    leftButton: '왼쪽 버튼',
    rightButton: '오른쪽 버튼',
    onLeftButton: () => {},
    onRightButton: () => {},
  },
}
