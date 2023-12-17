import { useRef, useState } from 'react';
import Webcam from 'react-webcam'
import './index.css'

const WebcamComponent = ({setUserImage}) => {
    const [WebcamImage,setWebcamImage] = useState(null)
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 400,
        height: 500,
        facingMode: "user"
    };
    const handleSubmit = () => {
        const capturedImage = WebcamImage ? null :webcamRef.current.getScreenshot()
        setWebcamImage(capturedImage);
        setUserImage(capturedImage);
    }

    return (
        <div className='webcamWrapper'>
             {
                WebcamImage ? 
                <img src={WebcamImage} alt='Failed To Load Webcam Src' /> : 
                <Webcam 
                    videoConstraints={videoConstraints} 
                    ref={webcamRef} 
                    audio={false} 
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.8}
                />
            }
            <button className='webcamButton' onClick={handleSubmit}> {WebcamImage? 'Reset' : 'Capture'} </button>
        </div>
    )
}
export default WebcamComponent;