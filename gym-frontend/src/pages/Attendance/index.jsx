import { useState } from 'react';
import './index.css'
import WebcamVideoAttendace from '../../components/WebcamVideoAttendance';

const Attendance = () => {
    const [loadingModels,setLoadingModels] = useState(true);
    const [attendanceList,setAttendanceList] = useState({
        users: [],
        date: ""
    });

    return(
        <div className='attendanceWrapper'>
        <WebcamVideoAttendace setLoadingModels={setLoadingModels} loadingModels={loadingModels} setAttendanceList={setAttendanceList}/>
        {
            loadingModels? <div>Loading</div> :
            <div className='attendanceTable'>
                
                <ul><h3>Attendance Today </h3>{attendanceList.users.map((userId,index) => <li key={index} >
                    <p>User ID: {userId}</p>
                    <p>Date: {attendanceList.date}</p>
                </li>)}
                </ul>
            </div>
        }   
        </div>
    )
}

export default Attendance;