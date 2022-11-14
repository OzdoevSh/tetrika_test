import { useEffect, useState } from "react"

import volumeZero from '../../assets/icons/volumeZero.svg'
import volumeLow from '../../assets/icons/volumeLow.svg'
import volumeMedium from '../../assets/icons/volumeMedium.svg'
import volumeHigh from '../../assets/icons/volumeHigh.svg'

import './Voice.scss'

export default function Voice(){

  const [volume, setVolume] = useState<number>(0)

  function getVoice() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
    }).then(stream => {

      let audioContext = new AudioContext();
      let analyser = audioContext.createAnalyser();
      let microphone = audioContext.createMediaStreamSource(stream);
      let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      javascriptNode.onaudioprocess = function () {
        let array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;

        for (let i = 0; i < array.length; i++) {
          values += (array[i]);
        }

        const average = values / array.length;

        setVolume(Math.round(average))

      }
    }).catch(err => {
      console.error(err)
    })
  }


  useEffect(() => {
    getVoice()
  }, [volume])

  function getVolumeImg(volume:number):JSX.Element {
    let image:string = volumeZero

    if(volume === 0){
      image = volumeZero
    } else if (volume > 0 && volume < 30){
      image = volumeLow
    } else if (volume > 30 && volume < 60){
      image = volumeMedium
    } else if (volume > 60 ){
      image = volumeHigh
    }

    return <img className="voice-level" src={image} alt="" />
  }


  return (
    <div className="voicebar">
      {getVolumeImg(volume)}
      <p>Микрофон</p>
    </div>

  )
}