import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import Webcam from 'react-webcam';
import './index.css'

const WebcamVideoAttendace = ({setLoadingModels, loadingModels,attendanceList,setAttendanceList}) => {
    const webcamRef = useRef(null);
    const [videoLoaded,setVideoLoaded] = useState(false);
    const [userList, setUserList] = useState([]);
    const intervalId = useRef(null);
    const videoConstrainst = {
        width: 400,
        height: 600
    }
    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      // month date year format
      return `${month}:${date}:${year}`;
    }
    //improve this to a better version I think...Also make a seperate component for this
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
                    const labeledDescriptors = userList.map((user) => new faceapi.LabeledFaceDescriptors(user.id.toString(),
                     [new Float32Array(Object.values(user.descriptor))]));
                    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
                    const receivedDescriptorArray = new Float32Array(Object.values(result.descriptor));
                    const bestMatch = faceMatcher.findBestMatch(receivedDescriptorArray);
                    const matchedUserID = bestMatch.label;
                    // you can send it to the baackend
                    if(matchedUserID !== 'unknown'){
                      console.log(matchedUserID,"On : ",getDate())
                      const newUserAttendance = {
                        "userId": matchedUserID,
                        "date": getDate()
                      };
                      const response = await axios.post(`http://localhost:8080/attendance/addRecord`,newUserAttendance);
                      console.log(" Response : ", response.data)
                      setAttendanceList(response.data);
                    }
                    else{
                      console.error("No One Detected : ", matchedUserID)
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
            console.log("Stopping interval")
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