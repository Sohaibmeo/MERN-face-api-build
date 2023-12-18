import { useEffect, useState } from 'react';
import './index.css'
import * as faceapi from '@vladmandic/face-api';

const Attendance = () => {
    // const [mockUserData,setMockUserData] = useState({
    //     id:1,
    //     name:"Sohaib",
    //     email:"mocked@gmail.com",
    //     image:"12345"
    // });
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            console.log('scrip checked?');
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(() => {
                console.log('Everything is Loaded Succesfully');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading models:', error);
            });
        }
        loadModels();
      }, [loading]);

    return(
        <>
        {
            loading? <div>Loading</div> : <div>Loaded</div>
        }
        </>
    )
}

export default Attendance;