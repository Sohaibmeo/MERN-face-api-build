import { useState } from 'react'
import './index.css'
import axios from 'axios'

const ContactForm = () => {
    const [contactForm,setContactForm] = useState({
        message: "",
        number: 1238
    })
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/admin/contact',contactForm)
            console.log(response)
        } catch (error) {
            console.log("Error in frontend api contact twilio")
        }
    }
    return(
        <form onSubmit={handleSubmit} className='contactForm'>
            <textarea
                className='contactField message'
                name='message'
                type="text"
                maxLength={160}
                placeholder='Enter Your Message Here'
                onChange={(e)=> setContactForm((prev)=> ({...prev,[e.target.name]:e.target.value}))}
            />
             <input
                className='contactField'
                name='number'
                type='text'
                placeholder='Enter without 0 or +92'
                maxLength={10}
                onChange={(e)=> setContactForm((prev)=> ({...prev,[e.target.name]:e.target.value}))}
            />
            <button className='buttonForm'>Submit</button>
        </form>
    )
}

export default ContactForm;