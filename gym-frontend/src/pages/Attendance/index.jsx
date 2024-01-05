import { useContext, useState } from 'react';
import './index.css'
import WebcamVideoAttendace from '../../components/WebcamVideoAttendance';
import { WebsiteNecessaties } from '../../App';

const Attendance = () => {
    const [loadingModels,setLoadingModels] = useState(true);
    const {attendance} = useContext(WebsiteNecessaties)
    const attendanceList = attendance[0]
    return(
        <div className='attendanceWrapper'>
        <WebcamVideoAttendace setLoadingModels={setLoadingModels} loadingModels={loadingModels}/>
        {
            loadingModels? <div>Loading</div> :
            <div className='attendanceTable'>
                
                <ul><h3>Attendance Today </h3>{attendanceList.users && attendanceList.users.map((userId,index) => <li key={index} >
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