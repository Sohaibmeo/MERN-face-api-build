import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import Webcam from 'react-webcam';
import './index.css'

const WebcamVideoAttendace = ({setLoadingModels, loadingModels}) => {
    const webcamRef = useRef(null);
    const [videoLoaded,setVideoLoaded] = useState(false);
    const [userList, setUserList] = useState([]);
    const intervalId = useRef(null);
    const videoConstrainst = {
        width: 400,
        height: 600
    }

    const startFaceRecognition = () => {
        if(videoLoaded && userList.length > 0){
            const video = document.getElementById('video');
            intervalId.current = setInterval(async ()=>{
                const result =   await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();
                
                if(result?.descriptor.length === 128){
                  try{
                    const labeledDescriptors = userList.map((user) => new faceapi.LabeledFaceDescriptors(user.firstName.toString(), [new Float32Array(Object.values(user.descriptor))]));
                    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
                    const receivedDescriptorArray = new Float32Array(Object.values(result.descriptor));
                    const bestMatch = faceMatcher.findBestMatch(receivedDescriptorArray);
                    const matchedUserFirstName = bestMatch.label;
                    console.log("------>",matchedUserFirstName);
                  }catch(error) {
                    console.error("Error During Face Recognition",error)
                  }
                }else{
                  console.error("No One Detected")
                }
              }, 6000)
        }else {
          console.log("No Users");
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
                const getUsers = async() => {
                  try {
                    // maybe use redux for these type of api's to reduce response time
                    const response = await axios.get("http://localhost:8080/users");
                    setUserList(response.data);
                    setLoadingModels(false);
                    console.log("Loading Models and Users");
                  } catch (error) {
                    console.log("Its not working");
                  }
                }
                getUsers();
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
                onPlay={startFaceRecognition}
                 /> }  
            </>
      )
}

export default WebcamVideoAttendace;