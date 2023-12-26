import './index.css'
import axios from 'axios'

const NewMemberForm = ({formData,setFormData}) => {
    //removable code just a counter for id since Not making a backend continously
    //So I am thinking a logic where I receive the latest UUID from backend I assign that to the user
    const handleSubmit = async (event) => {
        //Will be designed to pass form data to backend later on...If we capture an image with a face?
        event.preventDefault();
        if(formData.userImage){
            // here write an api to call the backend here alright?
            try {
                const response = await axios.post('http://localhost:8080/users/createUser',formData);
                console.log("Submit this to backend : ", response);
                setFormData((prev)=>({...prev,userImage:null}));
            } catch (error) {
                console.log("Opsie!!");
            }
        }else {
            console.log("Form Data Without Picture",formData);
            alert('set an image first')
        }
    }

    return (
        <form className="newMemberForm" onSubmit={handleSubmit}>
           <div className="singleRowContainer">
                <input
                    id="firstName"
                    name="First Name"
                    placeholder="First Name"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.id]:e.target.value}))}
                />
                <input 
                    id="lastName"
                    name="Last Name"
                    placeholder="Last Name"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.id]:e.target.value}))}
                />
            </div>
            <input 
                id="user-email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            />
            <div className="singleRowContainer">
                <input
                    type='number'
                    step='0.01'
                    id="user-weight"
                    name="weight"
                    placeholder="Enter Weight in Kg"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
                <input
                    type='number'
                    step='0.1'
                    id="user-height"
                    name="height"
                    placeholder="Enter Height in cm"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
                <select 
                    id="user-gender"
                    name="gender"
                    placeholder="Enter Gender"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                >
                    <option value="none">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select
                    id="user-blood"
                    name="blood"
                    placeholder="Enter Blood Group"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                >
                    <option value="none" >Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
            </div>
            <div className="singleRowContainer">
                <input
                    type='number'
                    id="user-phone-number"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
                <input
                    id="user-cnic"
                    name="cnic"
                    placeholder="Enter CNIC"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
            </div>
            <input 
                id="user-address"
                name="address"
                placeholder="Enter Address"
                onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            />
            <div className="singleRowContainer">
                <input
                    type='number'
                    id="user-admission-fee"
                    name="admissionFee"
                    placeholder="Enter Admission Fee"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
                <input
                    type='number'
                    id="user-monthly-fee"
                    name="monthlyFee"
                    placeholder="Enter Monthly Fee"
                    onChange={(e) => setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
                <input
                    type='checkbox'
                    id="user-fee-paid"
                    name="feeReceivingCheck"
                    checked={formData.feeReceivingCheck || false}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))}
                />
                <label for='user-fee-paid' >Fee Received? </label>
            </div>

            <button type="submit" className="buttonForm">
                Submit
            </button>
        </form>
    )
}

export default NewMemberForm;