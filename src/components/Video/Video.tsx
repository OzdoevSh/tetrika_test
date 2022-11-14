import { useEffect, useRef } from "react"

import './Video.scss'

export default function Video() {

  const localVideoRef = useRef<HTMLVideoElement>(null);

  function getVideo() {
    navigator.mediaDevices.getUserMedia({
      video: true,
    }).then(stream => {
      let video = localVideoRef.current!;
      video.srcObject = stream;
      video.play()

    }).catch(err => {
      console.error(err)
    })
  }

  

  useEffect(() => {
    getVideo()
  }, [localVideoRef])




  return (
    <video ref={localVideoRef} className="video">
      video
    </video>
  )
}