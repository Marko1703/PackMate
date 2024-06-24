import React from "react";
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (gender: string) => {
        navigate(`/items/${gender}`);
    };

    return (
        <div className="homepage">
            <button onClick={() => handleNavigation('male')}>Male</button>
            <button onClick={() => handleNavigation('female')}>Female</button>
        </div>
    )
}

export default HomePage;