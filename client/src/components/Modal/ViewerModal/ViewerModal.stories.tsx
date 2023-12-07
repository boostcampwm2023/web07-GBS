import type { StoryObj } from '@storybook/react'
import ViewerModal from './ViewerModal'
import { ThemeFlag } from '@/types/theme'

const meta = {
  title: 'Modal/Viewer',
  component: ViewerModal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    top: 0,
    left: 0,
    nickname: 'test',
    authority: 'viewer',
    target: 'viewer',
    onCancle: () => {},
    onKick: () => {},
    currentTheme: ThemeFlag.light,
  },
}
