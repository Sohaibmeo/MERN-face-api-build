import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import Webcam from 'react-webcam';
import './index.css'

const WebcamVideoAttendace = ({setLoadingModels, loadingModels}) => {
    const webcamRef = useRef(null);
    const [videoLoaded,setVideoLoaded] = useState(false);
    const intervalId = useRef(null);
    const videoConstrainst = {
        width: 400,
        height: 600
    }
    const handleVideoOnPlay = () => {
        if(videoLoaded){
            const video = document.getElementById('video');
            intervalId.current = setInterval(async ()=>{
                const result =   await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();
        
                if(result){
                  try{
                   const body = { data: result.descriptor };
                   console.log("Detected : ", body)
                }catch(error) {
                  console.error("Error During Api Call",error)
                }
                }else{
                  console.error("No One Detected")
                }
              }, 3000)
        }
    }

    
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            ]).then(() => {
                setLoadingModels(false);
            })
            .catch((error) => {
                console.error('Error loading models:', error);
            });
        }
        loadModels();
        return () => {
            clearInterval(intervalId.current)
        }
      }, [setLoadingModels]);

      return (
            <>
              {loadingModels ? 'Loading Webcam' : 
              <Webcam 
                id='video'
                videoConstraints={videoConstrainst} 
                ref={webcamRef}
                onUserMedia={() => setVideoLoaded(true)}
                onPlay={handleVideoOnPlay}
                 /> }  
            </>
      )
}

export default WebcamVideoAttendace;