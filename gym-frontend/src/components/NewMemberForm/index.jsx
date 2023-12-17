import { useState } from "react";
import './index.css'

const NewMemberForm = () => {
    //removable code just a counter for id since Not making a backend continously
    const [count,setCount] = useState(1);
    //So I am thinking a logic where I receive the latest UUID from backend I assign that to the user
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        weight: 78.6
    })
    const handleSubmit = (event) => {
        //Will be designed to pass form data to backend later on...
        event.preventDefault();
        console.log(formData,"id:",count);
        setCount(prev => prev + 1);
    }

    return (
        <form className="newMemberForm" onSubmit={handleSubmit}>
           <div className="singleRowContainer">
                <input
                    readOnly
                    id="user-id"
                    name="id"
                    value={count}
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