import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './TripDetails.css';
import { useDestination } from '../Context/GlobalContext';

interface TripDetailsFormInputs {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}

const tripDetailsPage: React.FC = () => {
    const { setTripDetails } = useDestination();
    const { register, handleSubmit, formState: { error } } = useForm<TripDetailsFormInputs>();
}

export default tripDetailsPage;