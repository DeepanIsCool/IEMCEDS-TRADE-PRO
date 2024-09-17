import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Trading = () => {
    const [userDetails, setUserDetails] = useState([]); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/users/profile', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              },
            });
            console.log('User details:', response.data);
            setUserDetails(response.data); 
            setLoading(false); 
          } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false); 
          }
        };
    
        fetchUserDetails();
    },[])
    
    if (loading) {
        return <p>Loading user data...</p>; // Display loading state
      }
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src={`http://127.0.0.1:5000/?user=${encodeURIComponent(JSON.stringify(userDetails))}`}
                style={{ border: 'none', width: '100%', height: '100%' }}
                title="Trading Page"
            ></iframe>
        </div>
    );
};

export default Trading;