import React from 'react';
import './Summary.css';

type SummaryProps = {
  items: {
    id: string;
    description: string;
    quantity: number;
    isPacked: boolean;
    category: string;
  }[];
};

const Summary: React.FC<SummaryProps> = ({ items }) => {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const packedItems = items.filter(item => item.isPacked).length;
  const unpackedItems = totalItems - packedItems;

  return (
    <div className="summary">
      <p>Total Items: {totalItems}</p>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Packed Items: {packedItems}</p>
      <p>Unpacked Items: {unpackedItems}</p>
    </div>
  );
};

export default Summary;
