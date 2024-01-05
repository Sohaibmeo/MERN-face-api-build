import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api'
import Webcam from 'react-webcam'
import './index.css'

const WebcamComponent = ({formData,setFormData}) => {
    const [loadedModels, setLoadedModels] = useState(false)
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 400,
        height: 475,
        facingMode: "user"
    };
    const handleSubmit = async () => {
        let capturedImage = null;
        // go in the condition if there is no current picture i.e userImage and webcam has a new picture
        if (!(formData.userImage) && webcamRef.current) {
            capturedImage = new Image();
            capturedImage.src = webcamRef.current.getScreenshot();
            // go in if #1 we have face-api models loaded in the useEffect and capturedImage has something in it
            if (loadedModels && capturedImage){
                const result = await faceapi
                    .detectSingleFace(capturedImage, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                    // basically it has a face detection with a descriptor if it has length 128
                if(result?.descriptor.length === 128){
                    setFormData((prev)=>({...prev,userImage:webcamRef.current.getScreenshot(),descriptor:result.descriptor}));
                }
                else{
                    setFormData((prev)=>({...prev,userImage:null,descriptor:null}));
                    console.log("Couldn't detect face")
                }
            }
        }
        else{
            console.log("Resetting")
            setFormData((prev)=>({...prev,userImage:null,descriptor:null}));
        }
    }

    useEffect(()=>{
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]).then(() => {
            setLoadedModels(true);
        })
        .catch((error) => {
            console.error('Error loading models:', error);
        });
    },[setLoadedModels])
    
    return (
        <div className='webcamWrapper'>
             {
                formData.userImage === null ? 
                <Webcam 
                    className='video'
                    videoConstraints={videoConstraints} 
                    ref={webcamRef} 
                    audio={false} 
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.8}
                /> :
                <img src={formData.userImage} alt='Failed To Load Webcam Src' />
                
            }
            <button className='webcamButton' onClick={handleSubmit}> {formData.userImage === null? 'Capture' : 'Reset'} </button>
        </div>
    )
}
export default WebcamComponent;