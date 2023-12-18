import { useState } from 'react';
import './index.css'
import WebcamVideoAttendace from '../../components/WebcamVideoAttendance';

const Attendance = () => {
    const [loadingModels,setLoadingModels] = useState(true);

    return(
        <div className='attendanceWrapper'>
        <WebcamVideoAttendace setLoadingModels={setLoadingModels} loadingModels={loadingModels}/>
        {
            loadingModels? <div>Loading</div> : 'A table of previos attendace here'
        }   
        </div>
    )
}

export default Attendance;