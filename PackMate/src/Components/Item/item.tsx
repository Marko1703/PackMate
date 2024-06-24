import React from 'react';
import './item.css';

type ItemProps = {
  id: string;
  description: string;
  quantity: number;
  isPacked: boolean;
  togglePacked: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
};

const Item: React.FC<ItemProps> = ({ id, description, quantity, isPacked, togglePacked, updateQuantity }) => {
  return (
    <div className={`item ${isPacked ? 'packed' : 'unpacked'}`}>
      <div>
        <span>{description}</span> - <span>Qty: {quantity}</span>
      </div>
      <div className="controls">
        <button onClick={() => updateQuantity(id, -1)}>-</button>
        <button onClick={() => updateQuantity(id, 1)}>+</button>
        <button onClick={() => togglePacked(id)}>
          {isPacked ? 'Unpack' : 'Pack'}
        </button>
      </div>
    </div>
  );
};

export default Item;
