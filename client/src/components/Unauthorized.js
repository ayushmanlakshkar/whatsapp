import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5)

   
    useEffect(() => {
        const navigateLoginPage = () => {
            const countdownInterval = setInterval(() => {
              setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
      
            setTimeout(() => {
              clearInterval(countdownInterval);
              navigate('/');
            }, 5000);
          };
      
          navigateLoginPage();
    },[])
    
    return (
        <div>
            <h1>
                Error 401 : Please login or singup to access this page
            </h1>
            <h2>
                Redirecting to the Authentication page in {countdown} seconds...
            </h2>
        </div>
    )
}

export default Unauthorized
