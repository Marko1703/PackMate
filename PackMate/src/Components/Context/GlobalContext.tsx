import React, { createContext, useContext, useState, ReactNode } from 'react';

type Destination = {
    name: string;
    capital: string;
};

type DestinationContextType = {
    destination: Destination | null;
    setDestination: (destination: Destination | null) => void;
};

const GlobalContext = createContext<DestinationContextType>({
    destination: null,
    setDestination: () => {},
});

export const useDestination = () => useContext(GlobalContext);

export const DestinationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [destination, setDestination] = useState<Destination | null>(null);

    return (
        <GlobalContext.Provider value={{ destination, setDestination }}>
            {children}
        </GlobalContext.Provider>
    );
};

