import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../images/logo.jpg'

function FrontPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <img src={images} className='w-full h-screen object-center  md:max-h-screen' alt="FrontImage" />
        </div>
    );
};

export default FrontPage;
