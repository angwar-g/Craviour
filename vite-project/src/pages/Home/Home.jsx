import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';

const Home = ({ toggleSidebar, isSidebarOpen, searchQuery }) => {
  const [category, setCategory] = useState('All');

  console.log('Home component rendering');

  return (
    <div className={isSidebarOpen ? "shift-content" : "content-wrapper"}>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchQuery={searchQuery} />
        <Footer />
    </div>
  );
}

export default Home;
