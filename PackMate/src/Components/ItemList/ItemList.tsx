import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../Item/item';
import Summary from '../Summary/Summary';
import './ItemList.css';
import { v4 as uuidv4 } from 'uuid';

type ItemType = {
  id: string;
  description: string;
  quantity: number;
  isPacked: boolean;
  category: string;
};

const initialMaleItems: ItemType[] = [
  { id: '1', description: 'Shirt', quantity: 3, isPacked: false, category: 'Essentials' },
  { id: '2', description: 'Pants', quantity: 2, isPacked: false, category: 'Essentials' },
  { id: '3', description: 'Shaving Kit', quantity: 1, isPacked: false, category: 'Toiletries' },
];

const initialFemaleItems: ItemType[] = [
  { id: '4', description: 'Dress', quantity: 2, isPacked: false, category: 'Essentials' },
  { id: '5', description: 'Skirt', quantity: 1, isPacked: false, category: 'Essentials' },
  { id: '6', description: 'Makeup Kit', quantity: 1, isPacked: false, category: 'Toiletries' },
];

const ItemListPage: React.FC = () => {
  const { gender } = useParams<{ gender: string }>();
  const [items, setItems] = useState<ItemType[]>([]);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('Essentials');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    if (gender === 'male') {
      setItems(initialMaleItems);
    } else if (gender === 'female') {
      setItems(initialFemaleItems);
    }
  }, [gender]);

  const togglePacked = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const handleAddItem = () => {
    if (newItem && category) {
      setItems(prevItems => [
        ...prevItems,
        { id: uuidv4(), description: newItem, quantity: 1, isPacked: false, category },
      ]);
      setNewItem('');
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
    setItems(prevItems =>
      [...prevItems].sort((a, b) => {
        if (sortType === 'title') return a.description.localeCompare(b.description);
        if (sortType === 'quantity') return b.quantity - a.quantity;
        return 0;
      })
    );
  };

  const handleReset = () => {
    setItems(prevItems => 
      prevItems.map(item => ({ ...item, isPacked: false, quantity: 1}))
    )
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="item-list-page">
      <div className="controls">
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Essentials">Essentials</option>
        <option value="Toiletries">Toiletries</option>
        {/* Add more categories as needed */}
      </select>
      <button onClick={handleAddItem}>Add Item</button>

      <select value={sortType} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="quantity">Quantity</option>
        {/* Add more sorting options as needed */}
      </select>

      <button onClick={handleReset}>Reset Items</button>
    </div>

      {categories.map(category => (
        <div key={category} className="category">
          <h2>{category}</h2>
          {items
            .filter(item => item.category === category)
            .map(item => (
              <Item
                key={item.id}
                {...item}
                togglePacked={togglePacked}
                updateQuantity={updateQuantity}
              />
            ))}
        </div>
      ))}
      <Summary items={items} />
    </div>
  );
};

export default ItemListPage;
