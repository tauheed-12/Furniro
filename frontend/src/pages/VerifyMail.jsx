import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerifyMail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const handleVerify = async () => {
        console.log(token);
        try {
            const response = await axios.post(`${process.env.BACKEND_URI}/auth/verifyEmail`, { token });
            console.log(response);
            if (response.data.success) {
                navigate('/sigIn')
            }
        } catch (error) {
            console.log("Error during verification", error);
        }
    }
    return (
        <div>
            <button className='' onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default VerifyMail
