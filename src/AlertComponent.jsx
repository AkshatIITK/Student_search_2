import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const AlertComponent = ({ severity, message, duration }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 

  return (
    <div>
      {showAlert && <Alert severity={severity}>{message}</Alert>}
    </div>
  );
};

export default AlertComponent;
