import { useEffect, useRef } from 'react'
import * as styles from './HlsPlayer.styles'
import Hls from 'hls.js'

interface HlsPlayerProps {
  /**
   * 연결할 스트리머의 id
   */
  id?: string
}

const HlsPlayer = ({ id }: HlsPlayerProps) => {
  const videoSrc = `${import.meta.env.VITE_HLS_URL}/${id}.m3u8`
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    let hls: Hls
    console.log(videoSrc)
    if (video) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc
      } else if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(videoSrc)
        hls.attachMedia(video)
      }

      return () => {
        if (hls) {
          hls.destroy()
        }
      }
    }
  }, [])

  return (
    <styles.Container>
      <styles.Video ref={videoRef} autoPlay muted controls />
    </styles.Container>
  )
}

export default HlsPlayer
