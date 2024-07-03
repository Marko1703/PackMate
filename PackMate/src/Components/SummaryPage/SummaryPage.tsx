import React from "react";
import { useDestination } from "../Context/GlobalContext";
import './SummaryPage.css';

const SummaryPage: React.FC = () => {
    const { destination, tripDetails, packedItems } = useDestination();

    return (
        <div className="summary-page">
            <h1>Summary</h1>
            <section>
                <h2>Destination</h2>
                <p>{destination}</p>
            </section>
            <section>
                <h2>Trip Details</h2>
                <p><strong>First Name:</strong> {tripDetails.firstName}</p>
                <p><strong>Last Name:</strong> {tripDetails.lastName}</p>
                <p><strong>Date of Birth:</strong> {tripDetails.dateOfBirth}</p>
                <p><strong>Email:</strong> {tripDetails.email}</p>
                <p><strong>Phone Number:</strong> {tripDetails.phoneNumber}</p>
            </section>
            <section>
                <h2>Packed Items</h2>
                <ul>
                    {packedItems.map((item, index) => (
                        <li key={index}>
                            {item.description} (Quantity: {item.quantity})
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default SummaryPage;