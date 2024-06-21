import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';

const Home = ({ toggleSidebar, isSidebarOpen }) => {
  const [category, setCategory] = useState('All');

  console.log('Home component rendering');

  return (
    <div className={isSidebarOpen ? "shift-content" : "content-wrapper"}>
        {/* TopNav is moved to App.js */}
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </div>
  );
}

export default Home;
