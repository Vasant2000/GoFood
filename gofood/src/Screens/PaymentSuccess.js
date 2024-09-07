import { useEffect,useState } from 'react';
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'


export default function PaymentSuccess() {
    const [timeLeft, setTimeLeft] = useState(5); // Start with 5 seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/');
      return;
    }

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <div>
      <p>Payment Successful. Redirecting to Home Page in {timeLeft} seconds...</p>
    </div>
  );
}
