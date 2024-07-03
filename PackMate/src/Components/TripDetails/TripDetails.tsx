import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './TripDetails.css';
import { useDestination } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface TripDetailsFormInputs {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}

const TripDetailsPage: React.FC = () => {
    const { setTripDetails } = useDestination();
    const { register, handleSubmit, formState: { errors } } = useForm<TripDetailsFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<TripDetailsFormInputs> = data => {
        setTripDetails(data);
        navigate('/summary-page')
        console.log(data);
    }

    return (
        <div className='trip-details'>
            <h1>Trip Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label htmlFor='firstName'>First Name</label>
                    <input id='firstName' {...register('firstName', { required: true })} />
                    {errors.firstName && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input id='lastName' {...register('lastName', { required: true })} />
                    {errors.lastName && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='dateOfBirth'>Date of Birth</label>
                    <input id='dateOfBirth' type='date' {...register('dateOfBirth', { required: true })} />
                    {errors.dateOfBirth && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' {...register('email', { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input id='phoneNumber' type='tel' {...register('phoneNumber', { required: true })} />
                    {errors.phoneNumber && <span>This field is required</span>}
                 </div>
                 <button type='submit'>Display Trip Data</button>
            </form>
        </div>
    );
};

export default TripDetailsPage;