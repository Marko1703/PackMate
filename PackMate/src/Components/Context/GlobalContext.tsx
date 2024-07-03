import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PackedItem {
  description: string;
  quantity: number;
  isPacked: boolean;
  category: string;
}

interface TripDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
}

interface DestinationContextType {
  destination: string;
  setDestination: (destination: string) => void;
  tripDetails: TripDetails;
  setTripDetails: (details: TripDetails) => void;
  packedItems: PackedItem[];
  setPackedItems: (items: PackedItem[]) => void;
}

interface DestinationProviderProps {
  children: ReactNode;
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const DestinationProvider: React.FC<DestinationProviderProps> = ({ children }) => {
  const [destination, setDestination] = useState('');
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
  });

  const [packedItems, setPackedItems] = useState<PackedItem[]>([]);

  return (
    <DestinationContext.Provider value={{ destination, setDestination, tripDetails, setTripDetails, packedItems, setPackedItems }}>
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestination must be used within a DestinationProvider');
  }
  return context;
};