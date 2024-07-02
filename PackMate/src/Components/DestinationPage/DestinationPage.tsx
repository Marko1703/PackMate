// DestinationPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

type Country = {
    name: string;
    capital: string;
}

const DestinationPage: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const filtered = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [countries, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCountryClick = (country: Country) => {
        console.log('Clicked country:', country);
    };

    return (
        <div>
            <h1>Destination Page</h1>
            <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredCountries.map(country => (
                    <li key={country.name} onClick={() => handleCountryClick(country)}>
                        {country.name} - {country.capital}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DestinationPage;
