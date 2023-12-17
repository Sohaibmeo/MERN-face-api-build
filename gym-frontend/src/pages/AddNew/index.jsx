import { useState } from "react";
import NewMemberForm from "../../components/NewMemberForm";
import WebcamComponent from "../../components/WebcamComponent";
import './index.css';

const AddNew = () => {
    const [userImage,setUserImage] = useState(null)
return (
    <div className="addMemberWrapper">
        <NewMemberForm userImage={userImage} setUserImage={setUserImage}/>
        <WebcamComponent setUserImage={setUserImage}/>
    </div>
)
}

export default AddNew;