import { useState } from "react";
import NewMemberForm from "../../components/NewMemberForm";
import WebcamComponent from "../../components/WebcamComponent";
import './index.css';

const AddNew = () => {
    const [formData,setFormData] = useState({
        firstName: "a",
        lastName: "b",
        email: "@gmail.com",
        blood: "A+",
        height: 140,
        weight: 55,
        age:11,
        gender: "none",
        phoneNumber: 1234567890,
        cnic: 1234567890987,
        address: "address",
        admissionFee: 0,
        monthlyFee: 0,
        feeReceivingCheck: false,
        dateOfAdmission: Date.now(),
        userImage: null,
        descriptor: null,
    })
    
return (
    <div className="addMemberWrapper">
        <NewMemberForm formData={formData} setFormData={setFormData}/>
        <WebcamComponent formData={formData} setFormData={setFormData}/>
    </div>
)
}

export default AddNew;