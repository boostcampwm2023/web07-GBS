import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import styled from 'styled-components'

interface HlsPlayerProps {
  id?: string
}

const HlsPlayer = ({ id }: HlsPlayerProps) => {
  const videoSrc = `${import.meta.env.VITE_HLS_URL}/${id}`
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
    <Container>
      <Video ref={videoRef} controls />
    </Container>
  )
}

export default HlsPlayer

const Container = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 9rem;
`

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
