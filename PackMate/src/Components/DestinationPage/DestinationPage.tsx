import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DestinationPage.css';
import { useDestination } from '../Context/GlobalContext';

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  flags: {
    png: string;
  };
}

const Destination: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setDestination } = useDestination();

  useEffect(() => {
    axios.get<Country[]>('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleNavigation = (tripDetails: string) => {
    navigate(`/tripDetails/${tripDetails}`);
  };

  return (
    <div className="destination">
      <div className='header-container'>
        <h1>Destination Page</h1>
        <button className='tripDetails' onClick={() => handleNavigation('tripDetails')}>Trip Details</button>
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="country-list">
        {filteredCountries.map(country => (
          <div 
            key={country.name.common} 
            className="country-item" 
            onClick={() => setDestination(country.name.common)}
          >
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination; 