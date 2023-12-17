import { useState } from "react";
import './index.css'

const NewMemberForm = ({userImage,setUserImage}) => {
    //removable code just a counter for id since Not making a backend continously
    //So I am thinking a logic where I receive the latest UUID from backend I assign that to the user
    const [formData, setFormData] = useState({
        id: "1",
        name: "",
        email: "",
        weight: 78.6
    })
    const handleSubmit = (event) => {
        //Will be designed to pass form data to backend later on...If we capture an image with a face?
        event.preventDefault();
        console.log("Form Data Without Picture",formData);
        if(userImage){
            console.log("Submit this to backend : ",formData,{image:userImage})
            setUserImage(null);
            alert('data submitted')
        }else {
            alert('set an image first')
        }
    }

    return (
        <form className="newMemberForm" onSubmit={handleSubmit}>
           <div className="singleRowContainer">
                <input
                    readOnly
                    id="user-id"
                    name="id"
                    value={1}
                />
                <input 
                    id="user-name"
                    name="name"
                    placeholder="Enter Name"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
            </div>
            <input 
                id="user-email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            />
            <input 
                id="user-weight"
                name="weight"
                placeholder="Enter Weight"
                onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            />
            <button type="submit" className="buttonForm">
                Submit
            </button>
        </form>
    )
}

export default NewMemberForm;