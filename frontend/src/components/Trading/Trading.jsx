import React from 'react';

const Trading = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src="http://127.0.0.1:5000/"
                style={{ border: 'none', width: '100%', height: '100%' }}
                title="Trading Page"
            ></iframe>
        </div>
    );
};

export default Trading;