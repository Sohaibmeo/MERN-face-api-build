import { useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import * as faceapi from '@vladmandic/face-api';
import Webcam from 'react-webcam';

import './index.css'
import { WebsiteNecessaties } from '../../App'
//TODO:  we need a loader to wait for userList data and attendance etc from App.jsx
const WebcamVideoAttendace = ({setLoadingModels, loadingModels}) => {
    const webcamRef = useRef(null);
    const [videoLoaded,setVideoLoaded] = useState(false);
    const {users,attendance} = useContext(WebsiteNecessaties)
    const attendanceList = attendance[0];
    const intervalId = useRef(null);
    const videoConstrainst = {
        width: 400,
        height: 600
    }
    //TODO: improve this to a better version I think...Also make a seperate component for this
    const startFaceRecognition = () => {
      const userList = users[0];
      const setAttendanceList = attendance[1];
        if(videoLoaded && userList.length > 0){
            const video = document.getElementById('video');
            intervalId.current = setInterval(async ()=>{
                const result =   await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();
                if(result?.descriptor.length === 128){
                  try{
                    const labeledDescriptors = userList.map((user) => new faceapi.LabeledFaceDescriptors(user.id.toString(),
                     [new Float32Array(Object.values(user.descriptor))]));
                    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
                    const receivedDescriptorArray = new Float32Array(Object.values(result.descriptor));
                    const bestMatch = faceMatcher.findBestMatch(receivedDescriptorArray);
                    const matchedUserID = bestMatch.label;
                    //TODO: I need to stop this next api call saying we have marked your attendance already bro...
                    const userMarked = attendanceList.users?.find((user) => {
                      return user===matchedUserID
                    })
                    if(matchedUserID !== 'unknown' && !userMarked){
                      const newUserAttendance = {
                        "userId": matchedUserID
                      };
                      console.log("We are about to execute")
                      const response = await axios.post(`http://localhost:8080/attendance/addRecord`,newUserAttendance);
                      console.log(" Response : ", response.data,matchedUserID)
                      if(response.data.users){
                        setAttendanceList(response.data);
                      }else{
                        setAttendanceList({
                          users: [],
                          date: response.data.date
                        });
                      }
                    }
                    else{
                      console.error("Already Marked or Not in Record (inRecord:", userMarked,")")
                    }
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
              setLoadingModels(false);
              console.log("Models Loaded")
            })
            .catch((error) => {
                console.error('Error loading models:', error);
            });
        }
        loadModels();
        return () => {
            clearInterval(intervalId.current)
            setLoadingModels(true)
            console.log("Stopping interval")
        }
      }, [setLoadingModels,attendanceList]);

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