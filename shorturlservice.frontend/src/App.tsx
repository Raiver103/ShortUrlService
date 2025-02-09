import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import CreateEditPage from './components/CreateEditPage';
import './styles.css';  // Подключаем глобальные стили

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreateEditPage />} />
        <Route path="/edit/:id" element={<CreateEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
