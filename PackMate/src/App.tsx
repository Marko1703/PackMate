import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import ItemListPage from './Components/ItemList/ItemList';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items/:gender" element={<ItemListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
